import { Metadata } from 'next'
import { BlogContent } from '@/components/blog/blog-content'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, recetas y consejos de bienestar, nutrición y entrenamiento para tu vida saludable.',
}

export default function BlogPage() {
  return <BlogContent />
}
