import Link from "next/link";
export const metadata = {
  title: "Frequently asked questions | Wave of Bengal",
  description:
    "Answers about our prawns, pack sizes, storage, delivery and shopping with Wave of Bengal.",
};
const groups = [
  [
    "Choosing your prawns",
    [
      [
        "Which prawns should I choose?",
        "Black Tiger Prawns have a firm texture and distinctive stripes. Vannamei prawns have a delicate, sweet flavour. Explore ready-to-cook options when you want less preparation. Each product page explains the selection and available packs.",
      ],
      [
        "Can I choose the pack size?",
        "Yes. Choose one of the available weights on the product page before adding it to your bag. The price updates with your selection, and different pack sizes remain separate in the bag.",
      ],
      [
        "Where can I find ingredients and allergens?",
        "See the product details and always check the label on your pack. Prawns contain crustaceans. Marinated and breaded products may contain additional allergens. Contact us if you need more information before choosing.",
      ],
    ],
  ],
  [
    "Your bag & account",
    [
      [
        "Do I need an account?",
        "You can browse, choose packs and review delivery details as a guest. An account lets you save your profile details.",
      ],
      [
        "Can I change my selection?",
        "Yes. Change quantities or remove items from your bag before continuing. To choose another pack size, return to the product page.",
      ],
      [
        "Can I place an order online?",
        "Choose your packs, review your bag and delivery details, then sign in to pay securely with Razorpay. Payment is offered only for supported delivery PIN codes when online ordering is enabled. Your order is confirmed after the server verifies payment. You can track or cancel eligible orders from your account.",
      ],
    ],
  ],
  [
    "Delivery & care",
    [
      [
        "What does delivery cost?",
        "The bag currently estimates ₹100 for delivery, with free delivery for product subtotals of ₹2,000 or more. Delivery availability, charges and timing must be confirmed before an order is accepted.",
      ],
      [
        "How should I store my prawns?",
        "Follow the storage instructions and use-by date printed on your pack. Keep frozen products frozen until you are ready to prepare them.",
      ],
      [
        "What if there is a problem with my delivery?",
        "Contact us with your order reference, a description of the issue and photographs where possible. Keep the packaging and follow the storage instructions while the issue is reviewed. See Shipping & Returns for more details.",
      ],
    ],
  ],
];
export default function FAQ() {
  return (
    <div className="shell support-page">
      <header className="support-heading">
        <span className="eyebrow">A LITTLE CLARITY</span>
        <h1>
          Good questions.
          <br />
          Straight answers.
        </h1>
        <p>Everything you need to feel at home with our collection.</p>
      </header>
      <div className="support-layout">
        <nav className="support-index" aria-label="FAQ sections">
          {groups.map(([name], i) => (
            <a href={`#questions-${i}`} key={name}>
              {name}
              <span>↗</span>
            </a>
          ))}
          <Link href="/contact">Still need a hand? →</Link>
        </nav>
        <div className="faq-groups">
          {groups.map(([name, questions], i) => (
            <section id={`questions-${i}`} key={name}>
              <span className="eyebrow">0{i + 1}</span>
              <h2>{name}</h2>
              {questions.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </section>
          ))}
        </div>
      </div>
      <div className="editorial-cta">
        <h2>A question of your own?</h2>
        <Link className="button" href="/contact">
          Talk to us ↗
        </Link>
      </div>
    </div>
  );
}
