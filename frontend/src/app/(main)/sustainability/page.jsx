import Link from "next/link";
import Image from "next/image";
export default function Sustainability() {
  return (
    <div className="shell editorial-page">
      <div className="editorial-heading">
        <span className="eyebrow">A FUTURE FOR OUR COAST</span>
        <h1>
          Good food starts
          <br />
          with thoughtful choices.
        </h1>
        <p>
          Respect for our coast, our ingredients, and the people who make every
          meal possible.
        </p>
      </div>
      <div className="editorial-photo">
        <Image
          src="/images/black%20tiger.jpeg"
          alt="Black Tiger Prawns, a Bengal favourite"
          fill
          priority
          unoptimized
          sizes="100vw"
        />
      </div>
      <div className="values-grid">
        {[
          [
            "01",
            "Closer to the source",
            "Our story is rooted in relationships with the farmers and seafood communities of Bengal. Those relationships shape the way we think about our food.",
          ],
          [
            "02",
            "Choose what you need",
            "Different pack sizes make it easier to buy for your table. Choose a small pack for a quiet dinner, or a larger one for sharing.",
          ],
          [
            "03",
            "Make the most of every pack",
            "Follow the storage instructions, plan your portions, and use your ingredients with care. A thoughtful kitchen is a good place to start.",
          ],
        ].map(([n, title, copy]) => (
          <article key={n}>
            <span className="eyebrow">{n}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <div className="editorial-cta">
        <h2>Get to know our roots.</h2>
        <Link className="button" href="/our-story">
          Read our story ↗
        </Link>
      </div>
    </div>
  );
}
