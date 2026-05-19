'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  Minus, 
  Plus, 
  CaretLeft,
  CheckCircle,
  DownloadSimple,
  WhatsappLogo,
  ArrowDown,
  Check,
  Sparkle
} from '@phosphor-icons/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/catalog/product-card'
import { useCart } from '@/lib/store/cart-store'
import { getProductBySlug, products, type Product } from '@/lib/data/products'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ProductDetailProps {
  slug: string
}

export function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  const isMatias = product.slug === 'asesoria-matias-fernandez'
  const isLu = product.slug === 'asesoria-lu-neyez'
  const isCustomService = isMatias || isLu

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        productType: product.productType,
      })
    }
    setQuantity(1)
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Hola! Me interesa el producto: ${product.name}`)
    window.open(`https://wa.me/543484307219?text=${message}`, '_blank')
  }

  // Features based on product type
  const getFeatures = (product: Product) => {
    switch (product.productType) {
      case 'digital':
        return [
          'Acceso inmediato después de la compra',
          'Contenido descargable en PDF',
          'Soporte por email incluido',
          'Actualizaciones gratuitas',
        ]
      case 'service':
        return [
          'Seguimiento personalizado continuo',
          'Plan adaptado a tus objetivos',
          'Comunicación directa con el coach',
          'Ajustes según tu progreso',
        ]
      default:
        return [
          'Envío a todo el país',
          'Soporte incluido',
          'Garantía de satisfacción',
        ]
    }
  }

  const features = getFeatures(product)

  // Custom static feature data
  const matiasFeatures = [
    {
      title: "Formulario Inicial",
      description: "Formulario inicial para conocernos y que nos detalles tus datos, objetivos, antecedentes en actividad física, patologías, y todo lo necesario para armar tu plan."
    },
    {
      title: "Rutina PERSONALIZADA",
      description: "Para Hogar o Gimnasio en base a tu nivel, objetivos y días que quieras entrenar. Si entrenás en hogar se diseña según los elementos que tengas (si empezás de cero, te asesoramos para comprar)."
    },
    {
      title: "Videos Demostrativos",
      description: "Videos de alta calidad demostrando la técnica correcta de TODOS los ejercicios de tu rutina."
    },
    {
      title: "Guías y Tips en PDF",
      description: "Documentación con consejos técnicos, aclaraciones e indicaciones precisas para que explotes tu rutina y realmente APRENDAS."
    },
    {
      title: "Registro de Cargas",
      description: "Editor/planilla interactiva para anotar los pesos de tus ejercicios y poder llevar un control exacto del progreso semana a semana."
    },
    {
      title: "Atención por WhatsApp",
      description: "Seguimiento directo y comunicación diaria conmigo para resolver dudas, revisar técnicas con videos y realizar ajustes en la rutina."
    }
  ]

  const matiasPlans = [
    {
      name: "Pago mensual (Plan Full)",
      originalPrice: "$ 45.000 ARS",
      price: "$ 39.000 ARS",
      discount: "13% OFF",
      cycle: "update cada mes",
      paymentInfo: "Mercadopago, Transferencia bancaria y Transferencia bancaria",
      whatsappText: "Hola! Me interesa suscribirme a las Asesorías Personalizadas - By Matías Fernández (Plan Full - Pago mensual)."
    },
    {
      name: "Pago cada 3 meses (Plan Full)",
      originalPrice: "$ 117.000 ARS",
      price: "$ 90.000 ARS",
      discount: "23% OFF",
      cycle: "update cada tres meses",
      paymentInfo: "Mercadopago, Transferencia bancaria y Transferencia bancaria",
      whatsappText: "Hola! Me interesa suscribirme a las Asesorías Personalizadas - By Matías Fernández (Plan Full - Pago cada 3 meses)."
    }
  ]

  const luFeatures = [
    {
      title: "Formulario inicial completo",
      description: "Análisis completo de tus hábitos, objetivos, lesiones, experiencia previa y tiempos disponibles para armar la base del proceso."
    },
    {
      title: "Rutina 100% personalizada",
      description: "Plan de entrenamiento exclusivo para gimnasio o casa, diseñado en base a tus metas y los elementos que tengas a disposición."
    },
    {
      title: "Entrenamiento guiado",
      description: "Videos de todos los ejercicios, PDF con tips/aclaraciones técnicas y editor interactivo para registrar pesos y evaluar progresos."
    },
    {
      title: "Seguimiento y acompañamiento",
      description: "Contacto continuo por WhatsApp, respuestas a dudas diarias, revisión de técnica a través de videos enviados y ajustes continuos."
    },
    {
      title: "Ajuste mensual",
      description: "Evaluación cada 4 semanas mediante formulario de control y actualización personalizada de la rutina para la siguiente etapa."
    },
    {
      title: "Alimentación (Bonus Exclusivo)",
      description: "🎁 Guía alimenticia de regalo el primer mes (aumento de masa o descenso de tejido) con orientación de macros y calorías + 📘 Recetarios PDF temáticos (desayunos, almuerzos, smoothies, gluten free, veganas)."
    },
    {
      title: "Yoga & Pilates (Bonus Exclusivo)",
      description: "🧘 Clases grabadas de YOGALATES (en colaboración con Aldana – Mov Consciente) de 10 a 30 minutos para complementar movilidad y conectar con tu cuerpo."
    }
  ]

  const luPlans = [
    {
      name: "Pago mensual (Débito)",
      originalPrice: "$ 44.900 ARS",
      price: "$ 39.900 ARS",
      discount: "11% OFF",
      cycle: "update cada mes",
      paymentInfo: "Débito automático con tarjetas de crédito y débito (Visa, Mastercard, Amex)",
      whatsappText: "Hola Lu! Me interesa suscribirme a las Asesorías Personalizadas (Método Lu Neyez 1:1 - Pago mensual Débito Automático)."
    },
    {
      name: "Pago mensual (Manual)",
      originalPrice: null,
      price: "$ 44.900 ARS",
      discount: null,
      cycle: "update cada mes",
      paymentInfo: "Mercadopago, Transferencia bancaria y Transferencia bancaria",
      whatsappText: "Hola Lu! Me interesa suscribirme a las Asesorías Personalizadas (Método Lu Neyez 1:1 - Pago mensual Pago manual)."
    },
    {
      name: "Pago cada 3 meses",
      originalPrice: null,
      price: "$ 109.900 ARS",
      discount: null,
      cycle: "update cada tres meses",
      paymentInfo: "Mercadopago, Transferencia bancaria y Transferencia bancaria",
      whatsappText: "Hola Lu! Me interesa suscribirme a las Asesorías Personalizadas (Método Lu Neyez 1:1 - Pago cada 3 meses)."
    },
    {
      name: "Pago cada 6 meses",
      originalPrice: null,
      price: "$ 199.900 ARS",
      discount: null,
      cycle: "update cada seis meses",
      paymentInfo: "Mercadopago, Transferencia bancaria y Transferencia bancaria",
      whatsappText: "Hola Lu! Me interesa suscribirme a las Asesorías Personalizadas (Método Lu Neyez 1:1 - Pago cada 6 meses)."
    }
  ]

  // Render CTA based on product type
  const renderCTA = () => {
    switch (product.productType) {
      case 'service':
        return (
          <Button size="lg" className="w-full" onClick={handleWhatsAppContact}>
            <WhatsappLogo className="h-5 w-5 mr-2" weight="fill" />
            Consultar disponibilidad
          </Button>
        )
      case 'digital':
        return (
          <div className="space-y-3">
            <Button size="lg" className="w-full" onClick={() => {
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                category: product.category,
                productType: product.productType,
              })
            }}>
              <DownloadSimple className="h-5 w-5 mr-2" weight="duotone" />
              Comprar y descargar
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Recibirás el acceso inmediatamente después del pago
            </p>
          </div>
        )
      default:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Cantidad:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" weight="bold" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" weight="bold" />
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              <ShoppingBag className="h-5 w-5 mr-2" weight="duotone" />
              Agregar al carrito
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/catalogo" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <CaretLeft className="h-4 w-4 mr-1" weight="bold" />
            Volver al catálogo
          </Link>
        </nav>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-soft group cursor-zoom-in">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              {product.originalPrice && !isCustomService && (
                <Badge className="absolute top-4 left-4">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {/* Product type badge */}
              <Badge variant="secondary" className="absolute top-4 right-4">
                {product.productType === 'digital' && 'Digital'}
                {product.productType === 'service' && 'Servicio'}
                {product.productType === 'physical' && 'Físico'}
              </Badge>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div>
              <Link 
                href={`/catalogo?categoria=${product.categorySlug}`}
                className="text-sm text-primary hover:underline"
              >
                {product.category}
              </Link>
              <h1 className="font-serif text-2xl md:text-3xl font-bold mt-2 mb-4 text-balance">
                {product.name}
              </h1>

              {/* Price - hide for custom services with complex billing options */}
              {!isCustomService && (
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-bold text-3xl">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features - only show for regular products */}
              {!isCustomService && (
                <div className="space-y-3 mb-8">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-5 w-5 text-primary" weight="duotone" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA action */}
            {isCustomService ? (
              <div className="mt-4">
                <Button size="lg" className="w-full gap-2" asChild>
                  <a href="#planes">
                    Ver planes y precios
                    <ArrowDown className="h-4 w-4 animate-bounce" weight="bold" />
                  </a>
                </Button>
              </div>
            ) : (
              <>
                <Separator className="my-6" />
                {renderCTA()}
              </>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Custom Service Detailed Features & Info */}
        {isCustomService && (
          <div className="mt-12 space-y-16">
            <Separator />
            
            {/* Features list */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  Programa completo
                </span>
                <h2 className="font-serif text-3xl font-bold">¿Qué incluye la asesoría?</h2>
              </div>
              
              {isMatias && (
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {matiasFeatures.map((feat, i) => (
                    <Card key={i} className="border-border/60 shadow-soft">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="h-5 w-5 text-primary" weight="bold" />
                        </div>
                        <CardTitle className="text-base font-semibold">{feat.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {isLu && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {luFeatures.map((feat, i) => (
                    <Card key={i} className="border-border/60 shadow-soft flex flex-col">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2 shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="h-5 w-5 text-primary" weight="bold" />
                        </div>
                        <CardTitle className="text-base font-semibold">{feat.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <Separator id="planes" className="scroll-mt-24" />

            {/* Plans pricing table */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  Planes y Suscripción
                </span>
                <h2 className="font-serif text-3xl font-bold">Elegí tu opción de pago</h2>
                <p className="text-muted-foreground mt-2">Planes con cupos limitados para asegurar seguimiento personalizado real.</p>
              </div>

              <div className={cn(
                "grid gap-8 max-w-6xl mx-auto justify-center",
                isMatias ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-2 lg:grid-cols-4"
              )}>
                {(isMatias ? matiasPlans : luPlans).map((plan, i) => (
                  <Card key={i} className={cn(
                    "border border-border/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative w-full",
                    plan.discount ? "border-primary/40 ring-1 ring-primary/20" : ""
                  )}>
                    {plan.discount && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                        {plan.discount}
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-base font-bold font-serif leading-tight">{plan.name}</CardTitle>
                      <CardDescription className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{plan.cycle}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Prices */}
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-2xl font-extrabold">{plan.price}</span>
                          {plan.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium">ARS (Pesos Argentinos)</p>
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">Método de Pago:</span>
                        <p className="text-xs text-muted-foreground leading-relaxed">{plan.paymentInfo}</p>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-2 pb-6">
                      <Button 
                        className="w-full shadow-md" 
                        variant={plan.discount ? "default" : "outline"}
                        onClick={() => {
                          const message = encodeURIComponent(plan.whatsappText)
                          window.open(`https://wa.me/543484307219?text=${message}`, '_blank')
                        }}
                      >
                        <WhatsappLogo className="h-4 w-4 mr-2" weight="fill" />
                        Suscribirme
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {isLu && (
                <div className="max-w-3xl mx-auto mt-12 p-6 rounded-2xl bg-muted/30 border text-center space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    ✨ <strong>Nota sobre el Bonus de Alimentación:</strong> Las guías y recetarios no son personalizados, sino una base práctica para organizar tus comidas y aprender a acompañar tu proceso de entrenamiento desde el primer mes.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    🧘 <strong>Clases de Yogalates:</strong> Acceso a clases grabadas de 10 a 30 minutos en colaboración con <em>Aldana – Mov Consciente</em> para conectar mente y cuerpo.
                  </p>
                </div>
              )}
            </div>
            
            <Separator />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold mb-6">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
