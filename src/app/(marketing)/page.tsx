import { HeroSection } from '@/components/marketing/HeroSection'
import { TrustBar } from '@/components/marketing/TrustBar'
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection'
import { WhyOrbisSection } from '@/components/marketing/WhyOrbisSection'
import { FAQSection } from '@/components/marketing/FAQSection'
import { FinalCTASection } from '@/components/marketing/FinalCTASection'
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <WhyOrbisSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
