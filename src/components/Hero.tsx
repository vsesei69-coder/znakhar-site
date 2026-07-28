import { motion, useReducedMotion } from 'framer-motion'
import { Img } from '@/components/ui/Img'

// fig-anchor: ken-burns-hero-still
// fig-entrance: staggered-fade

export function Hero() {
  const reduced = useReducedMotion()
  return (
    <section data-component="src/components/Hero.tsx" className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          initial={reduced ? {} : { scale: 1.08 }}
          animate={reduced ? {} : { scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          className="h-full w-full"
        >
          <Img
            src="https://storage.googleapis.com/figapp-44eac.appspot.com/chat-attachments/3FoHBJJkD7Mo1V4iHB3ZMPbBsUh2/49b70fe8-5f5a-4a8e-9154-776a97acce4f/images/1785221483674-8e1jm14d99y.png"
            alt=""
            fallbackSeed="hero"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/30" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 text-center">
        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-sans text-sm font-medium uppercase tracking-[0.25em] text-primary animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          ИИ + древние знания трав
        </motion.p>

        <motion.h1
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 font-display text-5xl font-bold tracking-tight text-white sm:text-7xl"
        >
          Знахарь
        </motion.h1>

        <motion.p
          initial={reduced ? {} : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-white/80"
        >
          Медицинская косметика из эфирных масел ценных растений. ИИ рассчитывает формулы — древние знания трав дают силу.
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 12 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-10"
        >
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
          >
            Смотреть каталог
          </a>
        </motion.div>
      </div>
    </section>
  )
}
