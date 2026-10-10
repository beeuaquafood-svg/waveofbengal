import { Playfair_Display, Inter, Space_Grotesk, Zilla_Slab, Cinzel, Fraunces } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from '@/contexts/CartContext';
import AnalyticsEngine from '@/components/analytics/AnalyticsEngine';

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const zillaSlab = Zilla_Slab({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700'], variable: "--font-heading" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800', '900'], variable: "--font-cinzel" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata = {
    title: "Wave of Bengal | Premium Seafood",
    description: "Fresh from ocean to your doorstep. Premium, sustainably sourced seafood.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} ${zillaSlab.variable} ${cinzel.variable} ${fraunces.variable} font-body antialiased selection:bg-oceanic-blue/20`}
                suppressHydrationWarning
            >
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