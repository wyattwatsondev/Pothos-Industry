import { create } from 'zustand'

interface Product {
  id: number
  name: string
  category?: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating?: number
  reviews?: number
  description?: string
  colors?: string[]
  sizes?: string[]
}

interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface FashionStore {
  selectedProduct: Product | null
  cart: CartItem[]
  isCartOpen: boolean
  setSelectedProduct: (product: Product | null) => void
  setCartOpen: (isOpen: boolean) => void
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void
  removeFromCart: (productId: number, size?: string, color?: string) => void
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
}

export const useFashionStore = create<FashionStore>((set) => ({
  selectedProduct: null,
  cart: [],
  isCartOpen: false,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  
  addToCart: (product, quantity, size, color) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      )

      if (existingItemIndex > -1) {
        const newCart = [...state.cart]
        newCart[existingItemIndex].quantity += quantity
        return { cart: newCart, isCartOpen: true }
      }

      return {
        cart: [...state.cart, { ...product, quantity, selectedSize: size, selectedColor: color }],
        isCartOpen: true,
      }
    }),

  removeFromCart: (productId, size, color) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) =>
          !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
      ),
    })),

  updateQuantity: (productId, quantity, size, color) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    })),

  clearCart: () => set({ cart: [] }),
}))
