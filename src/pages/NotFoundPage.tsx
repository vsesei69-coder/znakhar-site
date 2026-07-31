import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <p className="font-display text-7xl font-bold text-primary">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
          Такой страницы нет
        </h1>
        <p className="mt-3 text-muted-foreground">
          Возможно, ссылка устарела или адрес набран с ошибкой.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          На главную
        </Link>
      </div>
    </section>
  )
}
