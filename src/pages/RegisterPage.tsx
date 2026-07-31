import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      toast.error('Заполни все поля')
      return
    }
    if (password !== password2) {
      toast.error('Пароли не совпадают')
      return
    }
    const error = register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password })
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Регистрация успешна, добро пожаловать!')
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
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground">Регистрация</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Создай аккаунт, чтобы оформить заказ и видеть его статус.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Имя</label>
              <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к тебе обращаться" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mail.ru" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Телефон</label>
              <input type="tel" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 900 000-00-00" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Пароль</label>
              <input type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Минимум 6 символов" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Повтори пароль</label>
              <input type="password" className={inputCls} value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Ещё раз" />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Зарегистрироваться
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Войти
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
