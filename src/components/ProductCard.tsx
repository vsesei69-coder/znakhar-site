import { motion } from 'framer-motion'
import { ShoppingCart, Droplet, AlertTriangle } from 'lucide-react'
import { Img } from '@/components/ui/Img'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'
import { CATEGORY_LABELS } from '@/types'
import { toast } from 'sonner'

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart()

  return (
    <motion.article
      data-component="src/components/ProductCard.tsx"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-accent/10"
    >
      <div className="relative h-56 overflow-hidden">
        <Img
          src={product.imageUrl}
          alt={product.name}
          fallbackSeed={product.id}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-accent/80 px-3 py-1 text-[11px] font-medium text-accent-foreground/80 backdrop-blur-sm">
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
            <span className="mt-0.5 shrink-0 font-sans text-[11px] font-semibold uppercase tracking-wide text-primary">
              {product.plantLatin}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-4 space-y-2 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-sm">
            <Droplet className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
            <span className="text-muted-foreground">Масло: <strong className="text-foreground">{product.oilExtracted}</strong></span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-primary">
              Свойства:
            </span>
            {product.plantProperties.slice(0, 3).map((prop) => (
              <span key={prop} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                {prop}
              </span>
            ))}
          </div>
        </div>

        {product.allergyWarnings.length > 0 && (
          <div className="mt-3">
            <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  Аллергия
                </span>
                <ul className="mt-1 list-inside list-disc">
                  {product.allergyWarnings.map((w) => (
                    <li key={w} className="text-[12px] text-primary/80">{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-xl font-bold text-primary">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          <button
            onClick={() => { addItem(product.id); toast.success(`${product.name} добавлен в корзину`) }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <ShoppingCart className="h-4 w-4" />
            В корзину
          </button>
        </div>
      </div>
    </motion.article>
  )
}
