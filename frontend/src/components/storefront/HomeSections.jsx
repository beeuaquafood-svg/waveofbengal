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
  const flagship = products.find((p) => p.id === "black-tiger-prawns");
  return (
    <section className="wc-hero" aria-labelledby="hero-heading">
      <div className="shell wc-hero-inner">
        <div className="wc-hero-copy">
          <span className="wc-kicker">
            WAVE OF BENGAL · THE PRAWN COLLECTION
          </span>
          <h1 id="hero-heading">
            Bring the coast <em>to your table.</em>
          </h1>
          <p>
            Prawns for a quick supper, a family favourite, or something worth
            celebrating. Find your catch. Choose your pack. Make it delicious.
          </p>
          <div className="wc-hero-actions">
            <Link className="button wc-btn wc-btn-coral" href="/products">
              Shop the catch <ArrowIcon />
            </Link>
            <Link className="wc-btn wc-btn-ghost" href="/cook">
              Cook with AI
            </Link>
          </div>
          <ul className="wc-hero-facts" aria-label="At a glance">
            <li>
              <strong>{products.length}</strong>
              <span>selections</span>
            </li>
            {from && (
              <li>
                <strong>{money(from)}</strong>
                <span>packs from</span>
              </li>
            )}
            <li>
              <strong>Free</strong>
              <span>delivery ₹2,000+</span>
            </li>
          </ul>
        </div>
        <div className="wc-hero-visual">
          <div className="wc-hero-photo">
            <Image
              src="/images/black%20tiger.jpeg"
              alt="Raw Black Tiger Prawns arranged with herbs and citrus"
              fill
              priority
              sizes="(max-width: 900px) 92vw, 46vw"
            />
          </div>
          <svg
            className="wc-sticker"
            viewBox="0 0 120 120"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <path
                id="wc-sticker-path"
                d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
              />
            </defs>
            <circle cx="60" cy="60" r="58" className="wc-sticker-bg" />
            <text className="wc-sticker-text">
              <textPath
                href="#wc-sticker-path"
                textLength="276"
                lengthAdjust="spacing"
              >
                FRESH ✦ FROZEN AT PEAK ✦ FROM BENGAL ✦
              </textPath>
            </text>
            <path
              className="wc-sticker-mark"
              d="M34 62c8-10 14-10 22 0s14 10 22 0 10-8 14-6M34 74c8-10 14-10 22 0s14 10 22 0 10-8 14-6"
            />
          </svg>
          {flagship && (
            <Link className="wc-hero-tag" href={`/products/${flagship.id}`}>
              <small>The signature selection</small>
              <strong>{flagship.name}</strong>
              <span>
                from {money(lowest(flagship))} <ArrowIcon />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

const marquee = [
  "Prawns",
  "Ready-to-Cook",
  "Trial Packs",
  "Signature Dishes",
  "Chef’s Specials",
];
export function Marquee() {
  const row = (hidden) => (
    <ul className="wc-marquee-row" aria-hidden={hidden || undefined}>
      {marquee.map((t) => (
        <li key={t}>
          {t}
          <i aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="wc-marquee"
      aria-label="Categories: Prawns, Ready-to-Cook, Trial Packs, Signature Dishes, Chef’s Specials"
      role="img"
    >
      <div className="wc-marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

const paths = [
  ["01", "Keep it classic", "Prawns to cook your way.", "Prawns", "coral"],
  [
    "02",
    "Make dinner easy",
    "Explore ready-to-cook favourites.",
    "Ready-to-Cook",
    "lemon",
  ],
  [
    "03",
    "Try something new",
    "Start with a smaller selection.",
    "Trial Packs",
    "sea",
  ],
];
export function Paths() {
  return (
    <section className="shell wc-section" aria-labelledby="paths-heading">
      <div className="wc-section-head">
        <div>
          <span className="wc-kicker">WHAT’S ON YOUR MENU?</span>
          <h2 id="paths-heading">A catch for every kind of cook.</h2>
        </div>
      </div>
      <div className="wc-paths">
        {paths.map(([number, title, copy, category, tone]) => (
          <Link
            key={category}
            className="wc-path"
            data-tone={tone}
            href={`/products?category=${encodeURIComponent(category)}`}
          >
            <span className="wc-path-number">{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            <span className="wc-path-go" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
        ))}
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
    title: "Certified standards",
    copy: "FSSAI, HACCP, MPEDA and FDA compliance.",
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
            <h2 id="why-heading">Good seafood. No guesswork.</h2>
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
          <h2 id="cook-heading">Your catch. Your kind of cooking.</h2>
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
