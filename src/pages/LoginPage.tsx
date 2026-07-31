import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const error = login(email.trim(), password)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Добро пожаловать!')
    navigate('/account')
  }

  const inputCls =
    'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none'

  return (
    <section className="relative isolate overflow-hidden bg-background pt-32 pb-20 sm:pt-40">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
      <div className="relative mx-auto max-w-md px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card p-8"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Личный кабинет
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground">Вход</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Войди, чтобы оформить заказ и следить за его статусом.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mail.ru" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Пароль</label>
              <input type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Войти
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
