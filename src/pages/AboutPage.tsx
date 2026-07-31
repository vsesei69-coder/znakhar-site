import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HandHeart, FlaskConical, Sprout } from 'lucide-react'

export function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm font-medium uppercase tracking-[0.25em] text-primary"
          >
            О фирме
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Знахарь — производство медицинской косметики
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 text-lg leading-relaxed text-white/80"
          >
            Небольшое семейное производство, где древние знания трав встречаются с точными расчётами искусственного интеллекта.
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-base leading-relaxed text-muted-foreground"
          >
            <p>
              Наше производство выросло из семейной практики травника-знахаря, которая передаётся
              из поколения в поколение. Мы собираем сырьё в экологически чистых регионах, вручную
              отбираем растения и экстрагируем масла малыми партиями — так, как это делали до нас.
            </p>
            <p>
              Но рецептура — это не только традиция. Молекулярные взаимодействия эфирных масел,
              концентрации, синергия компонентов — всё это мы рассчитываем с помощью ИИ, который
              анализирует сотни научных исследований и клинических наблюдений. Так рождается синтез:
              древняя интуиция травника плюс современная точность науки.
            </p>
            <p>
              Каждая партия проходит контроль: от проверки сырья до тестирования готового продукта.
              Мы не гонимся за объёмами — мы делаем мало, но качественно. Все наши средства —
              медицинская косметика ручной работы, а не массовый ширпотреб.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Sprout, title: 'Сырьё', text: 'Растения из экологически чистых регионов, сбор в правильное время, ручная сортировка.' },
              { icon: FlaskConical, title: 'Расчёт', text: 'ИИ-анализ сотен исследований: концентрации, совместимость, терапевтический эффект.' },
              { icon: HandHeart, title: 'Руки', text: 'Экстракция и смешивание малыми партиями вручную — как в старых добрых традициях.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                  <f.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/philosophy"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Наша философия производства
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
