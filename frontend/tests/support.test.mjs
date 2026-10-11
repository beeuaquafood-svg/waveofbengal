import test from "node:test";
import assert from "node:assert/strict";
import { validateSupport } from "../src/lib/support.js";
test("newsletter requires a valid address and explicit consent", () => {
  assert.ok(
    validateSupport({ kind: "newsletter", email: "bad", consent: "yes" }),
  );
  assert.ok(validateSupport({ kind: "newsletter", email: "test@example.com" }));
  assert.equal(
    validateSupport({
      kind: "newsletter",
      email: "test@example.com",
      consent: "yes",
    }),
    null,
  );
});
test("contact input is bounded and topics cannot inject mail headers", () => {
  const enquiry = {
    kind: "contact",
    email: "test@example.com",
    name: "Test",
    topic: "Product enquiry",
    message: "A question about prawns.",
  };
  assert.equal(validateSupport(enquiry), null);
  assert.ok(
    validateSupport({
      ...enquiry,
      topic: "Product enquiry\r\nBcc: spam@example.com",
    }),
  );
  assert.ok(validateSupport({ ...enquiry, message: "a".repeat(3001) }));
  assert.ok(
    validateSupport({
      ...enquiry,
      email: "test@example.com\r\nBcc: spam@example.com",
    }),
  );
  assert.ok(validateSupport(null));
});
