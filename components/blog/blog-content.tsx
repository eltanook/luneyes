'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from '@phosphor-icons/react'
import { blogPosts, getFeaturedPosts, blogCategories } from '@/lib/data/blog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const featuredPosts = getFeaturedPosts()
  
  const filteredFeaturedPosts = featuredPosts.filter((p) => {
    if (selectedCategory === 'all') return true
    return p.category.toLowerCase() === selectedCategory.toLowerCase()
  })
  
  const filteredRegularPosts = blogPosts.filter((p) => {
    if (p.featured) return false
    
    const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase()
    
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(Boolean)
    const matchesSearch = searchTerms.length === 0 || searchTerms.every(term => 
      p.title.toLowerCase().includes(term) || 
      p.excerpt.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    )

    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredRegularPosts.length / postsPerPage)
  const currentPosts = filteredRegularPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  // Reset page when filters change
  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Tips, recetas y consejos para tu bienestar integral
          </p>
        </motion.div>

        {/* Featured Posts */}
        {filteredFeaturedPosts.length > 0 && (
          <section className="mb-16">
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredFeaturedPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-soft mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-3">
                          {post.category}
                        </span>
                        <h2 className="font-serif font-bold text-xl md:text-2xl text-background mb-2 group-hover:text-primary transition-colors text-balance">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-4 text-xs text-background/80">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" weight="duotone" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" weight="duotone" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4">
            <h2 className="font-serif text-xl font-semibold">
              {selectedCategory === 'all' ? 'Últimos artículos' : `Artículos sobre ${selectedCategory}`}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <MagnifyingGlass className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-9"
                />
              </div>
              <div className="w-full sm:w-48">
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {blogCategories.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {currentPosts.length > 0 ? (
            <>
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedCategory}-${searchQuery}-${currentPage}`}
              >
                {currentPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={itemVariants}
                    className="group h-full"
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow duration-300 h-full flex flex-col border border-border">
                        <div className="relative aspect-[2/1] overflow-hidden shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-sm text-xs font-medium">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" weight="duotone" />
                              {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" weight="duotone" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-semibold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto pt-2">
                            <span className="inline-flex items-center text-sm font-medium text-primary">
                              Leer más
                              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm font-medium">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">
                No hay artículos publicados en esta categoría todavía.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
