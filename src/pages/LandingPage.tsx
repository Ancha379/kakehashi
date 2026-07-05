import Header from '../components/landing2/Header';
import Hero from '../components/landing2/Hero';
import PainPoints from '../components/landing2/PainPoints';
import Features from '../components/landing2/Features';
import Process from '../components/landing2/Process';
import Companies from '../components/landing2/Companies';
import WhyChoose from '../components/landing2/WhyChoose';
import Testimonials from '../components/landing2/Testimonials';
import Pricing from '../components/landing2/Pricing';
import Faq from '../components/landing2/Faq';
import FinalCta from '../components/landing2/FinalCta';
import Footer from '../components/landing2/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Features />
        <Process />
        <Companies />
        <WhyChoose />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
