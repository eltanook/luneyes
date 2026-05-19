'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CaretLeft, 
  ShoppingBag, 
  CreditCard, 
  Lock, 
  CheckCircle,
  WhatsappLogo,
  ArrowRight,
  Envelope
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/store/cart-store'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dni: '',
  })

  // Prevent SSR flash/mismatch for cart items
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, name: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (items.length === 0) {
      toast.error('Tu carrito está vacío')
      return
    }

    setIsLoading(true)

    // Simulate sending transaction to Mercado Pago preference endpoint
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSuccess(true)
    clearCart()
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen py-12 md:py-20 flex items-center">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-soft-lg border"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto mb-6 flex items-center justify-center text-emerald-500">
              <CheckCircle className="w-12 h-12" weight="fill" />
            </div>
            
            <h1 className="font-serif text-3xl font-bold mb-4 text-foreground">
              ¡Pago procesado con éxito!
            </h1>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              ¡Muchas gracias por tu compra! Ya recibimos tu pedido y el pago se acreditó correctamente mediante Mercado Pago. En breve recibirás un correo con las instrucciones de acceso y descarga.
            </p>

            <div className="bg-muted/40 rounded-2xl p-6 text-left mb-8 space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                ¿Qué sigue ahora?
              </h3>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                  1
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Revisá tu casilla de email</p>
                  <p className="text-muted-foreground">Te enviamos un enlace de descarga y acceso para tus guías y recetarios.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                  2
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Coordiná tus asesorías por WhatsApp</p>
                  <p className="text-muted-foreground">Si compraste un programa personalizado, hacé clic en el botón de WhatsApp a continuación para agendar tus turnos directamente.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a 
                  href="https://wa.me/543484307219?text=Hola%20Lu!%20Acabo%20de%20realizar%20una%20compra%20en%20la%20web" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <WhatsappLogo className="h-5 w-5" weight="fill" />
                  Coordinar por WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/catalogo">
                  Volver al Catálogo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Navigation */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="group -ml-4">
            <Link href="/catalogo" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary">
              <CaretLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" weight="bold" />
              Volver al catálogo
            </Link>
          </Button>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
          Finalizar compra
        </h1>

        {items.length === 0 ? (
          <div className="bg-card rounded-2xl shadow-soft p-12 text-center max-w-xl mx-auto border">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" weight="duotone" />
            </div>
            <h2 className="font-medium text-lg mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Para finalizar una compra, primero debes agregar algunos programas o recetarios al carrito.
            </p>
            <Button asChild>
              <Link href="/catalogo">Ver productos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card rounded-2xl shadow-soft p-6 md:p-8 border space-y-6">
              <h2 className="font-serif text-xl font-semibold flex items-center gap-2 border-b pb-4">
                <Envelope className="w-5 h-5 text-primary" weight="duotone" />
                Datos de contacto
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Juan Pérez"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@email.com"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+54 11 1234 5678"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI / CUIL (Facturación)</Label>
                  <Input
                    id="dni"
                    name="dni"
                    placeholder="12.345.678"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="pt-4">
                <h2 className="font-serif text-xl font-semibold flex items-center gap-2 border-b pb-4 mb-4">
                  <CreditCard className="w-5 h-5 text-primary" weight="duotone" />
                  Método de pago
                </h2>
                
                <div className="border border-primary bg-primary/5 rounded-xl p-4 flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full border-4 border-primary bg-background mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm sm:text-base flex flex-wrap items-center gap-2">
                      Mercado Pago
                      <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                        Recomendado
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pagar de forma segura con tarjetas de crédito, débito, saldo de cuenta de Mercado Pago o efectivo en puntos de cobro (Pago Fácil/Rapipago).
                    </p>
                    
                    {/* Mock MP Cards display */}
                    <div className="flex gap-2 mt-3 items-center opacity-70">
                      <div className="w-8 h-5 bg-background border rounded flex items-center justify-center font-bold text-[8px] text-[#00aae4]">VISA</div>
                      <div className="w-8 h-5 bg-background border rounded flex items-center justify-center font-bold text-[8px] text-[#f26c21]">MC</div>
                      <div className="w-8 h-5 bg-background border rounded flex items-center justify-center font-bold text-[8px] text-[#3777bc]">AMEX</div>
                      <div className="w-8 h-5 bg-background border rounded flex items-center justify-center font-bold text-[8px] text-[#009ee3]">MP</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <Lock className="w-4 h-4 shrink-0 text-muted-foreground" weight="bold" />
                <span>Tus datos de pago están completamente protegidos mediante la pasarela segura de Mercado Pago.</span>
              </div>

              {/* Action */}
              <Button type="submit" size="lg" className="w-full bg-[#009ee3] hover:bg-[#008ad0] text-white shadow-soft font-medium flex items-center justify-center gap-2" disabled={isLoading}>
                {isLoading ? (
                  <span>Conectando con Mercado Pago...</span>
                ) : (
                  <>
                    <span>Pagar con Mercado Pago</span>
                    <ArrowRight className="h-4 w-4" weight="bold" />
                  </>
                )}
              </Button>
            </form>

            {/* Summary */}
            <div className="lg:col-span-2 bg-muted/20 rounded-2xl p-6 border sticky top-24">
              <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" weight="duotone" />
                Resumen de compra ({totalItems})
              </h2>

              <div className="divide-y divide-border max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-start">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0 border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs sm:text-sm line-clamp-2 leading-tight">{item.name}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.category}</p>
                      <p className="text-xs font-semibold mt-1">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Productos ({totalItems})</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Costo de envío / descarga</span>
                  <span className="font-medium text-emerald-600">Gratis</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-foreground">Total</span>
                  <span className="font-bold text-xl text-primary">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
