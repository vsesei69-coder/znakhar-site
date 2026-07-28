import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer data-component="src/components/Footer.tsx" className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-primary">Знахарь</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Синтез ИИ и древних знаний трав
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <ul className="space-y-1.5">
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Афродизиаки</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Лечение простаты</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Пролонгаторы</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Аромотерапия</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Косметика ручной работы</a></li>
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
