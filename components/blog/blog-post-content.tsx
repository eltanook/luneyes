'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  CaretLeft, 
  WhatsappLogo, 
  InstagramLogo,
  ShareNetwork,
  ArrowRight
} from '@phosphor-icons/react'
import { type BlogPost, blogPosts } from '@/lib/data/blog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  // Get related posts (exclude current, same category or random if none)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  const fallbackRelatedPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      toast.success('¡Enlace copiado al portapapeles!')
    }
  }

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(`Mirá este artículo de Lu Neyez: "${post.title}" en ${window.location.href}`)
      window.open(`https://wa.me/?text=${text}`, '_blank')
    }
  }

  // Parse markdown-like content into sections
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      const trimmed = block.trim()
      if (!trimmed) return null

      // Headers
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-serif text-2xl md:text-3xl font-semibold mt-8 mb-4 text-foreground border-l-4 border-primary pl-4">
            {trimmed.replace('## ', '')}
          </h2>
        )
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-serif text-xl md:text-2xl font-semibold mt-6 mb-3 text-foreground">
            {trimmed.replace('### ', '')}
          </h3>
        )
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-accent bg-accent/10 px-6 py-4 my-6 rounded-r-xl italic text-muted-foreground leading-relaxed text-balance">
            {trimmed.replace('> ', '')}
          </blockquote>
        )
      }

      // Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map((item) => item.replace(/^[-*]\s+/, ''))
        return (
          <ul key={idx} className="list-disc list-inside my-4 pl-4 space-y-2 text-muted-foreground leading-relaxed">
            {items.map((item, itemIdx) => {
              // Check bold text in list items
              if (item.includes('**')) {
                const parts = item.split('**')
                return (
                  <li key={itemIdx}>
                    {parts.map((part, partIdx) => partIdx % 2 === 1 ? <strong key={partIdx} className="text-foreground">{part}</strong> : part)}
                  </li>
                )
              }
              return <li key={itemIdx}>{item}</li>
            })}
          </ul>
        )
      }

      // Bold titles/paragraphs in text block (e.g. **Legumbres:**)
      if (trimmed.startsWith('**') && trimmed.includes(':**')) {
        const parts = trimmed.split('**')
        return (
          <p key={idx} className="my-4 text-muted-foreground leading-relaxed">
            {parts.map((part, partIdx) => partIdx % 2 === 1 ? <strong key={partIdx} className="text-foreground">{part}</strong> : part)}
          </p>
        )
      }

      // Standard Paragraph
      return (
        <p key={idx} className="my-4 text-muted-foreground leading-relaxed text-pretty">
          {trimmed.includes('**') ? (
            trimmed.split('**').map((part, partIdx) => 
              partIdx % 2 === 1 ? <strong key={partIdx} className="text-foreground">{part}</strong> : part
            )
          ) : (
            trimmed
          )}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen py-8 md:py-16">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back navigation */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="group -ml-4">
            <Link href="/blog" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary">
              <CaretLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" weight="bold" />
              Volver al blog
            </Link>
          </Button>
        </div>

        {/* Category & Title */}
        <div className="text-center md:text-left mb-8">
          <Badge className="mb-4" size="md">
            {post.category}
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-balance mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground border-b border-t py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {post.author.charAt(0)}
              </div>
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" weight="duotone" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" weight="duotone" />
              <span>{post.readTime} de lectura</span>
            </div>
          </div>
        </div>

        {/* Main image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-soft-lg mb-8 md:mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content & Sharing Layout */}
        <div className="grid lg:grid-cols-4 gap-8 md:gap-12">
          {/* Share Sidebar */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit border-b lg:border-b-0 pb-6 lg:pb-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center lg:text-left">
              Compartir
            </p>
            <div className="flex lg:flex-col items-center justify-center lg:items-start gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2" 
                onClick={handleShareWhatsApp}
              >
                <WhatsappLogo className="h-4 w-4 text-emerald-500" weight="fill" />
                <span>WhatsApp</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2"
                onClick={handleCopyLink}
              >
                <ShareNetwork className="h-4 w-4 text-primary" weight="duotone" />
                <span>Copiar enlace</span>
              </Button>
            </div>
          </div>

          {/* Article Text Content */}
          <div className="lg:col-span-3 text-lg prose prose-neutral max-w-none">
            {renderContent(post.content)}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t my-16" />

        {/* Related Posts */}
        {fallbackRelatedPosts.length > 0 && (
          <section className="mb-8">
            <h3 className="font-serif text-2xl font-bold mb-8 text-center md:text-left">
              Artículos relacionados
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fallbackRelatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="group">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-sm text-xs font-medium">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" weight="duotone" />
                            {formatDate(relatedPost.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" weight="duotone" />
                            {relatedPost.readTime}
                          </span>
                        </div>
                        <h4 className="font-semibold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <span className="inline-flex items-center text-sm font-medium text-primary">
                          Leer más
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
