import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, User as UserIcon, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'

const STATUS_LABELS: Record<string, string> = {
  new: 'Новый — ждёт подтверждения менеджера',
  paid: 'Оплачен',
  shipped: 'Отправлен',
  done: 'Выполнен',
}

export function AccountPage() {
  const { user, logout, updateProfile, orders } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [address, setAddress] = useState(user?.address ?? '')

  const myOrders = orders.filter((o) => o.email === user?.email)

  const onSave = (e: FormEvent) => {
    e.preventDefault()
    updateProfile({ name: name.trim(), phone: phone.trim(), address: address.trim() })
    toast.success('Данные сохранены')
  }

  const onLogout = () => {
    logout()
    toast.info('Вы вышли из кабинета')
    navigate('/')
  }

  if (!user) {
    return (
      <section className="relative isolate overflow-hidden bg-background pt-32 pb-20 sm:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
        <div className="relative mx-auto max-w-md px-4 text-center sm:px-6">
          <UserIcon className="mx-auto h-16 w-16 text-muted-foreground/40" />
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">Личный кабинет</h1>
          <p className="mt-3 text-muted-foreground">
            Войди, чтобы видеть заказы, адрес доставки и статусы оплаты.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/login"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const inputCls =
    'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none'

  return (
    <section className="relative isolate overflow-hidden bg-background pt-32 pb-20 sm:pt-40">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Личный кабинет
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground">
              Здравствуй, {user.name}!
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-red-400/50 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </button>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[380px_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={onSave}
            className="h-fit rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="font-display text-xl font-semibold text-foreground">Мои данные</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Имя</label>
                <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input className={inputCls} value={user.email} disabled />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Телефон</label>
                <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Адрес доставки
                </label>
                <textarea
                  className={inputCls}
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Город, улица, дом, квартира"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
              >
                Сохранить
              </button>
            </div>
          </motion.form>

          <div>
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
              <Package className="h-5 w-5 text-primary" />
              Мои заказы
            </h2>

            {myOrders.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">Заказов пока нет.</p>
                <Link
                  to="/catalog"
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Перейти в каталог →
                </Link>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {myOrders.map((order) => (
                  <div key={order.id} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-sm font-bold text-primary">{order.id}</span>
                        <span className="ml-3 text-xs text-muted-foreground">{order.date}</span>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {order.items.map((item) => (
                        <li
                          key={item.productId}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-foreground">
                            {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                          </span>
                          <span className="font-medium text-foreground">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-sm">
                      <span className="text-muted-foreground">Оплата: {order.payment}</span>
                      <span className="font-display text-lg font-bold text-foreground">
                        {order.total.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Доставка: {order.address}</p>
                    {order.comment && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Комментарий: {order.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
