import "./globals.css";
import "./storefront.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import AnalyticsEngine from "@/components/analytics/AnalyticsEngine";

export const metadata = {
  title: "Wave of Bengal | Premium Seafood",
  description:
    "Fresh from ocean to your doorstep. Premium, sustainably sourced seafood.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <AnalyticsEngine />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
