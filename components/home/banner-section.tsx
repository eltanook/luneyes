'use client'

import { motion } from 'framer-motion'

export function BannerSection() {
  return (
    <section 
      className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: 'url(/images/banner-bg.jpg)',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-background leading-relaxed text-balance">
            &ldquo;El cambio no sucede de la noche a la mañana, pero cada pequeño paso 
            te acerca a la mejor versión de vos misma.&rdquo;
          </blockquote>
          <p className="mt-6 text-background/80 font-medium">
            &mdash; Lu Neyez
          </p>
        </motion.div>
      </div>
    </section>
  )
}
