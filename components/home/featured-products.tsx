'use client'

import { motion } from 'framer-motion'
import { getFeaturedProducts } from '@/lib/data/products'
import { ProductCard } from '@/components/catalog/product-card'

export function FeaturedProductsSection() {
  const products = getFeaturedProducts().slice(0, 3)
  
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Destacados
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Productos más elegidos
          </h2>
          <p className="text-muted-foreground">
            Empezá tu cambio hoy mismo con nuestros programas más populares.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
