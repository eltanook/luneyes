'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  CheckCircle,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
  Heart
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

const features = [
  'Más de 6 años de experiencia',
  'Programas personalizados a tu medida',
  'Enfoque integral: cuerpo y mente',
]

const socialLinks = [
  { href: 'https://www.instagram.com/lu.neyez', icon: InstagramLogo, label: 'Instagram' },
  { href: 'https://www.tiktok.com/@lu.neyez', icon: TiktokLogo, label: 'TikTok' },
  { href: 'https://wa.me/543484307219', icon: WhatsappLogo, label: 'WhatsApp' },
]

export function AboutPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image with social overlay on hover */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-lg group">
              <Image
                src="/luneyes.jpeg"
                alt="Lu Neyez - Wellness Coach"
                fill
                className="object-cover object-[center_10%]"
              />
              {/* Social overlay on hover */}
              <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-primary hover:scale-110 transition-all duration-200"
                      aria-label={link.label}
                    >
                      <Icon className="h-6 w-6" weight="fill" />
                    </a>
                  )
                })}
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Sobre Mí
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance flex items-center flex-wrap gap-2">
              Bienvenida, Soy Lu <Heart className="text-primary h-8 w-8 md:h-10 md:w-10" weight="fill" />
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-pretty">
              <p>
                Hace más de 6 años acompaño a mujeres en su proceso de cambio físico y de hábitos.
                Pero antes de eso, también estuve del otro lado: intentando, empezando, dejando… sin lograr sostenerlo.
              </p>
              <p>
                Con el tiempo entendí que el problema no es la falta de ganas, sino no tener una guía clara y un proceso que se adapte a tu vida.
                Por eso decidí formarme y sigo haciéndolo año tras año, para poder darles a mis alumnas herramientas reales, actuales y efectivas.
              </p>
              <p>
                Hoy trabajo con asesorías 100% personalizadas y seguimiento semanal, donde cada plan está pensado para vos.
                No creo en rutinas genéricas ni en soluciones rápidas.
              </p>
              <p>
                Creo en la constancia, en la disciplina y en entrenar para sentirte fuerte, no solo para verte bien.<br/>
                <strong className="text-foreground font-medium">Mi objetivo es que dejes de empezar de cero y aprendas a sostenerlo.</strong>
              </p>
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link href="/sobre-mi">
                  Leer más sobre mí
                  <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
