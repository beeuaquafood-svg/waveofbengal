import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default function MainLayout({ children }) {
  return (
    <div className="storefront">
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
