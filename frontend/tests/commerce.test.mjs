import test from "node:test";
import assert from "node:assert/strict";
import { addLine, restoreCart } from "../src/lib/cart.js";
import {
  DEFAULT_PRODUCTS,
  normalizeProduct,
  totals,
} from "../src/lib/catalog.js";
const prawn = {
  id: "black-tiger-prawns",
  name: "Black Tiger Prawns",
  size: "250g",
  price: 680,
};
test("different packs remain separate while repeat additions combine", () => {
  let cart = addLine([], prawn, 1);
  cart = addLine(cart, { ...prawn, size: "500g", price: 1200 }, 1);
  cart = addLine(cart, prawn, 2);
  assert.equal(cart.length, 2);
  assert.equal(cart[0].quantity, 3);
  assert.equal(cart[1].price, 1200);
  assert.notEqual(cart[0].key, cart[1].key);
});
test("saved bags migrate to stable variant keys and discard corrupt values", () => {
  const saved = [
    { ...prawn, quantity: 2 },
    { ...prawn, quantity: 1 },
    { ...prawn, quantity: -1 },
    { ...prawn, quantity: 1, price: "not a price" },
    null,
  ];
  assert.equal(restoreCart(saved).length, 1);
  assert.equal(restoreCart(saved)[0].quantity, 3);
  assert.deepEqual(restoreCart({}), []);
});
test("invalid additions cannot poison totals", () => {
  assert.deepEqual(addLine([], prawn, -1), []);
  assert.deepEqual(addLine([], { ...prawn, price: NaN }), []);
});
test("every listed product has at least one explicit purchasable pack", () => {
  assert.equal(
    new Set(DEFAULT_PRODUCTS.map((p) => p.id)).size,
    DEFAULT_PRODUCTS.length,
  );
  for (const raw of DEFAULT_PRODUCTS) {
    const p = normalizeProduct(raw);
    assert.ok(p.sizes.length);
    assert.ok(p.sizes.every((s) => s.id && s.label && s.price > 0));
  }
  assert.equal(
    DEFAULT_PRODUCTS.find((p) => p.id === "black-tiger-prawns").name,
    "Black Tiger Prawns",
  );
  assert.ok(DEFAULT_PRODUCTS.find((p) => p.id === "trial-prawn-sampler"));
});
test("bag and checkout share the same delivery and tax calculation", () => {
  assert.deepEqual(totals(0), { shipping: 0, tax: 0, total: 0 });
  assert.deepEqual(totals(1999), { shipping: 100, tax: 100, total: 2199 });
  assert.deepEqual(totals(2000), { shipping: 0, tax: 100, total: 2100 });
});
