import { Anton, Inter } from "next/font/google";
import "./globals.css";
import "./storefront.css";
import "./collective.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import AnalyticsEngine from "@/components/analytics/AnalyticsEngine";

// Self-hosted at build time by Next; visitors never contact Google.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  icons: { icon: "/icons/mark.png", apple: "/icons/icon-192.png" },
  manifest: "/manifest.webmanifest",
  title: "Wave of Bengal | Premium Seafood",
  description:
    "Fresh from ocean to your doorstep. Premium, sustainably sourced seafood.",
};

export const viewport = { themeColor: "#06262c" };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
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
