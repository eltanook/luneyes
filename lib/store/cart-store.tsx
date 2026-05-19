'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { toast } from 'sonner'

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  category: string
  productType?: 'physical' | 'digital' | 'service'
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CART_STORAGE_KEY = 'lu-neyez-cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart)
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [items, isHydrated])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    
    // We determine if it's an update or new item by checking current items state
    // But since state is async, we can just show a general success message,
    // or use the current items array (from closure) to guess.
    const isUpdate = items.some((i) => i.id === item.id)
    if (isUpdate) {
      toast.success(`${item.name} actualizado en el carrito`)
    } else {
      toast.success(`${item.name} agregado al carrito`)
    }
  }, [items])

  const removeItem = useCallback((id: string) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      toast.info(`${item.name} eliminado del carrito`)
    }
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [items])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    toast.info('Carrito vaciado')
  }, [])

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
