import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react'

const contacts = [
  {
    icon: Phone,
    title: 'Телефон',
    value: '+7 (900) 000-00-00',
    hint: 'Ежедневно с 10:00 до 20:00',
  },
  {
    icon: Mail,
    title: 'Почта',
    value: 'hello@znakhar.ru',
    hint: 'Отвечаем в течение дня',
  },
  {
    icon: MessageCircle,
    title: 'Мессенджеры',
    value: 'Telegram / WhatsApp',
    hint: 'Быстрее всего — сюда',
  },
  {
    icon: MapPin,
    title: 'Производство',
    value: 'Россия, экологически чистый регион',
    hint: 'Магазина нет — работаем на заказ и доставкой',
  },
]

export function ContactsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-background pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm font-medium uppercase tracking-[0.25em] text-primary"
          >
            Контакты
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Свяжитесь с нами
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 text-lg leading-relaxed text-white/80"
          >
            Ответим на вопросы о составе, подберём средство под вашу задачу, оформим заказ.
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {contacts.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                  <c.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1.5 text-base font-medium text-primary">{c.value}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  {c.title === 'Производство' && <MapPin className="h-3.5 w-3.5" />}
                  {c.hint}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-12 flex flex-col items-center gap-3 rounded-2xl bg-primary p-8 text-center sm:flex-row sm:justify-between sm:text-left"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-white/80" />
              <p className="text-base text-white">
                Работаем ежедневно с 10:00 до 20:00 (МСК)
              </p>
            </div>
            <p className="text-sm text-white/70">
              Доставка по всей России
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
