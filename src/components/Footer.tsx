import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const categories = [
  { to: '/category/ointment', label: 'Мази' },
  { to: '/category/cream', label: 'Кремы' },
  { to: '/category/cosmetics', label: 'Косметика ручной работы' },
  { to: '/category/aphrodisiac', label: 'Афродизиаки' },
]

const pages = [
  { to: '/about', label: 'О фирме' },
  { to: '/philosophy', label: 'Философия' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/contacts', label: 'Контакты' },
]

export function Footer() {
  return (
    <footer data-component="src/components/Footer.tsx" className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div>
            <Link to="/" className="font-display text-2xl font-bold text-primary">
              Знахарь
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Синтез ИИ и древних знаний трав
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6 sm:flex sm:flex-wrap sm:gap-10">
            <ul className="space-y-1.5">
              <li className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Каталог</li>
              {categories.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-1.5">
              <li className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Компания</li>
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Знахарь. Все права защищены.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Создано с <Heart className="h-3 w-3 text-primary" /> и ИИ
          </p>
        </div>
      </div>
    </footer>
  )
}
