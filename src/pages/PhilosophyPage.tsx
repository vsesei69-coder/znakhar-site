import { motion } from 'framer-motion'
import { Brain, Leaf, ShieldCheck, Recycle, HeartPulse } from 'lucide-react'

const principles = [
  {
    icon: Leaf,
    title: 'Натуральность без компромиссов',
    text: 'Никаких синтетических ароматизаторов, красителей и консервантов. Только эфирные масла, базовые растительные масла и натуральные экстракты. Состав каждой банки можно прочитать и понять без химического словаря.',
  },
  {
    icon: Brain,
    title: 'ИИ-расчёт формул',
    text: 'Нейросеть анализирует молекулярные взаимодействия, подбирает концентрации и прогнозирует эффект. Это не замена знанию травника, а его усиление: машина видит то, что глаз человека пропустит.',
  },
  {
    icon: Recycle,
    title: 'Малые партии, ручная работа',
    text: 'Мы не производим на конвейере. Каждая партия — это вдумчивый процесс: ручная экстракция, ручное смешивание, ручной контроль. Мало — значит точно.',
  },
  {
    icon: HeartPulse,
    title: 'Медицинская ответственность',
    text: 'Наши средства — медицинская косметика, а не лекарства. Мы честно говорим об этом, даём инструкции по применению и предупреждаем об аллергиях. Здоровье — это то, с чем нельзя играть.',
  },
  {
    icon: ShieldCheck,
    title: 'Контроль каждой партии',
    text: 'Сырьё проверяется на чистоту, готовый продукт — на стабильность и запах. Партия не уходит с производства, пока не пройдёт все проверки.',
  },
  {
    icon: Leaf,
    title: 'Сила времени',
    text: 'Тысячелетний опыт травников — не суеверие, а эмпирика. Мы сохраняем её: время сбора, сочетания растений, методы экстракции — всё, что проверено поколениями.',
  },
]

export function PhilosophyPage() {
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
            Философия
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Синтез науки и природы
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 text-lg leading-relaxed text-white/80"
          >
            ИИ рассчитывает точные формулы, анализируя сотни исследований. Древние знания трав наполняют каждую формулу силой природы.
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                  <p.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-2xl bg-primary p-8 text-center sm:p-12"
          >
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Меньше — значит больше
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
              Мы сознательно не расширяем линейку в погоне за ассортиментом. Каждое средство проходит
              путь от рук знахаря до рук покупателя, и на каждом этапе есть место заботе.
              Это и есть наша философия производства.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
