import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'
import { CATEGORY_LABELS, type ProductCategory } from '@/types'

const categoryDescriptions: Record<ProductCategory, string> = {
  ointment: 'Лечебные мази на основе растительных масел и экстрактов. Созданы для точечной поддержки здоровья в проверенных традицией направлениях.',
  cream: 'Ручные кремы для лица и тела на базе масел ши, какао и натуральных экстрактов. Питание, увлажнение и уход без химии.',
  cosmetics: 'Косметика ручной работы: кремы, бальзамы и уходовые средства из натуральных компонентов. Малые партии, полный состав.',
  aphrodisiac: 'Натуральные афродизиаки на основе иланг-иланга, сандала и жасмина. Деликатное усиление чувственности силой растений.',
}

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = slug as ProductCategory

  const items = products.filter((p) => p.category === category)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-background pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/catalog"
              className="inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Каталог
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            {CATEGORY_LABELS[category] ?? 'Категория'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80"
          >
            {categoryDescriptions[category]}
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {items.length === 0 && (
            <p className="mt-16 text-center text-muted-foreground">
              В этой категории пока нет товаров — скоро появятся.
            </p>
          )}

          <div className="mt-14 text-center">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
