import Shop from "@/components/storefront/Shop";
import { DEFAULT_PRODUCTS } from "@/lib/catalog";
export const metadata = { title: "Shop prawns | Wave of Bengal" };
export default async function Products({ searchParams }) {
  const params = await searchParams;
  const category = DEFAULT_PRODUCTS.some(
    (product) => product.category === params.category,
  )
    ? params.category
    : "All";
  return <Shop key={category} initialCategory={category} />;
}
