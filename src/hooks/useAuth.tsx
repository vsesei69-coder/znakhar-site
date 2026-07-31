import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Order, OrderItem, User } from '@/types'

interface AuthContextValue {
  user: User | null
  register: (data: { name: string; email: string; phone: string; password: string }) => string | null
  login: (email: string, password: string) => string | null
  logout: () => void
  updateProfile: (data: Partial<Pick<User, 'name' | 'phone' | 'address'>>) => void
  orders: Order[]
  placeOrder: (items: OrderItem[], data: { address: string; payment: string; comment?: string }) => void
}

const USERS_KEY = 'znakhar_users'
const SESSION_KEY = 'znakhar_session'
const ORDERS_KEY = 'znakhar_orders'

function hashPassword(pw: string): string {
  let h = 5381
  for (let i = 0; i < pw.length; i++) {
    h = ((h << 5) + h + pw.charCodeAt(i)) | 0
  }
  return 'h' + (h >>> 0).toString(16)
}

function loadUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function loadOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]')
  } catch {
    return []
  }
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  register: () => null,
  login: () => null,
  logout: () => {},
  updateProfile: () => {},
  orders: [],
  placeOrder: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const email = localStorage.getItem(SESSION_KEY)
    if (!email) return null
    return loadUsers().find((u) => u.email === email) ?? null
  })
  const [orders, setOrders] = useState<Order[]>(() =>
    loadOrders().filter((o) => o.email === localStorage.getItem(SESSION_KEY)),
  )

  const register: AuthContextValue['register'] = (data) => {
    const users = loadUsers()
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return 'Пользователь с таким email уже зарегистрирован'
    }
    if (data.password.length < 6) {
      return 'Пароль должен быть не короче 6 символов'
    }
    const newUser: User = {
      id: 'u' + Date.now().toString(36),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashPassword(data.password),
      address: '',
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
    localStorage.setItem(SESSION_KEY, newUser.email)
    setUser(newUser)
    setOrders(loadOrders().filter((o) => o.email === newUser.email))
    return null
  }

  const login: AuthContextValue['login'] = (email, password) => {
    const found = loadUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!found || found.password !== hashPassword(password)) {
      return 'Неверный email или пароль'
    }
    localStorage.setItem(SESSION_KEY, found.email)
    setUser(found)
    setOrders(loadOrders().filter((o) => o.email === found.email))
    return null
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setOrders([])
  }

  const updateProfile: AuthContextValue['updateProfile'] = (data) => {
    if (!user) return
    const users = loadUsers().map((u) => (u.email === user.email ? { ...u, ...data } : u))
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const updated = { ...user, ...data }
    setUser(updated)
  }

  const placeOrder: AuthContextValue['placeOrder'] = (items, data) => {
    if (!user) return
    if (items.length === 0) return
    const order: Order = {
      id: 'Z' + Date.now().toString(36).toUpperCase(),
      email: user.email,
      items,
      total: items.reduce((s, i) => s + i.price * i.quantity, 0),
      address: data.address,
      payment: data.payment,
      comment: data.comment,
      status: 'new',
      date: new Date().toLocaleString('ru-RU'),
    }
    const all = loadOrders()
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...all]))
    setOrders([order, ...orders])
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile, orders, placeOrder }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
