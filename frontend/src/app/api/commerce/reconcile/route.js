import { timingSafeEqual } from "node:crypto";
import { database, razor, reconcile, refundOrder } from "@/lib/server/commerce";
export const runtime = "nodejs";
export async function GET(request) {
  const supplied = Buffer.from(request.headers.get("authorization") || "");
  const expected = Buffer.from(
    `Bearer ${process.env.COMMERCE_CRON_SECRET || ""}`,
  );
  if (
    !process.env.COMMERCE_CRON_SECRET ||
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  )
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const orders = await database()
    .collection("commerceOrders")
    .where("status", "in", ["awaiting_payment", "refund_pending", "cancelled"])
    .orderBy("lastChecked", "asc")
    .limit(50)
    .get();
  let checked = 0;
  let failed = 0;
  for (const doc of orders.docs) {
    try {
      const order = doc.data();
      if (order.paymentId && order.cancelRequested) await refundOrder(doc.ref);
      else if (order.razorpayOrderId) {
        const payments = await razor(
          `orders/${order.razorpayOrderId}/payments`,
        );
        for (const payment of payments.items || [])
          if (["authorized", "captured", "refunded"].includes(payment.status))
            await reconcile(doc.ref, payment.id);
      }
      await doc.ref.update({ lastChecked: Date.now() });
      checked++;
    } catch {
      await doc.ref.update({ lastChecked: Date.now() });
      failed++;
    }
  }
  return Response.json({ checked, failed });
}
