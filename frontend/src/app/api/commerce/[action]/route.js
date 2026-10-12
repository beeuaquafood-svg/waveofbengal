import { randomUUID } from "node:crypto";
import {
  database,
  identity,
  quote,
  razor,
  signature,
  reconcile,
  refundOrder,
  publicOrder,
} from "@/lib/server/commerce";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request, context) {
  try {
    const { action } = await context.params;
    if (action === "webhook") {
      const raw = await request.text();
      if (
        !signature(
          raw,
          request.headers.get("x-razorpay-signature"),
          process.env.RAZORPAY_WEBHOOK_SECRET,
        )
      )
        return Response.json({ error: "Invalid signature" }, { status: 401 });
      const event = JSON.parse(raw);
      const payment = event.payload?.payment?.entity;
      const refund = event.payload?.refund?.entity;
      if (
        payment?.order_id &&
        ["payment.captured", "payment.authorized", "order.paid"].includes(
          event.event,
        )
      ) {
        const found = await database()
          .collection("commerceOrders")
          .where("razorpayOrderId", "==", payment.order_id)
          .limit(1)
          .get();
        if (!found.empty) await reconcile(found.docs[0].ref, payment.id);
        else {
          // Recover an order whose provider response was lost after creation.
          const providerOrder = await razor(`orders/${payment.order_id}`);
          const reference = providerOrder.notes?.reference;
          if (typeof reference === "string" && !reference.includes("/")) {
            const ref = database().collection("commerceOrders").doc(reference);
            const local = await ref.get();
            if (local.exists && local.data().amount === providerOrder.amount) {
              await ref.update({ razorpayOrderId: providerOrder.id });
              await reconcile(ref, payment.id);
            }
          }
        }
      }
      if (refund?.payment_id) {
        const found = await database()
          .collection("commerceOrders")
          .where("paymentId", "==", refund.payment_id)
          .limit(1)
          .get();
        if (!found.empty) {
          const current = await razor(`refunds/${refund.id}`);
          if (current.status === "processed")
            await found.docs[0].ref.update({
              status:
                current.amount === found.docs[0].data().amount
                  ? "refunded"
                  : "partially_refunded",
              refundId: current.id,
            });
        }
      }
      return Response.json({ received: true });
    }
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin)
      return Response.json({ error: "Invalid origin" }, { status: 403 });
    const user = await identity(request);
    const body = await request.json();
    const collection = database().collection("commerceOrders");
    if (action === "admin-list") {
      if (user.admin !== true)
        return Response.json(
          { error: "Administrator access required" },
          { status: 403 },
        );
      const docs = await collection
        .orderBy("createdAt", "desc")
        .limit(100)
        .get();
      return Response.json({ orders: docs.docs.map(publicOrder) });
    }
    if (action === "fulfill") {
      if (user.admin !== true)
        return Response.json(
          { error: "Administrator access required" },
          { status: 403 },
        );
      if (
        !["preparing", "dispatched", "delivered"].includes(body.fulfillment) ||
        typeof body.id !== "string" ||
        body.id.includes("/")
      )
        throw new Error("Invalid fulfillment update.");
      const ref = collection.doc(body.id);
      const stages = { preparing: 1, dispatched: 2, delivered: 3 };
      await database().runTransaction(async (tx) => {
        const order = (await tx.get(ref)).data();
        if (!order || order.status !== "paid" || order.cancelRequested)
          throw new Error("Only paid, active orders can be fulfilled.");
        if ((stages[order.fulfillment] || 0) > stages[body.fulfillment])
          throw new Error("Fulfillment cannot move backwards.");
        tx.update(ref, {
          fulfillment: body.fulfillment,
          updatedAt: Date.now(),
        });
      });
      return Response.json({ order: publicOrder(await ref.get()) });
    }
    if (action === "list") {
      const docs = await collection
        .where("uid", "==", user.uid)
        .orderBy("createdAt", "desc")
        .limit(100)
        .get();
      return Response.json({
        orders: docs.docs
          .map(publicOrder)
          .sort((a, b) => b.createdAt - a.createdAt),
      });
    }
    if (action === "create") {
      if (
        !process.env.COMMERCE_ENABLED ||
        process.env.COMMERCE_ENABLED !== "true"
      )
        throw new Error(
          "Online ordering is not available yet. Your bag is saved.",
        );
      const delivery = Object.fromEntries(
        [
          "fullName",
          "email",
          "phone",
          "address1",
          "address2",
          "city",
          "state",
          "zip",
        ].map((key) => [
          key,
          String(body.delivery?.[key] || "")
            .trim()
            .slice(0, 201),
        ]),
      );
      for (const key of [
        "fullName",
        "email",
        "phone",
        "address1",
        "city",
        "state",
        "zip",
      ])
        if (
          typeof delivery[key] !== "string" ||
          !delivery[key].trim() ||
          delivery[key].length > 200
        )
          throw new Error("Please complete your delivery details.");
      if (
        !/^[1-9]\d{5}$/.test(delivery.zip) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(delivery.email)
      )
        throw new Error("Check your email and PIN code.");
      if (!/^\+?[0-9 ()-]{10,18}$/.test(delivery.phone))
        throw new Error("Please enter a valid mobile number.");
      const supported = (process.env.DELIVERY_PINCODES || "")
        .split(",")
        .map((v) => v.trim());
      if (!supported.includes(delivery.zip))
        throw new Error("Delivery is not available for this PIN code yet.");
      if (!/^[a-zA-Z0-9-]{20,64}$/.test(body.key || ""))
        throw new Error("Invalid checkout reference.");
      const quota = database().collection("checkoutQuota").doc(user.uid);
      await database().runTransaction(async (tx) => {
        const previous = (await tx.get(quota)).data();
        const window = Math.floor(Date.now() / 3600000);
        const count = previous?.window === window ? previous.count : 0;
        if (count >= 20)
          throw new Error(
            "Too many checkout attempts. Please check your existing orders.",
          );
        tx.set(quota, { window, count: count + 1 });
      });
      const pricing = quote(body.items);
      const ref = collection.doc(`${user.uid}_${body.key}`);
      const existing = await ref.get();
      if (existing.exists) {
        const order = publicOrder(existing);
        if (!order.razorpayOrderId)
          throw new Error(
            "This payment request is still being checked. Contact support with your checkout reference; do not pay again.",
          );
        return Response.json({ order, key: process.env.RAZORPAY_KEY_ID });
      }
      const id = "WOB-" + randomUUID().slice(0, 8).toUpperCase();
      await ref.create({
        uid: user.uid,
        number: id,
        ...pricing,
        amount: Math.round(pricing.total * 100),
        currency: "INR",
        delivery,
        status: "creating",
        createdAt: Date.now(),
        lastChecked: 0,
      });
      const provider = await razor("orders", {
        amount: Math.round(pricing.total * 100),
        currency: "INR",
        receipt: id,
        notes: { reference: ref.id },
      });
      await ref.update({
        razorpayOrderId: provider.id,
        status: "awaiting_payment",
      });
      return Response.json({
        order: publicOrder(await ref.get()),
        key: process.env.RAZORPAY_KEY_ID,
      });
    }
    if (typeof body.id !== "string" || body.id.includes("/"))
      throw new Error("Invalid order.");
    const ref = collection.doc(body.id);
    const snapshot = await ref.get();
    if (!snapshot.exists || snapshot.data().uid !== user.uid)
      return Response.json({ error: "Order not found" }, { status: 404 });
    const order = snapshot.data();
    if (action === "verify") {
      if (
        !signature(
          `${order.razorpayOrderId}|${body.razorpay_payment_id}`,
          body.razorpay_signature,
          process.env.RAZORPAY_KEY_SECRET,
        )
      )
        throw new Error(
          "Payment verification failed. Please check your order status.",
        );
      await reconcile(ref, body.razorpay_payment_id);
    } else if (action === "cancel") {
      await database().runTransaction(async (tx) => {
        const current = (await tx.get(ref)).data();
        if (current.status === "partially_refunded")
          throw new Error(
            "This order already has a partial refund. Please contact support for cancellation.",
          );
        if (["dispatched", "delivered"].includes(current.fulfillment))
          throw new Error("This order has shipped. Please contact support.");
        tx.update(ref, {
          cancelRequested: true,
          status: current.paymentId
            ? current.refundId
              ? current.status
              : "refund_pending"
            : "cancelled",
        });
      });
      await refundOrder(ref);
    } else if (action === "status") {
      if (order.razorpayOrderId) {
        const payments = await razor(
          `orders/${order.razorpayOrderId}/payments`,
        );
        for (const payment of payments.items || [])
          if (["captured", "authorized", "refunded"].includes(payment.status))
            await reconcile(ref, payment.id);
      }
    } else throw new Error("Unknown action.");
    const updated = publicOrder(await ref.get());
    if (updated.status === "paid" && process.env.WHATSAPP_BUSINESS_NUMBER) {
      const text = `Hi, I have placed order ${updated.number} for ₹${updated.total}. Payment reference: ${updated.paymentId}. Name: ${updated.delivery.fullName}. Please verify this order in your merchant dashboard.`;
      updated.whatsappUrl = `https://wa.me/${process.env.WHATSAPP_BUSINESS_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
    }
    return Response.json({ order: updated });
  } catch (error) {
    console.error("Commerce request failed:", error.code || error.name);
    return Response.json(
      {
        error: error.message?.startsWith("Firebase")
          ? "Sign-in service unavailable. Please try again."
          : error.message || "Unable to process this request.",
      },
      { status: 400 },
    );
  }
}
