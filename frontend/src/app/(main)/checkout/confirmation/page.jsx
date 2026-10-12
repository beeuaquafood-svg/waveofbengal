"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { commerce } from "@/lib/commerce-client";
import { money } from "@/lib/catalog";
const labels = {
  creating: "Preparing your order",
  awaiting_payment: "Payment not yet confirmed",
  paid: "Your order is confirmed.",
  cancelled: "Order cancelled",
  refund_pending: "Your refund is being processed",
  refunded: "Your payment has been refunded",
  partially_refunded: "Your order has a partial refund",
  refund_failed: "Your refund needs attention",
};
export default function Confirmation() {
  const { user, loading } = useAuth();
  const { completeOrder, ready } = useCart();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const refresh = useCallback(
    async (action = "status") => {
      setBusy(true);
      setError("");
      try {
        const id = new URLSearchParams(location.search).get("id");
        if (!id) throw new Error("Select an order from your account.");
        const data = await commerce(user, action, { id });
        setOrder(data.order);
        if (["paid", "cancelled", "refunded"].includes(data.order.status))
          sessionStorage.removeItem("wob-checkout");
      } catch (e) {
        setError(e.message);
      } finally {
        setBusy(false);
      }
    },
    [user],
  );
  useEffect(() => {
    if (user) refresh();
  }, [user, refresh]);
  useEffect(() => {
    if (ready && order?.status === "paid") completeOrder(order);
  }, [ready, order, completeOrder]);
  return (
    <section className="shell order-receipt">
      <span className="eyebrow">WAVE OF BENGAL · YOUR ORDER</span>
      <h1>
        {order
          ? labels[order.status] || "Order update"
          : "Let’s check your order."}
      </h1>
      {loading ? (
        <p>Loading your account…</p>
      ) : !user ? (
        <Link className="button" href="/login?next=%2Faccount%2Forders">
          Sign in to view orders
        </Link>
      ) : null}
      {error && <p role="alert">{error}</p>}
      {order && (
        <>
          <div className="receipt-card">
            <div className="section-heading">
              <h2>{order.number}</h2>
              <strong>{money(order.total)}</strong>
            </div>
            {order.items.map((item, i) => (
              <p key={i}>
                {item.quantity} × {item.name} · {item.size}
              </p>
            ))}
            <hr />
            <p>
              Deliver to {order.delivery.fullName}
              <br />
              {order.delivery.address1}, {order.delivery.city}{" "}
              {order.delivery.zip}
            </p>
            <p className="small-note">
              {order.paymentId
                ? `Payment reference: ${order.paymentId}`
                : "No captured payment confirmed yet. If money was debited, refresh the status before attempting another payment."}
            </p>
            {order.status === "refund_failed" && (
              <p>
                Please contact support with your order number. The refund could
                not be completed automatically.
              </p>
            )}
            {order.status === "refund_pending" && (
              <p>
                Refunds return to the original payment method. Your bank
                determines when the credit appears. Refresh to check progress.
              </p>
            )}
            {order.whatsappUrl && (
              <a
                className="button"
                href={order.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share paid order on WhatsApp ↗
              </a>
            )}
          </div>
          <div className="receipt-actions">
            <button
              className="button secondary"
              disabled={busy}
              onClick={() => refresh()}
            >
              {busy ? "Checking…" : "Refresh payment status"}
            </button>
            {!order.cancelRequested &&
              !["dispatched", "delivered"].includes(order.fulfillment) && (
                <button
                  className="text-link"
                  disabled={busy}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Cancel this order? If payment was captured, a full refund will be requested.",
                      )
                    )
                      refresh("cancel");
                  }}
                >
                  Cancel order
                </button>
              )}
          </div>
        </>
      )}
      <Link className="text-link" href="/account/orders">
        All your orders →
      </Link>
      <p className="small-note">
        Unpaid selections stay in your bag. Verified purchases are removed once.
        A WhatsApp message is optional; our server payment record verifies your
        order.
      </p>
    </section>
  );
}
