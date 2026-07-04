import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import PainPoints from '../components/landing/PainPoints';
import MarketStats from '../components/landing/MarketStats';
import ServiceOverview from '../components/landing/ServiceOverview';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import ServiceFlow from '../components/landing/ServiceFlow';
import Pricing from '../components/landing/Pricing';
import Faq from '../components/landing/Faq';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <MarketStats />
        <ServiceOverview />
        <HowItWorks />
        <Features />
        <WhyChooseUs />
        <ServiceFlow />
        <Pricing />
        <Faq />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
