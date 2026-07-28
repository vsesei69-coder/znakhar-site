import { motion } from 'framer-motion'
import { Heart, Stethoscope, Timer, Wind, Sparkles } from 'lucide-react'
import { Img } from '@/components/ui/Img'

const directions = [
  {
    icon: Heart,
    title: 'Афродизиаки',
    desc: 'Натуральные составы на основе иланг-иланга, сандала и жасмина для усиления влечения и чувственности.',
    image: 'https://storage.googleapis.com/figapp-44eac.appspot.com/chat-attachments/3FoHBJJkD7Mo1V4iHB3ZMPbBsUh2/49b70fe8-5f5a-4a8e-9154-776a97acce4f/images/1785221483672-f8o8ckb2if4.png',
    seed: 'aphrodisiac',
  },
  {
    icon: Stethoscope,
    title: 'Лечение простаты',
    desc: 'Мази и масла с тыквенными семенами, крапивой и пальмой сереноа для мужского здоровья.',
    image: 'https://storage.googleapis.com/figapp-44eac.appspot.com/chat-attachments/3FoHBJJkD7Mo1V4iHB3ZMPbBsUh2/49b70fe8-5f5a-4a8e-9154-776a97acce4f/images/1785221483669-0c79s36i7w8d.png',
    seed: 'prostate',
  },
  {
    icon: Timer,
    title: 'Пролонгаторы',
    desc: 'Кремы и мази для продления сексуального контакта на основе натуральных эфирных масел.',
    image: 'https://storage.googleapis.com/figapp-44eac.appspot.com/chat-attachments/3FoHBJJkD7Mo1V4iHB3ZMPbBsUh2/49b70fe8-5f5a-4a8e-9154-776a97acce4f/images/1785221483671-vaw214fuhmh.png',
    seed: 'prolongator',
  },
  {
    icon: Wind,
    title: 'Аромотерапия',
    desc: 'Чистые эфирные масла первого отжима для дома, массажа и медитации.',
    image: 'https://storage.googleapis.com/figapp-44eac.appspot.com/chat-attachments/3FoHBJJkD7Mo1V4iHB3ZMPbBsUh2/49b70fe8-5f5a-4a8e-9154-776a97acce4f/images/1785221723957-03uqc0p78a1h.png',
    seed: 'aroma',
  },
  {
    icon: Sparkles,
    title: 'Косметика ручной работы',
    desc: 'Кремы для лица и тела из масла ши, ромашки и лаванды.',
    image: 'https://storage.googleapis.com/figapp-44eac.appspot.com/chat-attachments/3FoHBJJkD7Mo1V4iHB3ZMPbBsUh2/49b70fe8-5f5a-4a8e-9154-776a97acce4f/images/1785221723955-a9h1ey2gqxf.png',
    seed: 'cosmetics',
  },
]

export function Directions() {
  return (
    <section data-component="src/components/Directions.tsx" id="directions" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
            Направления
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Что мы создаём
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {directions.map((d, i) => (
            <motion.article
              key={d.seed}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative h-48 overflow-hidden">
                <Img
                  src={d.image}
                  alt={d.title}
                  fallbackSeed={d.seed}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/80">
                    <d.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
