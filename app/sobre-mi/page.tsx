import { Metadata } from 'next'
import { AboutContent } from '@/components/about/about-content'

export const metadata: Metadata = {
  title: 'Sobre Mí',
  description: 'Conocé a Lu Neyez y al equipo de profesionales que te acompañarán en tu transformación hacia una vida más saludable.',
}

export default function SobreMiPage() {
  return <AboutContent />
}
