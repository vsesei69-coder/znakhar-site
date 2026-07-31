import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'
import { CATEGORY_LABELS, type ProductCategory } from '@/types'

const categories: (ProductCategory | 'all')[] = ['all', 'ointment', 'cream', 'cosmetics', 'aphrodisiac']

export function CatalogPage() {
  const [active, setActive] = useState<ProductCategory | 'all'>('all')
  const filtered = active === 'all' ? products : products.filter((p) => p.category === active)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-background pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm font-medium uppercase tracking-[0.25em] text-primary"
          >
            Каталог
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Наши средства
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 text-lg leading-relaxed text-white/80"
          >
            Каждый продукт создан вручную из эфирных масел ценных растений
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === c
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                }`}
              >
                {c === 'all' ? 'Все' : CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-muted-foreground">
              В этой категории пока нет товаров — скоро появятся.
            </p>
          )}

          <div className="mt-14 text-center">
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Не нашли нужное? Напишите нам
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
