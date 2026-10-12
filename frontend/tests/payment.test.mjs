import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import {
  quote,
  signature,
  reconcile,
  refundOrder,
} from "../src/lib/server/commerce.js";
function fixture(initial) {
  let order = {
    amount: 10000,
    razorpayOrderId: "order_123",
    status: "awaiting_payment",
    ...initial,
  };
  const ref = {
    id: "test-order-12345",
    get: async () => ({ data: () => ({ ...order }) }),
    update: async (patch) => Object.assign(order, patch),
  };
  const database = () => ({
    runTransaction: async (fn) =>
      fn({ get: ref.get, update: (_, patch) => Object.assign(order, patch) }),
  });
  return { ref, database, order };
}
test("server ignores forged client prices and rejects malformed cart quantities", () => {
  const result = quote([
    { id: "black-tiger-prawns", size: "250g", price: 1, quantity: 2 },
  ]);
  assert.equal(result.subtotal, 1360);
  assert.throws(() =>
    quote([{ id: "black-tiger-prawns", size: "250g", quantity: -1 }]),
  );
  assert.throws(() => quote([{ id: "invented", size: "250g", quantity: 1 }]));
});
test("signature rejects bad encoding and tampering", () => {
  const digest = createHmac("sha256", "secret")
    .update("order_1|pay_1")
    .digest("hex");
  assert.equal(signature("order_1|pay_1", digest, "secret"), true);
  assert.equal(signature("order_2|pay_1", digest, "secret"), false);
  assert.equal(signature("order_1|pay_1", "oops", "secret"), false);
});
test("authorized payment is captured before paid notification; duplicate callbacks remain paid", async () => {
  const f = fixture();
  const calls = [];
  const provider = async (path) => {
    calls.push(path);
    return {
      order_id: "order_123",
      amount: 10000,
      currency: "INR",
      status: path.endsWith("/capture") ? "captured" : "authorized",
    };
  };
  const notify = async () => {
    assert.equal(f.order.status, "paid");
  };
  await reconcile(f.ref, "pay_123", {
    database: f.database,
    razor: provider,
    notify,
  });
  assert.equal(f.order.paymentId, "pay_123");
  assert.equal(calls[1], "payments/pay_123/capture");
  await reconcile(f.ref, "pay_123", {
    database: f.database,
    razor: provider,
    notify,
  });
  assert.equal(f.order.status, "paid");
});
test("mismatched amount and foreign order never become paid", async () => {
  for (const patch of [
    { amount: 1 },
    { order_id: "order_other" },
    { currency: "USD" },
  ]) {
    const f = fixture();
    await assert.rejects(
      reconcile(f.ref, "pay_123", {
        database: f.database,
        razor: async () => ({
          order_id: "order_123",
          amount: 10000,
          currency: "INR",
          status: "captured",
          ...patch,
        }),
        notify: async () => assert.fail(),
      }),
    );
    assert.equal(f.order.status, "awaiting_payment");
  }
});
test("failed payment produces no paid status or notification", async () => {
  const f = fixture();
  await reconcile(f.ref, "pay_123", {
    database: f.database,
    razor: async () => ({
      order_id: "order_123",
      amount: 10000,
      currency: "INR",
      status: "failed",
    }),
    notify: async () => assert.fail(),
  });
  assert.equal(f.order.status, "awaiting_payment");
});
test("late captured payment after cancellation automatically requests full refund", async () => {
  const f = fixture({ cancelRequested: true, status: "cancelled" });
  let key;
  await reconcile(f.ref, "pay_123", {
    database: f.database,
    razor: async (path, body, idempotency) => {
      if (path.endsWith("/refund")) {
        key = idempotency;
        assert.equal(body.amount, 10000);
        return { id: "rfnd_123", status: "pending" };
      }
      return {
        order_id: "order_123",
        amount: 10000,
        currency: "INR",
        status: "captured",
      };
    },
    notify: async () => assert.fail(),
  });
  assert.equal(f.order.status, "refund_pending");
  assert.match(key, /^wob-rf-[a-f0-9]{32}$/);
  await refundOrder(f.ref, async (path) => {
    assert.equal(path, "refunds/rfnd_123");
    return { status: "processed" };
  });
  assert.equal(f.order.status, "refunded");
});
test("refund timeout retains stable retry key", async () => {
  const f = fixture({
    paymentId: "pay_123",
    cancelRequested: true,
    status: "refund_pending",
  });
  let first;
  await assert.rejects(
    refundOrder(f.ref, async (_, __, key) => {
      first = key;
      throw new Error("timeout");
    }),
  );
  await refundOrder(f.ref, async (_, __, key) => {
    assert.equal(key, first);
    return { id: "rfnd_123", status: "processed" };
  });
  assert.equal(f.order.status, "refunded");
});

import { notifyMerchant } from "../src/lib/server/whatsapp.js";
const notificationEnv = {
  WHATSAPP_ACCESS_TOKEN: "test",
  WHATSAPP_PHONE_NUMBER_ID: "test",
  WHATSAPP_MERCHANT_NUMBER: "test",
  WHATSAPP_TEMPLATE: "test",
  WHATSAPP_GRAPH_VERSION: "v-test",
};
test("WhatsApp is never sent for unpaid or cancelled orders and sends once after capture", async () => {
  let sent = 0;
  for (const initial of [
    { status: "awaiting_payment" },
    { status: "paid", cancelRequested: true },
    { status: "paid", notificationState: "sent" },
  ]) {
    const f = fixture(initial);
    await notifyMerchant(f.ref, {
      database: f.database,
      env: notificationEnv,
      fetch: async () => {
        sent++;
      },
    });
  }
  assert.equal(sent, 0);
  const f = fixture({
    status: "paid",
    number: "WOB-test",
    total: 100,
    delivery: { fullName: "Test" },
    paymentId: "pay_123",
  });
  const services = {
    database: f.database,
    env: notificationEnv,
    fetch: async () => {
      sent++;
      return {
        ok: true,
        json: async () => ({ messages: [{ id: "message_123" }] }),
      };
    },
  };
  await notifyMerchant(f.ref, services);
  await notifyMerchant(f.ref, services);
  assert.equal(sent, 1);
  assert.equal(f.order.notificationState, "sent");
});
test("transaction retry cannot retain a stale notification claim", async () => {
  const f = fixture({ status: "paid" });
  const db = () => ({
    runTransaction: async (fn) => {
      await fn({ get: f.ref.get, update: () => {} });
      await f.ref.update({ notificationState: "sent" });
      return fn({ get: f.ref.get, update: () => {} });
    },
  });
  await notifyMerchant(f.ref, {
    database: db,
    env: notificationEnv,
    fetch: async () => assert.fail("Duplicate notification"),
  });
});
