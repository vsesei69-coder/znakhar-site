import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      data-component="src/components/Navbar.tsx"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-black/60 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="font-display text-xl font-bold text-primary">
          Знахарь
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#philosophy" className="text-sm text-white/70 transition-colors hover:text-white">Философия</a>
          <a href="#directions" className="text-sm text-white/70 transition-colors hover:text-white">Направления</a>
          <a href="#catalog" className="text-sm text-white/70 transition-colors hover:text-white">Каталог</a>
          <button className="relative inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90">
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/95 px-4 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-3">
            <a href="#philosophy" className="text-sm text-white/70" onClick={() => setOpen(false)}>Философия</a>
            <a href="#directions" className="text-sm text-white/70" onClick={() => setOpen(false)}>Направления</a>
            <a href="#catalog" className="text-sm text-white/70" onClick={() => setOpen(false)}>Каталог</a>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
              <ShoppingCart className="h-4 w-4" />
              Корзина {itemCount > 0 && `(${itemCount})`}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
