import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { FloatingChatbot } from '@/components/marketing/ChatbotSection'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
      <FloatingChatbot />
    </>
  )
}
