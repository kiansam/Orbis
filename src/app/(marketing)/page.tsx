import { HeroSection } from '@/components/marketing/HeroSection'
import { TrustBar } from '@/components/marketing/TrustBar'
import { OurProcessSection } from '@/components/marketing/OurProcessSection'
import { WhatWeBuildSection } from '@/components/marketing/WhatWeBuildSection'
import { WhyOrbisSection } from '@/components/marketing/WhyOrbisSection'
import { FAQSection } from '@/components/marketing/FAQSection'
import { FinalCTASection } from '@/components/marketing/FinalCTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <WhatWeBuildSection />
      <OurProcessSection />
      <WhyOrbisSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
