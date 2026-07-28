import { motion } from 'framer-motion'
import { Brain, Leaf } from 'lucide-react'

export function Philosophy() {
  return (
    <section data-component="src/components/Philosophy.tsx" id="philosophy" className="bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Философия
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Синтез науки и природы
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-muted-foreground">
            Искусственный интеллект рассчитывает точные формулы, анализируя сотни исследований. Древние знания трав и их лечебные свойства, передаваемые знахарем из поколения в поколение, наполняют каждую формулу силой природы.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20">
              <Brain className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-primary-foreground">
              ИИ-расчёт рецептов
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
              Нейросеть анализирует молекулярные взаимодействия эфирных масел, подбирает оптимальные концентрации и прогнозирует терапевтический эффект каждой формулы.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-primary-foreground">
              Древние знания трав
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
              Тысячелетний опыт травников: какие растения усиливают друг друга, в какое время сбора их сила максимальна, как правильно экстрагировать масло.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
