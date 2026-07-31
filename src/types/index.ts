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

export type ProductCategory = Product['category']

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  ointment: 'Мази',
  cream: 'Кремы',
  cosmetics: 'Косметика ручной работы',
  aphrodisiac: 'Афродизиаки',
}
