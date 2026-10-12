import { notifyMerchant } from "./whatsapp.js";
import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { DEFAULT_PRODUCTS, normalizeProduct, totals } from "../catalog.js";
export function database() {
  if (!getApps().length) {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT)
      throw new Error("Store service is not configured.");
    initializeApp({
      credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    });
  }
  return getFirestore();
}
export async function identity(request) {
  database();
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) throw new Error("Please sign in to continue.");
  return getAuth().verifyIdToken(token, true);
}
export function signature(message, signature, secret) {
  if (!secret || !/^[a-f0-9]{64}$/i.test(signature || "")) return false;
  const expected = createHmac("sha256", secret).update(message).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}
export async function razor(path, body, idempotency) {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)
    throw new Error("Payments are not configured yet.");
  const response = await fetch(`https://api.razorpay.com/v1/${path}`, {
    method: body ? "POST" : "GET",
    cache: "no-store",
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")}`,
      "Content-Type": "application/json",
      ...(idempotency ? { "X-Refund-Idempotency": idempotency } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000),
  });
  const result = await response.json();
  if (!response.ok)
    throw new Error(
      "Payment provider is temporarily unavailable. Check your order before trying again.",
    );
  return result;
}
export function quote(items) {
  if (!Array.isArray(items) || !items.length || items.length > 30)
    throw new Error("Please review your bag.");
  const lines = items.map((item) => {
    const product = DEFAULT_PRODUCTS.map(normalizeProduct).find(
      (p) => p.id === item.id,
    );
    const size = product?.sizes.find((s) => s.label === item.size);
    if (
      !size ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 20
    )
      throw new Error("A selection is unavailable. Please review your bag.");
    return {
      id: product.id,
      name: product.name,
      size: size.label,
      quantity: item.quantity,
      price: size.price,
    };
  });
  const subtotal = lines.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return { items: lines, subtotal, ...totals(subtotal) };
}
export async function refundOrder(ref, provider = razor) {
  const order = (await ref.get()).data();
  if (!order.paymentId) return;
  if (order.refundId) {
    const existing = await provider(`refunds/${order.refundId}`);
    if (existing.status === "processed")
      await ref.update({ status: "refunded" });
    else if (existing.status === "failed")
      await ref.update({ status: "refund_failed" });
    return;
  }
  // Stable provider idempotency key makes retries safe after a timeout or crash.
  const refund = await provider(
    `payments/${order.paymentId}/refund`,
    { amount: order.amount, speed: "normal" },
    `wob-rf-${createHash("sha256").update(ref.id).digest("hex").slice(0, 32)}`,
  );
  await ref.update({
    refundId: refund.id,
    status: refund.status === "processed" ? "refunded" : "refund_pending",
    updatedAt: Date.now(),
  });
}
export async function reconcile(ref, paymentId, services = {}) {
  const provider = services.razor || razor;
  const db = services.database || database;
  const notify = services.notify || notifyMerchant;
  if (!/^pay_[a-zA-Z0-9]+$/.test(paymentId || ""))
    throw new Error("Invalid payment reference.");
  const order = (await ref.get()).data();
  let payment = await provider(`payments/${paymentId}`);
  if (
    payment.order_id !== order.razorpayOrderId ||
    payment.amount !== order.amount ||
    payment.currency !== "INR"
  )
    throw new Error("Payment does not match this order.");
  if (payment.status === "authorized") {
    try {
      payment = await provider(`payments/${paymentId}/capture`, {
        amount: order.amount,
        currency: "INR",
      });
    } catch {
      payment = await provider(`payments/${paymentId}`);
    }
  }
  if (payment.status !== "captured" && payment.status !== "refunded") return;
  await db().runTransaction(async (tx) => {
    const current = (await tx.get(ref)).data();
    if (current.paymentId && current.paymentId !== paymentId)
      throw new Error(
        "Order already has a different payment. Contact support.",
      );
    tx.update(ref, {
      paymentId,
      status:
        payment.status === "refunded"
          ? "refunded"
          : payment.amount_refunded > 0
            ? "partially_refunded"
            : current.cancelRequested
              ? current.refundId
                ? current.status
                : "refund_pending"
              : "paid",
      updatedAt: Date.now(),
    });
  });
  if ((await ref.get()).data().cancelRequested)
    await refundOrder(ref, provider);
  else await notify(ref);
}
export function publicOrder(doc) {
  const value = doc.data();
  const { uid: _uid, ...safe } = value;
  return { id: doc.id, ...safe };
}
