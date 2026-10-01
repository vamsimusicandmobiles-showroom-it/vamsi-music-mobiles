import Benefits from '@/components/Benefits';
import Categories from '@/components/Categories';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import MobileDock from '@/components/MobileDock';
import Navbar from '@/components/Navbar';
import Showroom from '@/components/Showroom';
import Statement from '@/components/Statement';

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <Statement />
        <Categories />
        <Benefits />
        <Showroom />
        <FinalCTA />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
