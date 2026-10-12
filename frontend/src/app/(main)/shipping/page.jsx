import Link from "next/link";
export const metadata = { title: "Shipping & returns | Wave of Bengal" };
export default function Shipping() {
  return (
    <div className="shell support-page">
      <header className="support-heading">
        <span className="eyebrow">FROM OUR COAST TO YOUR KITCHEN</span>
        <h1>
          Every detail.
          <br />
          Carefully considered.
        </h1>
        <p>
          Delivery, receiving your seafood, and getting help when something
          isn’t right.
        </p>
      </header>
      <div className="policy-summary">
        <div>
          <span className="eyebrow">DELIVERY ESTIMATE</span>
          <strong>₹100</strong>
          <p>For product subtotals below ₹2,000.</p>
        </div>
        <div>
          <span className="eyebrow">A LITTLE EXTRA</span>
          <strong>Free delivery</strong>
          <p>For product subtotals of ₹2,000 or more.</p>
        </div>
        <div>
          <span className="eyebrow">BEFORE YOU ORDER</span>
          <strong>Check availability</strong>
          <p>Delivery area and timing need confirmation.</p>
        </div>
      </div>
      <div className="policy-content">
        <section>
          <span className="eyebrow">01 / DELIVERY</span>
          <h2>Know what to expect.</h2>
          <p>
            Delivery estimates appear in your bag alongside the product subtotal
            and estimated tax. Address serviceability and an arrival date must
            be confirmed before an order is accepted.
          </p>
          <div className="quiet-notice">
            Online ordering is available only for supported PIN codes when
            checkout is enabled. Reviewing a selection does not place an order.
            Payment must be verified before your order is confirmed.
          </div>
        </section>
        <section>
          <span className="eyebrow">02 / RECEIVING YOUR SEAFOOD</span>
          <h2>A little care goes a long way.</h2>
          <p>
            Arrange for someone to receive your delivery. Check the packaging
            and product on arrival, then follow the storage instructions on the
            pack promptly.
          </p>
          <p>
            If the packaging is damaged or the product seems unsuitable,
            document the issue and contact us before using it.
          </p>
        </section>
        <section>
          <span className="eyebrow">03 / RETURNS & ORDER ISSUES</span>
          <h2>Let’s put it right.</h2>
          <p>
            Seafood is perishable, so return eligibility depends on the
            product’s condition and the circumstances. Contact us with your
            order reference, the affected product, a description and any
            relevant photographs.
          </p>
          <p>
            We’ll review the issue and explain the next steps. Please contact us
            before sending any perishable product back. This page does not
            promise a refund, replacement or return window before your case is
            reviewed.
          </p>
        </section>
        <section>
          <span className="eyebrow">04 / CHANGES & CANCELLATIONS</span>
          <h2>Plans can change.</h2>
          <p>
            Cancel before dispatch from Your orders in your account. If payment
            was captured, a full refund is requested to the original payment
            method. Bank processing time varies; check your order for refund
            progress. For dispatched orders or delivery issues, contact us for a
            review.
          </p>
        </section>
      </div>
      <div className="editorial-cta">
        <h2>We’re here to help.</h2>
        <Link href="/contact" className="button">
          Contact us ↗
        </Link>
      </div>
    </div>
  );
}
