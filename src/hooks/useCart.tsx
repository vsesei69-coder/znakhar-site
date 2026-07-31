import { createContext, useContext, useState, type ReactNode } from 'react'
import type { CartItem } from '@/types'

const CART_KEY = 'znakhar_cart'

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]')
  } catch {
    return []
  }
}

interface CartContextValue {
  items: CartItem[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
  itemCount: number
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clear: () => {},
  itemCount: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)

  const persist = (next: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(next))
    setItems(next)
  }

  const addItem = (productId: string) => {
    persist(
      items.some((i) => i.productId === productId)
        ? items.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i))
        : [...items, { productId, quantity: 1 }],
    )
  }

  const removeItem = (productId: string) => {
    persist(items.filter((i) => i.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    persist(items.map((i) => (i.productId === productId ? { ...i, quantity } : i)))
  }

  const clear = () => persist([])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
