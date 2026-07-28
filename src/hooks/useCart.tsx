import { createContext, useContext, useState, type ReactNode } from 'react'
import type { CartItem } from '@/types'

interface CartContextValue {
  items: CartItem[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  itemCount: number
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  itemCount: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (productId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { productId, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
