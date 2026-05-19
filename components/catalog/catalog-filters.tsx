'use client'

import { useState } from 'react'
import { Funnel, CaretDown } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { getAllCategoriesWithCount } from '@/lib/data/products'
import { cn } from '@/lib/utils'

interface CatalogFiltersProps {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function CatalogFilters({
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortChange,
}: CatalogFiltersProps) {
  const [isOpen, setIsOpen] = useState(true)
  const categoriesWithCount = getAllCategoriesWithCount()
  const totalProducts = categoriesWithCount.reduce((acc, cat) => acc + cat.productCount, 0)

  const handleCategoryToggle = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      // Remove category
      onCategoryChange(selectedCategories.filter((s) => s !== slug))
    } else {
      // Add category
      onCategoryChange([...selectedCategories, slug])
    }
  }

  const handleSelectAll = () => {
    onCategoryChange([])
  }

  return (
    <aside className="bg-card rounded-xl shadow-soft p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif font-semibold text-lg flex items-center gap-2">
          <Funnel className="h-5 w-5" weight="duotone" />
          Filtros
        </h2>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <Label className="text-sm text-muted-foreground mb-2 block">Ordenar por</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Destacados</SelectItem>
            <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
            <SelectItem value="name">Nombre A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full py-2 text-sm font-medium">
            Categorías
            <CaretDown
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-180'
              )}
              weight="bold"
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pt-2">
          {/* All Products option */}
          <button
            onClick={handleSelectAll}
            className={cn(
              'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between',
              selectedCategories.length === 0
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <span>Todos los productos</span>
            <span className="text-xs opacity-60">({totalProducts})</span>
          </button>
          
          {/* Category checkboxes */}
          {categoriesWithCount.map((category) => (
            <div
              key={category.slug}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer',
                selectedCategories.includes(category.slug)
                  ? 'bg-primary/10'
                  : 'hover:bg-muted'
              )}
              onClick={() => handleCategoryToggle(category.slug)}
            >
              <Checkbox
                id={`cat-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryToggle(category.slug)}
                className="pointer-events-none"
              />
              <label 
                htmlFor={`cat-${category.slug}`}
                className={cn(
                  'flex-1 text-sm cursor-pointer flex items-center justify-between',
                  selectedCategories.includes(category.slug) && 'text-primary font-medium'
                )}
              >
                <span>{category.name}</span>
                <span className="text-xs opacity-60">({category.productCount})</span>
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      {selectedCategories.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-4"
          onClick={handleSelectAll}
        >
          Limpiar filtros ({selectedCategories.length})
        </Button>
      )}
    </aside>
  )
}
