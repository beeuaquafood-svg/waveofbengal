import Link from "next/link";
import SupportForm from "@/components/storefront/SupportForm";
export const metadata = { title: "Contact us | Wave of Bengal" };
export default function Contact() {
  return (
    <div className="shell support-page">
      <header className="support-heading">
        <span className="eyebrow">LET’S TALK</span>
        <h1>
          A real conversation.
          <br />A better experience.
        </h1>
        <p>
          Choosing your prawns, planning a menu or enquiring for your business?
          Tell us what you have in mind.
        </p>
      </header>
      <div className="contact-layout">
        <aside>
          <span className="eyebrow">HERE FOR YOUR TABLE</span>
          <h2>
            A little help,
            <br />
            when you need it.
          </h2>
          <p>
            For home cooks, restaurants, hotels and retailers. One place to ask
            about our collection.
          </p>
          <div className="contact-links">
            <Link href="/faq">
              Find a quick answer <span>↗</span>
            </Link>
            <Link href="/shipping">
              Shipping &amp; returns <span>↗</span>
            </Link>
            <Link href="/products">
              Explore our catch <span>↗</span>
            </Link>
          </div>
          <p className="small-note">
            For an existing order, include the order reference. Please don’t
            send card details or passwords.
          </p>
        </aside>
        <div className="contact-panel">
          <h2>How can we help?</h2>
          <SupportForm />
        </div>
      </div>
    </div>
  );
}
