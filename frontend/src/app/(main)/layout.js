import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSlideOut from '@/components/cart/CartSlideOut';
import Background from '@/components/home/background';

export default function MainLayout({ children }) {
  return (
    <div className="bg-sky-light text-ocean-deep flex flex-col min-h-screen">
      <Background />
      <Navbar />
      <CartSlideOut />
      <main className="grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
