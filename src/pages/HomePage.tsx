import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { Directions } from '@/components/Directions'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'

export function HomePage() {
  const featured = products.slice(0, 3)

  return (
    <>
      <Hero />
      <Philosophy />
      <Directions />

      <section id="catalog-preview" className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Каталог
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Наши средства
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Каждый продукт создан вручную из эфирных масел ценных растений
            </p>
          </motion.div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Весь каталог
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
