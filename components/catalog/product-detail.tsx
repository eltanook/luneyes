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
  WhatsappLogo
} from '@phosphor-icons/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/catalog/product-card'
import { useCart } from '@/lib/store/cart-store'
import { getProductBySlug, products, type Product } from '@/lib/data/products'
import { notFound } from 'next/navigation'

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

  // Render CTA based on product type
  const renderCTA = () => {
    switch (product.productType) {
      case 'service':
        // Services - contact via WhatsApp
        return (
          <Button size="lg" className="w-full" onClick={handleWhatsAppContact}>
            <WhatsappLogo className="h-5 w-5 mr-2" weight="fill" />
            Consultar disponibilidad
          </Button>
        )
      case 'digital':
        // Digital products - add to cart (quantity 1)
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
        // Physical products - quantity selector + add to cart
        return (
          <div className="space-y-4">
            {/* Quantity */}
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

            {/* Add to Cart */}
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
              {product.originalPrice && (
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

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-bold text-3xl">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-primary" weight="duotone" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Dynamic CTA */}
            {renderCTA()}

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
