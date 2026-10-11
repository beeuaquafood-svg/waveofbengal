// Shared by the home, catalogue and detail pages. Prices are preserved from the original catalogue.
export const DEFAULT_PRODUCTS = [
  {
    id: "black-tiger-prawns",
    name: "Black Tiger Prawns",
    description:
      "Our flagship variety - large, succulent prawns with distinctive black stripes.",
    weight: "500g",
    price: 1200,
    category: "Prawns",
    image: "/images/black%20tiger.jpeg",
    whatYouReceive: "Carefully cleaned and frozen at peak freshness.",
    whatYouReceiveDetail:
      "Premium export-grade seafood, individually quick-frozen to lock in freshness. Each batch is quality-checked and packed in insulated packaging for safe delivery. Our cold-chain infrastructure ensures the product reaches you in perfect condition.",
    sizes: [
      {
        id: "250g",
        label: "250g",
        price: 680,
      },
      {
        id: "350g",
        label: "350g",
        price: 950,
      },
      {
        id: "500g",
        label: "500g",
        price: 1200,
      },
      {
        id: "1kg",
        label: "1 Kg",
        price: 2200,
      },
    ],
    stock: 100,
    status: "active",
  },
  {
    id: "butter-prawns",
    name: "Butter Prawns",
    description:
      "Marinated in rich garlic butter and aromatic herbs. Ready to sauté or grill.",
    weight: "500g",
    price: 950,
    category: "Prawns",
    image: "/images/butter%20prawns%20.jpeg",
    whatYouReceive: "Carefully cleaned and frozen at peak freshness.",
    whatYouReceiveDetail:
      "Marinated with signature spice blend, vacuum-sealed for freshness. Ready to cook straight from the pack after thawing.",
    sizes: [
      {
        id: "250g",
        label: "250g",
        price: 500,
      },
      {
        id: "350g",
        label: "350g",
        price: 700,
      },
      {
        id: "500g",
        label: "500g",
        price: 950,
      },
      {
        id: "1kg",
        label: "1 Kg",
        price: 1800,
      },
    ],
    stock: 80,
    status: "active",
  },
  {
    id: "prawn-skewers",
    name: "Prawn Skewers",
    description:
      "Expertly threaded and seasoned prawns on bamboo skewers for BBQ & grilling.",
    weight: "400g (6 skewers)",
    price: 850,
    category: "Ready-to-Cook",
    image: "/images/skewers.jpeg",
    whatYouReceive: "Pre-threaded skewers, ready to grill.",
    whatYouReceiveDetail:
      "Six perfectly threaded skewers with premium prawns, seasoned and ready for the grill or pan. Each skewer is individually wrapped.",
    sizes: [
      {
        id: "200g",
        label: "200g",
        price: 450,
      },
      {
        id: "400g",
        label: "400g",
        price: 850,
      },
      {
        id: "800g",
        label: "800g",
        price: 1600,
      },
    ],
    stock: 60,
    status: "active",
  },
  {
    id: "vannamei-prawns",
    name: "Vannamei Prawns",
    description:
      "Premium white prawns with delicate, sweet flavor for all cooking methods.",
    weight: "500g",
    price: 750,
    category: "Prawns",
    image: "/images/black%20tiger.jpeg",
    whatYouReceive: "Carefully cleaned and frozen at peak freshness.",
    whatYouReceiveDetail:
      "Farm-raised premium Vannamei, cleaned and deveined. Individually quick-frozen for maximum freshness.",
    sizes: [
      {
        id: "250g",
        label: "250g",
        price: 400,
      },
      {
        id: "500g",
        label: "500g",
        price: 750,
      },
      {
        id: "1kg",
        label: "1 Kg",
        price: 1400,
      },
    ],
    stock: 120,
    status: "active",
  },
  {
    id: "headless-peeled-shrimp",
    name: "Headless Peeled Shrimp",
    description:
      "Cleaned, deveined and ready to cook. Saves prep time with premium freshness.",
    weight: "500g",
    price: 800,
    category: "Prawns",
    image: "/images/butter%20prawns%20.jpeg",
    whatYouReceive: "Carefully cleaned and frozen at peak freshness.",
    whatYouReceiveDetail:
      "Headless, peeled, and deveined — zero prep required. Simply thaw and cook. Each piece is individually frozen for easy portioning.",
    sizes: [
      {
        id: "250g",
        label: "250g",
        price: 430,
      },
      {
        id: "500g",
        label: "500g",
        price: 800,
      },
      {
        id: "1kg",
        label: "1 Kg",
        price: 1500,
      },
    ],
    stock: 90,
    status: "active",
  },
  {
    id: "shrimp-ebi-fry",
    name: "Shrimp Ebi Fry",
    description:
      "Japanese-style breaded prawns, pre-seasoned and ready to fry to crispy perfection.",
    weight: "400g (10 pieces)",
    price: 900,
    category: "Ready-to-Cook",
    image: "/images/skewers.jpeg",
    whatYouReceive: "Pre-breaded and ready to fry.",
    whatYouReceiveDetail:
      "Ten pieces of premium Ebi Fry, coated in authentic panko breadcrumbs. Deep fry from frozen for 3-4 minutes until golden.",
    sizes: [
      {
        id: "200g",
        label: "200g",
        price: 480,
      },
      {
        id: "400g",
        label: "400g",
        price: 900,
      },
      {
        id: "800g",
        label: "800g",
        price: 1700,
      },
    ],
    stock: 70,
    status: "active",
  },
  {
    id: "connoisseurs-collection",
    name: "Connoisseur's Collection",
    description:
      "Experience our signature trio: Black Tiger (250g), Vannamei (250g), Butter Prawns (250g).",
    weight: "750g Total",
    price: 1350,
    category: "Signature Dishes",
    stock: 50,
    status: "active",
    image: "/images/black%20tiger.jpeg",
    sizes: [
      {
        id: "750g Total",
        label: "750g Total",
        price: 1350,
      },
    ],
  },
  {
    id: "chefs-starter-pack",
    name: "Chef's Starter Pack",
    description:
      "Ready-to-cook premium selections: Butterfly Cut (250g), Marinated Shrimp (250g), Skewers (200g).",
    weight: "700g Total",
    price: 1250,
    category: "Chef's Special",
    stock: 40,
    status: "active",
    image: "/images/butter%20prawns%20.jpeg",
    sizes: [
      {
        id: "700g Total",
        label: "700g Total",
        price: 1250,
      },
    ],
  },
  {
    id: "trial-prawn-sampler",
    name: "Trial Prawn Sampler",
    description:
      "Try our best-sellers: Black Tiger (100g), Vannamei (100g), Butter Prawns (100g). Perfect for first-time buyers.",
    weight: "300g Total",
    price: 499,
    category: "Trial Packs",
    stock: 100,
    status: "active",
    image: "/images/black%20tiger.jpeg",
    sizes: [
      {
        id: "300g Total",
        label: "300g Total",
        price: 499,
      },
    ],
  },
  {
    id: "trial-ready-to-cook",
    name: "Trial Ready-to-Cook Box",
    description:
      "Mini portions of Ebi Fry (150g) and Prawn Skewers (150g). Taste before you commit!",
    weight: "300g Total",
    price: 449,
    category: "Trial Packs",
    stock: 80,
    status: "active",
    image: "/images/skewers.jpeg",
    sizes: [
      {
        id: "300g Total",
        label: "300g Total",
        price: 449,
      },
    ],
  },
  {
    id: "chefs-bengali-special",
    name: "Chef's Bengali Special",
    description:
      "Authentic Bengali-style marinated prawns with mustard, turmeric & green chili. A true Kolkata delicacy.",
    weight: "500g",
    price: 1100,
    category: "Chef's Special",
    stock: 35,
    status: "active",
    image: "/images/butter%20prawns%20.jpeg",
    sizes: [
      {
        id: "500g",
        label: "500g",
        price: 1100,
      },
    ],
  },
  {
    id: "signature-bay-platter",
    name: "Bay of Bengal Platter",
    description:
      "Our crown jewel — hand-picked jumbo Black Tiger, Vannamei, and seasoned Scampi in one premium box.",
    weight: "1 Kg Total",
    price: 2200,
    category: "Signature Dishes",
    stock: 25,
    status: "active",
    image: "/images/black%20tiger.jpeg",
    sizes: [
      {
        id: "1 Kg Total",
        label: "1 Kg Total",
        price: 2200,
      },
    ],
  },
];
export const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
export function normalizeProduct(product) {
  const sizes = (
    product.sizes?.length
      ? product.sizes
      : [
          {
            id: product.weight || "standard",
            label: product.weight || "Standard pack",
            price: product.price,
          },
        ]
  )
    .filter(
      (size) => Number.isFinite(Number(size.price)) && Number(size.price) > 0,
    )
    .map((size) => ({
      ...size,
      id: String(size.id || size.label),
      price: Number(size.price),
    }));
  return {
    ...product,
    sizes,
    image: product.images?.[0] || product.image || "/images/black%20tiger.jpeg",
  };
}
export function getCatalogue() {
  try {
    const saved = JSON.parse(localStorage.getItem("wob_products"));
    if (Array.isArray(saved))
      return saved
        .map(normalizeProduct)
        .filter((p) => p.status === "active" && p.sizes.length);
  } catch {
    /* A malformed local catalogue must not break browsing. */
  }
  return DEFAULT_PRODUCTS.map(normalizeProduct);
}
export function totals(subtotal) {
  const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 100;
  const tax = Math.round(subtotal * 0.05);
  return { shipping, tax, total: subtotal + shipping + tax };
}
