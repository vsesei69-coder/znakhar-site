import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, ShoppingCart, Droplet, AlertTriangle, FlaskConical, Check } from 'lucide-react'
import { Img } from '@/components/ui/Img'
import { useCart } from '@/hooks/useCart'
import { products } from '@/data/products'
import { CATEGORY_LABELS } from '@/types'
import { toast } from 'sonner'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Товар не найден</h1>
          <p className="mt-3 text-muted-foreground">Возможно, он уже продан или снят с производства.</p>
          <Link
            to="/catalog"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            В каталог
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to={`/category/${product.category}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            {CATEGORY_LABELS[product.category]}
          </Link>
        </motion.div>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl border border-border"
          >
            <Img
              src={product.imageUrl}
              alt={product.name}
              fallbackSeed={product.id}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-secondary-foreground">
              {CATEGORY_LABELS[product.category]}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm font-medium uppercase tracking-wide text-primary">
              {product.plantName} · {product.plantLatin}
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Масло</p>
                  <p className="mt-1 text-sm text-foreground">{product.oilExtracted}</p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Свойства</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.plantProperties.map((prop) => (
                    <span key={prop} className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {product.allergyWarnings.length > 0 && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Важно: аллергия и противопоказания</p>
                  <ul className="mt-1.5 list-inside list-disc text-sm text-primary/80">
                    {product.allergyWarnings.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <span className="font-display text-3xl font-bold text-primary">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              <button
                onClick={() => { addItem(product.id); toast.success(`${product.name} добавлен в корзину`) }}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <ShoppingCart className="h-5 w-5" />
                В корзину
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Droplet className="h-4 w-4 text-primary" />
              {product.inStock ? 'В наличии — производим малыми партиями' : 'Нет в наличии — уточните у нас сроки'}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
