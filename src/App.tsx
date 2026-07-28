import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/hooks/useCart'
// fig-compose: manual — single-page site with hand-composed sections
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { Directions } from '@/components/Directions'
import { Catalog } from '@/components/Catalog'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Toaster />
        <Navbar />
        <main>
          <Hero />
          <Philosophy />
          <Directions />
          <Catalog />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
