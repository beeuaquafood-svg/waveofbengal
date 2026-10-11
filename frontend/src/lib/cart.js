export const lineKey = (item) =>
  JSON.stringify([
    String(item.id),
    String(item.size || item.weight || "standard"),
  ]);
export function restoreCart(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item) =>
        item &&
        item.id &&
        Number.isFinite(item.price) &&
        item.price > 0 &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    )
    .reduce((items, item) => {
      const key = lineKey(item);
      const existing = items.find((line) => line.key === key);
      if (existing)
        existing.quantity = Math.min(99, existing.quantity + item.quantity);
      else items.push({ ...item, key, quantity: Math.min(99, item.quantity) });
      return items;
    }, []);
}
export function addLine(cart, product, quantity = 1) {
  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    !Number.isFinite(product.price) ||
    product.price <= 0
  )
    return cart;
  const key = lineKey(product);
  const existing = cart.find((item) => item.key === key);
  return existing
    ? cart.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
          : item,
      )
    : [...cart, { ...product, key, quantity: Math.min(99, quantity) }];
}
