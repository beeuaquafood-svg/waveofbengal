"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { commerce } from "@/lib/commerce-client";
import { money } from "@/lib/catalog";
export default function Orders() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (user)
      commerce(user, "list")
        .then((data) => setOrders(data.orders))
        .catch((e) => setError(e.message));
  }, [user]);
  return (
    <section className="shell order-receipt">
      <span className="eyebrow">YOUR TABLE, YOUR HISTORY</span>
      <h1>Your orders.</h1>
      {error && <p role="alert">{error}</p>}
      {loading ? (
        <p>Loading…</p>
      ) : !user ? (
        <Link className="button" href="/login?next=%2Faccount%2Forders">
          Sign in to view orders
        </Link>
      ) : orders?.length ? (
        orders.map((order) => (
          <Link
            className="receipt-card order-row"
            key={order.id}
            href={`/checkout/confirmation?id=${encodeURIComponent(order.id)}`}
          >
            <strong>{order.number}</strong>
            <span>{order.status.replaceAll("_", " ")}</span>
            <span>{money(order.total)} →</span>
          </Link>
        ))
      ) : (
        <p>
          {orders ? "Your first good meal awaits." : "Loading your orders…"}
        </p>
      )}
      <Link className="text-link" href="/products">
        Explore our catch →
      </Link>
    </section>
  );
}
