export interface Product {
  id: string
  name: string
  category: 'ointment' | 'cream' | 'cosmetics' | 'aphrodisiac'
  description: string
  price: number
  plantName: string
  plantLatin: string
  plantProperties: string[]
  oilExtracted: string
  allergyWarnings: string[]
  imageUrl: string
  inStock: boolean
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  password: string
  address: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  email: string
  items: OrderItem[]
  total: number
  address: string
  payment: string
  comment?: string
  status: 'new' | 'paid' | 'shipped' | 'done'
  date: string
}

export type ProductCategory = Product['category']

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  ointment: 'Мази',
  cream: 'Кремы',
  cosmetics: 'Косметика ручной работы',
  aphrodisiac: 'Афродизиаки',
}
