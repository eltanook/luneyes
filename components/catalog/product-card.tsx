'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Eye } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/store/cart-store'
import type { Product } from '@/lib/data/products'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
  imageAspectRatio?: string
}

export function ProductCard({ product, index = 0, imageAspectRatio = "aspect-square" }: ProductCardProps) {
  const { addItem } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/catalogo/${product.slug}`} className="block">
        <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300">
          {/* Image Container */}
          <div className={cn("relative overflow-hidden bg-muted", imageAspectRatio)}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Discount Badge */}
            {product.originalPrice && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </div>
            )}

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <Button
                size="sm"
                className="rounded-full shadow-lg"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-1" weight="duotone" />
                Agregar
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full shadow-lg"
              >
                <Eye className="h-4 w-4 mr-1" weight="duotone" />
                Ver
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
            <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
