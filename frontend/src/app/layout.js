import "./globals.css";
import "./storefront.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import AnalyticsEngine from "@/components/analytics/AnalyticsEngine";

export const metadata = {
  icons: { icon: "/icons/mark.svg", apple: "/icons/icon-192.png" },
  manifest: "/manifest.webmanifest",
  title: "Wave of Bengal | Premium Seafood",
  description:
    "Fresh from ocean to your doorstep. Premium, sustainably sourced seafood.",
};

export const viewport = { themeColor: "#173d3b" };

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
