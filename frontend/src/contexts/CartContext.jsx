"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { addLine, restoreCart, lineKey } from "@/lib/cart";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    try {
      // Hydrate before persisting so an initial empty render cannot erase the bag.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCart(restoreCart(JSON.parse(localStorage.getItem("wob_cart"))));
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("wob_cart", JSON.stringify(cart));
      } catch {
        /* Keep the in-memory bag usable. */
      }
    }
  }, [cart, ready]);
  const addToCart = (product, quantity = 1) =>
    setCart((current) => addLine(current, product, quantity));
  const removeFromCart = (key) =>
    setCart((current) => current.filter((item) => item.key !== key));
  const updateQuantity = (key, quantity) => {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
    setCart((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity } : item)),
    );
  };
  const completeOrder = useCallback((order) => {
    if (!order || order.status !== "paid") return;
    try {
      const marker = `wob-completed-${order.id}`;
      if (localStorage.getItem(marker)) return;
      localStorage.setItem(marker, "true");
      setCart((current) =>
        current.flatMap((item) => {
          const purchased = order.items
            .filter((line) => lineKey(line) === item.key)
            .reduce((sum, line) => sum + line.quantity, 0);
          const quantity = item.quantity - purchased;
          return quantity > 0 ? [{ ...item, quantity }] : [];
        }),
      );
    } catch {
      /* Keep the bag intact if persistent deduplication is unavailable. */
    }
  }, []);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        ready,
        addToCart,
        removeFromCart,
        updateQuantity,
        completeOrder,
        clearCart: () => setCart([]),
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
