import { PortfolioUIProvider } from '@/components/PortfolioUIProvider';
import CareerTimelineIsland from '@/components/effects/CareerTimelineIsland';
import PortfolioModals from '@/components/effects/PortfolioModals';
import PreloaderOverlay from '@/components/effects/PreloaderOverlay';
import AboutSection from '@/components/sections/AboutSection';
import Certifications from '@/components/Certifications';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StackSection from '@/components/sections/StackSection';
import WorkSection from '@/components/sections/WorkSection';

export default function Home() {
  return (
    <PortfolioUIProvider>
      <div className="min-h-screen bg-brand-bg relative selection:bg-brand-accent selection:text-brand-bg overflow-x-clip">
        <Header />
        <main className="max-w-7xl mx-auto px-[var(--container-inline)] relative">
          <HeroSection />
          <AboutSection />
          <CareerTimelineIsland />
          <ServicesSection />
          <WorkSection />
          <StackSection />
          <Certifications />
          <ContactSection />
          <Footer />
        </main>
        <PortfolioModals />
        <PreloaderOverlay />
      </div>
    </PortfolioUIProvider>
  );
}
