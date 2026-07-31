import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { products } from '@/data/products'
import type { OrderItem } from '@/types'

const PAYMENT_METHODS = [
  { id: 'sbp', label: 'СБП (перевод по номеру телефона)', note: 'Мгновенно, без комиссии' },
  { id: 'mir', label: 'Карта МИР', note: 'Перевод на карту' },
  { id: 'yoomoney', label: 'ЮMoney', note: 'Кошелёк ЮMoney' },
  { id: 'crypto', label: 'Криптовалюта', note: 'USDT / BTC — реквизиты пришлём после заказа' },
  { id: 'cash', label: 'При получении', note: 'Оплата курьеру / при самовывозе' },
]

export function CartPage() {
  const { items, updateQuantity, removeItem, clear, itemCount } = useCart()
  const { user, placeOrder } = useAuth()
  const navigate = useNavigate()

  const [address, setAddress] = useState(user?.address ?? '')
  const [payment, setPayment] = useState('sbp')
  const [comment, setComment] = useState('')

  const rows: OrderItem[] = items
    .map((i) => {
      const p = products.find((pp) => pp.id === i.productId)
      return p ? { productId: p.id, name: p.name, price: p.price, quantity: i.quantity } : null
    })
    .filter((r): r is OrderItem => r !== null)

  const total = rows.reduce((s, r) => s + r.price * r.quantity, 0)

  const onCheckout = (e: FormEvent) => {
    e.preventDefault()
    if (rows.length === 0) return
    if (!user) {
      toast.info('Для оформления заказа нужно войти в кабинет')
      navigate('/login')
      return
    }
    if (!address.trim()) {
      toast.error('Укажи адрес доставки')
      return
    }
    placeOrder(rows, { address: address.trim(), payment, comment: comment.trim() || undefined })
    clear()
    toast.success('Заказ оформлен! Смотри статус в кабинете')
    navigate('/account')
  }

  if (rows.length === 0) {
    return (
      <section className="relative isolate overflow-hidden bg-background pt-32 pb-20 sm:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">Корзина пуста</h1>
          <p className="mt-3 text-muted-foreground">
            Загляни в каталог — там найдёшь то, что тебе нужно.
          </p>
          <Link
            to="/catalog"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
          >
            Перейти в каталог
          </Link>
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
        <h1 className="font-display text-3xl font-bold text-foreground">
          Корзина <span className="text-primary">({itemCount})</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {rows.map((row) => (
              <div
                key={row.productId}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex-1">
                  <p className="font-display font-semibold text-foreground">{row.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.price.toLocaleString('ru-RU')} ₽ за шт.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(row.productId, row.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label="Меньше"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-foreground">{row.quantity}</span>
                  <button
                    onClick={() => updateQuantity(row.productId, row.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label="Больше"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="w-24 text-right font-semibold text-foreground">
                  {(row.price * row.quantity).toLocaleString('ru-RU')} ₽
                </div>
                <button
                  onClick={() => removeItem(row.productId)}
                  className="text-muted-foreground transition-colors hover:text-red-400"
                  aria-label="Удалить"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={onCheckout} className="h-fit rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Оформление заказа</h2>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Адрес доставки</label>
              <textarea
                className={inputCls}
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Город, улица, дом, квартира"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-foreground">Способ оплаты</label>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-3 transition-colors has-[:checked]:border-primary"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="mt-1 accent-[hsl(var(--primary))]"
                    />
                    <span>
                      <span className="block text-sm font-medium text-foreground">{m.label}</span>
                      <span className="block text-xs text-muted-foreground">{m.note}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Комментарий к заказу</label>
              <input className={inputCls} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Необязательно" />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Итого</span>
              <span className="font-display text-2xl font-bold text-foreground">
                {total.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              {user ? 'Оформить заказ' : 'Войти и оформить'}
            </button>
            {!user && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Оформление без регистрации недоступно — нужен адрес доставки.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
