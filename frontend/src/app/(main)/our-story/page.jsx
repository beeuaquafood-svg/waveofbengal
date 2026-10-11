import Image from "next/image";
import Link from "next/link";
const storyFrames = [
  {
    label: "Brand Story",
    year: "Est. 1970s",
    heading: "Our Story",
    body: [
      "Wave of Bengal is recognised as one of the most trusted names in seafood processing from the Eastern Coast of India, West Bengal, Kolkata. We have positioned our brand uniquely and strategically, serving consumers across India.",
      "Keeping up with the dynamism of our acquired knowledge, modern infrastructure, and innovative technology \u2014 including a competent in-house lab approved by EIC, Govt. of India \u2014 we have been committed since inception to pushing forward growth consistency from advanced shrimp processing to delivering a range of best-quality and value-added shrimps.",
      "Today, Wave of Bengal brings the finest sustainably sourced seafood directly to your doorstep in Kolkata, combining over four decades of industry expertise with state-of-the-art processing facilities.",
    ],
    cta: { label: "Shop Fresh Catch", href: "/products" },
    scrollHint: true,
  },
  {
    label: "The Foundation",
    year: "1970s",
    heading: "The Foundation",
    highlight: "Where it all began",
    body: [
      "Network building stage \u2014 we began forging strong bonds with local farmers and suppliers across West Bengal, acting as a trade channel partner and laying the groundwork for a robust supply chain.",
      "These early relationships with aquaculture farmers became the bedrock of everything Wave of Bengal stands for today.",
    ],
  },
  {
    label: "Empowering Farmers",
    year: "1980s",
    heading: "Empowering Farmers",
    highlight: "Growth through partnership",
    body: [
      "We enhanced our business model by providing financial support to farmers for aquaculture investment along with buyback arrangements.",
      "This created a win-win ecosystem \u2014 empowering local communities while securing a reliable, high-quality supply of shrimp.",
    ],
  },
  {
    label: "Processing Mastery",
    year: "1990s",
    heading: "Processing Mastery",
    highlight: "Supply chain excellence",
    body: [
      "We acquired responsibility of factory management for processing and reached the zenith of supply chain capability in West Bengal.",
      "Quality control became our hallmark, with every step of the process carefully monitored to ensure premium standards.",
    ],
  },
  {
    label: "Rapid Growth",
    year: "2000s",
    heading: "Rapid Growth",
    highlight: "Establishing the brand",
    body: [
      "Wave of Bengal evolved as the fastest growing and most reliable processor of frozen shrimp from West Bengal.",
      "We invested heavily in building infrastructure with state-of-the-art modern processing facilities, earning international accreditations and gaining complete control over our supply chain.",
    ],
  },
  {
    label: "Modern Era",
    year: "2013",
    heading: "Modern Processing",
    highlight: "State of the art",
    body: [
      "We established our modern processing unit at Rajarhat, Kolkata \u2014 strategically located within 30 minutes of Kolkata airport. Our facility accommodates 500 workers equipped with advanced safety measures and BSCI-approved social compliances.",
      "Wave of Bengal took the lead in certifying aquaculture shrimp farms through independent bodies such as ASC and BAP, championing environmental sustainability and social responsibility.",
    ],
  },
  {
    label: "Serving India",
    year: "2025",
    heading: "Serving India",
    highlight: "A new chapter begins",
    body: [
      "Wave of Bengal began serving consumers directly in India, starting from Kolkata. We stand with our core fundamentals \u2014 engaging with our farmers and customers, creating better supply chains, and meeting consumer needs with refined services, teamwork, and flawless management.",
      "From the Bay of Bengal to your doorstep \u2014 premium, sustainably sourced seafood, now just a click away.",
    ],
    cta: { label: "Shop Fresh Catch", href: "/products" },
  },
];

export default function Story() {
  return (
    <div className="shell editorial-page">
      <div className="editorial-heading">
        <span className="eyebrow">OUR BENGAL STORY</span>
        <h1>
          Coastal roots.
          <br />A shared table.
        </h1>
        <p>
          From relationships with local farmers to a collection for your
          kitchen. Discover the story behind Wave of Bengal.
        </p>
      </div>
      <div className="editorial-photo">
        <Image
          src="/images/black%20tiger.jpeg"
          alt="Black Tiger Prawns with herbs and citrus"
          fill
          priority

          sizes="100vw"
        />
      </div>
      <div className="story-timeline">
        {storyFrames.map((frame) => (
          <section key={frame.year}>
            <span className="eyebrow">{frame.year}</span>
            <div>
              <h2>{frame.heading}</h2>
              {frame.body.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="editorial-cta">
        <h2>Bring a little Bengal home.</h2>
        <Link href="/products" className="button">
          Explore the collection ↗
        </Link>
      </div>
    </div>
  );
}
