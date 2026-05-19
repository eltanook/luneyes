import { Metadata } from 'next'
import { Suspense } from 'react'
import { CatalogGrid } from '@/components/catalog/catalog-grid'

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Explorá nuestros programas de entrenamiento, guías de nutrición y recetarios saludables.',
}

export default function CatalogoPage() {
  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Catálogo
          </h1>
          <p className="text-muted-foreground">
            Encontrá el programa perfecto para vos. Guías de alimentación, 
            planes de entrenamiento y asesorías personalizadas.
          </p>
        </div>

        {/* Catalog */}
        <Suspense fallback={
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm animate-pulse">Cargando catálogo de productos...</p>
          </div>
        }>
          <CatalogGrid />
        </Suspense>
      </div>
    </div>
  )
}
