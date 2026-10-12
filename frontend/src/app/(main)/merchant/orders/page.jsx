"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { commerce } from "@/lib/commerce-client";
import { money } from "@/lib/catalog";
export default function MerchantOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const data = await commerce(user, "admin-list");
      setOrders(data.orders);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }, [user]);
  useEffect(() => {
    if (user) load();
  }, [user, load]);
  async function update(id, fulfillment) {
    setBusy(true);
    try {
      await commerce(user, "fulfill", { id, fulfillment });
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="shell order-receipt">
      <span className="eyebrow">MERCHANT OPERATIONS</span>
      <h1>Orders, at a glance.</h1>
      {!user ? (
        <Link className="button" href="/login?next=%2Fmerchant%2Forders">
          Sign in as administrator
        </Link>
      ) : (
        <button className="button secondary" disabled={busy} onClick={load}>
          Refresh orders
        </button>
      )}
      {error && <p role="alert">{error}</p>}
      {orders.map((order) => (
        <article className="receipt-card" key={order.id}>
          <div className="section-heading">
            <h2>{order.number}</h2>
            <strong>{money(order.total)}</strong>
          </div>
          <p>
            {order.status.replaceAll("_", " ")} ·{" "}
            {order.fulfillment || "Not dispatched"}
          </p>
          {order.items.map((item, i) => (
            <p key={i}>
              {item.quantity} × {item.name} · {item.size}
            </p>
          ))}
          <p>
            {order.delivery.fullName}
            <br />
            {order.delivery.address1} {order.delivery.address2}
            <br />
            {order.delivery.city}, {order.delivery.state} {order.delivery.zip}
            <br />
            {order.delivery.phone} · {order.delivery.email}
          </p>
          <p className="small-note">
            Payment: {order.paymentId || "Unconfirmed"} · WhatsApp:{" "}
            {order.notificationState || "Not sent"}
          </p>
          {order.status === "paid" &&
            !order.cancelRequested &&
            order.fulfillment !== "delivered" && (
              <button
                className="button"
                disabled={busy}
                onClick={() =>
                  update(
                    order.id,
                    order.fulfillment === "preparing"
                      ? "dispatched"
                      : order.fulfillment === "dispatched"
                        ? "delivered"
                        : "preparing",
                  )
                }
              >
                {order.fulfillment === "preparing"
                  ? "Mark dispatched"
                  : order.fulfillment === "dispatched"
                    ? "Mark delivered"
                    : "Start preparation"}
              </button>
            )}
        </article>
      ))}
    </section>
  );
}
