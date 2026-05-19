'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MagnifyingGlass, SquaresFour, GridNine, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProductCard } from './product-card'
import { CatalogFilters } from './catalog-filters'
import { products, getProductsByCategories } from '@/lib/data/products'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 9

interface CatalogGridProps {
  initialCategory?: string
}

export function CatalogGrid({ initialCategory }: CatalogGridProps) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('categoria')
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : initialCategory ? [initialCategory] : []
  )
  const [sortBy, setSortBy] = useState('featured')
  const [search, setSearch] = useState('')
  const [gridSize, setGridSize] = useState<'large' | 'small'>('large')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    let result = selectedCategories.length > 0
      ? getProductsByCategories(selectedCategories)
      : products

    // Apply search filter
    if (search) {
      const searchTerms = search.toLowerCase().split(/\s+/).filter(Boolean)
      result = result.filter((p) => {
        const searchableText = `${p.name} ${p.category} ${p.tags.join(' ')} ${p.description || ''}`.toLowerCase()
        return searchTerms.every(term => searchableText.includes(term))
      })
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [selectedCategories, sortBy, search])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  // Reset to page 1 when filters change
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <CatalogFilters
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Grid Toggle & Count */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} productos
            </span>
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded',
                  gridSize === 'large' && 'bg-muted'
                )}
                onClick={() => setGridSize('large')}
              >
                <SquaresFour className="h-4 w-4" weight="duotone" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded',
                  gridSize === 'small' && 'bg-muted'
                )}
                onClick={() => setGridSize('small')}
              >
                <GridNine className="h-4 w-4" weight="duotone" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products */}
        {paginatedProducts.length > 0 ? (
          <>
            <div
              className={cn(
                'grid gap-4',
                gridSize === 'large'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4'
              )}
            >
              {paginatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <CaretLeft className="h-4 w-4" weight="bold" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'ghost'}
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <CaretRight className="h-4 w-4" weight="bold" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <MagnifyingGlass className="h-8 w-8 text-muted-foreground" weight="duotone" />
            </div>
            <h3 className="font-medium text-lg mb-2">No se encontraron productos</h3>
            <p className="text-muted-foreground text-sm">
              Probá con otros filtros o términos de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
