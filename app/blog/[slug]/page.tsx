import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/data/blog'
import { BlogPostContent } from '@/components/blog/blog-post-content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return {
      title: 'Artículo no encontrado',
      description: 'El artículo solicitado no existe o ha sido movido.',
    }
  }
  return {
    title: `${post.title} | Blog Lu Neyez`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
