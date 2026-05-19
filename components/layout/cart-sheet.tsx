'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash, ShoppingBag } from '@phosphor-icons/react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCart } from '@/lib/store/cart-store'

export function CartSheet() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal, totalItems } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg px-8">
        <SheetHeader className="px-0">
          <SheetTitle className="font-serif text-xl">
            Mi Carrito ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
            <motion.div 
              className="w-20 h-20 rounded-full bg-muted flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingBag className="w-10 h-10 text-muted-foreground" weight="duotone" />
            </motion.div>
            <div>
              <p className="font-medium text-foreground">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground mt-1">
                Explora nuestro catálogo y encuentra lo que necesitas
              </p>
            </div>
            <Button asChild onClick={() => setIsCartOpen(false)}>
              <Link href="/catalogo">Ver catálogo</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-8">
              <div className="space-y-4 py-4 px-8">
                {items.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className="flex gap-4 p-3 bg-muted/30 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" weight="bold" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" weight="bold" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash className="h-4 w-4" weight="duotone" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                      {item.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(item.originalPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4 px-0">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-lg">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                El pago se procesará mediante Mercado Pago
              </p>
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  Continuar al pago
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
