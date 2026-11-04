import Link from "next/link";
import Image from "next/image";
import { money } from "@/lib/catalog";
import {
  SnowflakeIcon,
  BoxIcon,
  ShieldIcon,
  FlameIcon,
  ArrowIcon,
} from "./icons";

const lowest = (product) => Math.min(...product.sizes.map((s) => s.price));

export function Hero({ products }) {
  const from = products.length ? Math.min(...products.map(lowest)) : null;
  return (
    <section className="market-front" aria-labelledby="hero-heading">
      <div className="market-window">
        <Image src="/images/coastal-boutique.webp" alt="The Wave of Bengal seafood counter beneath its striped awning on the waterfront" fill priority sizes="100vw" />
      </div>
      <div className="market-invitation shell">
        <div><span className="wc-kicker">WAVE OF BENGAL · SEAFOOD BOUTIQUE</span>
          <h1 id="hero-heading">The prawn counter</h1>
          <p>From black tiger prawns to garlic butter favourites.</p>
        </div>
        <a className="market-enter" href="#catch-counter">Shop prawns <ArrowIcon /></a>
        {from !== null && <small>Packs from {money(from)}</small>}
      </div>
    </section>
  );
}

// Every line below restates what the product pages, shipping page and
// certifications page already say. Confirm before launch.
const reasons = [
  {
    icon: SnowflakeIcon,
    title: "Frozen at peak",
    copy: "Individually quick-frozen to lock in freshness.",
  },
  {
    icon: BoxIcon,
    title: "Packed to stay cold",
    copy: "Insulated packaging for safe delivery to your door.",
  },
  {
    icon: ShieldIcon,
    title: "Quality, explained",
    copy: "Explore our sourcing and certification information.",
    href: "/certifications",
    cta: "See certifications",
  },
  {
    icon: FlameIcon,
    title: "Ready when you are",
    copy: "Pick a pack, then let our AI kitchen plan dinner.",
    href: "/cook",
    cta: "Find a recipe",
  },
];
export function WhyWave() {
  return (
    <section className="wc-why" aria-labelledby="why-heading">
      <div className="shell">
        <div className="wc-section-head">
          <div>
            <span className="wc-kicker">WHY WAVE OF BENGAL</span>
            <h2 id="why-heading">Care in every detail.</h2>
          </div>
        </div>
        <ul className="wc-why-grid">
          {reasons.map(({ icon: Icon, title, copy, href, cta }) => (
            <li key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{copy}</p>
              {href && (
                <Link href={href}>
                  {cta} <span aria-hidden="true">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const steps = [
  [
    "Find your catch",
    "Browse the collection or start with the way you like to cook.",
  ],
  [
    "Pick your pack",
    "Every product shows its pack weights and prices up front.",
  ],
  [
    "Check out and cook",
    "Delivery is shown in your bag, and free on orders of ₹2,000 or more.",
  ],
];
export function HowItWorks() {
  return (
    <section className="shell wc-section" aria-labelledby="how-heading">
      <div className="wc-section-head">
        <div>
          <span className="wc-kicker">HOW IT WORKS</span>
          <h2 id="how-heading">Three steps to supper.</h2>
        </div>
      </div>
      <ol className="wc-steps">
        {steps.map(([title, copy], i) => (
          <li key={title}>
            <span aria-hidden="true">{i + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CookInvite() {
  return (
    <section className="shell wc-section" aria-labelledby="cook-heading">
      <div className="wc-cook">
        <div>
          <span className="wc-kicker">A LITTLE DINNER INSPIRATION</span>
          <h2 id="cook-heading">A little inspiration for tonight.</h2>
          <p>
            Choose the cuisine, spice and ingredients you love. Our AI kitchen
            helps you turn a pack of prawns into a plan for dinner.
          </p>
          <Link className="button wc-btn wc-btn-lemon" href="/cook">
            Find my recipe <ArrowIcon />
          </Link>
        </div>
        <div className="wc-cook-options" aria-hidden="true">
          <span>Bengali curry</span>
          <span>A quick grill</span>
          <span>Something mild</span>
          <span>Your own twist</span>
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="shell wc-section" aria-labelledby="story-heading">
      <div className="wc-story">
        <div className="wc-story-image">
          <Image
            src="/images/skewers.jpeg"
            alt="Prawn skewers ready for cooking"
            fill
            sizes="(max-width: 900px) 92vw, 46vw"
          />
        </div>
        <div className="wc-story-copy">
          <span className="wc-kicker">ROOTED IN BENGAL</span>
          <h2 id="story-heading">
            A coastal heart.
            <br />A place at your table.
          </h2>
          <p>
            Our love for seafood starts in Bengal. We bring that love to a
            carefully chosen collection of prawns, made for home cooks and
            professional kitchens alike.
          </p>
          <Link className="wc-link" href="/our-story">
            Get to know Wave of Bengal <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
