import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import ParticleBackground from '@/components/marketing/ParticleBackground'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ParticleBackground />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
