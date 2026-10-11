import Link from "next/link";
import Image from "next/image";
import fssaiImg from "@/fssai.jpg";
import fdaImg from "@/fda.jpg";
import haccpImg from "@/haccp.jpg";
import mpedaImg from "@/mpeda.jpg";
import eiaImg from "@/eia.jpg";
import aeoImg from "@/aeo.jpg";
const certifications = [
  {
    category: "Certifications",
    items: [
      {
        name: "FSSAI",
        subtitle: "Food Safety & Standards Authority of India",
        desc: "FSSAI certification ensures that all our products meet the food safety and hygiene standards mandated by the Government of India. Every product we deliver is safe, properly labelled, and regularly audited.",
        image: fssaiImg,
        features: [
          "Safe for human consumption",
          "No harmful contaminants",
          "Proper labeling standards",
          "Regular quality audits",
        ],
      },
      {
        name: "FDA",
        subtitle: "U.S. Food & Drug Administration",
        desc: "FDA registration and compliance enables Wave of Bengal to meet the stringent food safety requirements of the United States market, ensuring our seafood is globally trusted.",
        image: fdaImg,
        features: [
          "Meets U.S. food safety standards",
          "Proper hazard controls",
          "International market compliance",
          "Rigorous inspection protocols",
        ],
      },
      {
        name: "HACCP",
        subtitle: "Hazard Analysis Critical Control Points",
        desc: "HACCP certification demonstrates our commitment to identifying and preventing hazards throughout the food production process, from catch to delivery.",
        image: haccpImg,
        features: [
          "Systematic hazard prevention",
          "Critical control point monitoring",
          "Documentation & verification",
          "Continuous improvement",
        ],
      },
      {
        name: "MPEDA",
        subtitle: "Marine Products Export Development Authority",
        desc: "MPEDA registration certifies Wave of Bengal as an approved seafood processor and exporter under the Government of India, enabling us to serve international markets with confidence.",
        image: mpedaImg,
        features: [
          "Government-approved exporter",
          "Marine product quality standards",
          "Export facilitation support",
          "Regular compliance audits",
        ],
      },
      {
        name: "EIA / EIC",
        subtitle: "Export Inspection Agency / Council, Govt. of India",
        desc: "EIC approval including our competent in-house lab ensures that every batch of seafood processed by Wave of Bengal meets international export quality and safety standards mandated by the Government of India.",
        image: eiaImg,
        features: [
          "Approved in-house laboratory",
          "Export quality assurance",
          "Government of India certified",
          "Batch-level quality testing",
        ],
      },
      {
        name: "AEO",
        subtitle: "Authorized Economic Operator",
        desc: "AEO certification by Indian Customs recognises Wave of Bengal as a trusted, compliant, and secure trade partner — enabling faster clearances and streamlined export operations.",
        image: aeoImg,
        features: [
          "Customs-trusted operator",
          "Faster export clearances",
          "Secure supply chain",
          "Trade compliance excellence",
        ],
      },
    ],
  },
];

export default function Certifications() {
  return (
    <div className="shell editorial-page">
      <div className="editorial-heading">
        <span className="eyebrow">OUR STANDARDS</span>
        <h1>Care, at every step.</h1>
        <p>
          Explore the food safety and trade standards presented by Wave of
          Bengal.
        </p>
      </div>
      <div className="standards-grid">
        {certifications
          .flatMap((group) => group.items || group.certifications || [])
          .map((item) => (
            <article key={item.name}>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={80}
                className="standard-logo"
              />
              <h2>{item.name}</h2>
              <span>{item.subtitle}</span>
              <p>{item.desc}</p>
            </article>
          ))}
      </div>
      <div className="editorial-cta">
        <h2>Know what’s on your table.</h2>
        <Link className="button" href="/products">
          Explore the collection ↗
        </Link>
      </div>
    </div>
  );
}
