'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Barbell, AppleLogo, Heartbeat, Heart } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

const dynamicPhrases = [
  "Entrena con propósito",
  "Alimentá tu cuerpo",
  "Descubrí tu potencial",
  "Lográ tu balance"
]

const heroServices = [
  { icon: Barbell, title: "Entrenamiento Personalizado", description: "Rutinas adaptadas a vos" },
  { icon: AppleLogo, title: "Planes de Nutrición", description: "Guías y recetarios saludables" },
  { icon: Heartbeat, title: "Bienestar Integral", description: "Performance Experience" },
  { icon: Heart, title: "Asesorías 100%", description: "Seguimiento y apoyo semanal" }
]

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax - bg-fixed */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Wellness Coach
              </span>
            </motion.div>

            <motion.h1
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-balance min-h-[120px] sm:min-h-[144px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Tu cambio empieza hoy:{' '}
              <br className="hidden sm:block" />
              <div className="relative inline-block text-primary w-full h-[1.2em] overflow-hidden align-bottom">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute left-0"
                  >
                    {dynamicPhrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Programas de entrenamiento y nutrición adaptados a tu estilo de vida. 
              Un enfoque integral donde entrenamiento y nutrición trabajan en conjunto 
              para ayudarte a lograr resultados reales y sostenibles.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="min-w-[200px]">
                <Link href="/catalogo">
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                <Link href="/sobre-mi">Conocé más</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Animated Services Stack */}
          <motion.div 
            className="hidden lg:flex justify-center items-center relative h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md h-full perspective-1000 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {[0, 1, 2].map((offset) => {
                  const index = (phraseIndex + offset) % heroServices.length
                  const service = heroServices[index]
                  const Icon = service.icon
                  
                  const isFront = offset === 0
                  const isMiddle = offset === 1
                  
                  return (
                    <motion.div
                      key={`${index}-${offset}`}
                      layoutId={`card-${index}`}
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{
                        opacity: isFront ? 1 : isMiddle ? 0.9 : 0.8,
                        y: isFront ? 0 : isMiddle ? -15 : -30,
                        scale: isFront ? 1 : isMiddle ? 0.95 : 0.9,
                        zIndex: 30 - offset * 10,
                        rotateX: isFront ? 0 : isMiddle ? 5 : 10,
                      }}
                      exit={{ opacity: 0, y: -50, scale: 0.8 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className={`absolute w-64 h-64 ${isFront ? 'bg-card border-2 border-primary/20 shadow-xl' : isMiddle ? 'bg-card/90 border border-border shadow-soft-lg backdrop-blur-md' : 'bg-card/80 border border-border shadow-soft backdrop-blur-md'} rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center origin-bottom`}
                    >
                      <Icon className={`h-16 w-16 ${isFront ? 'text-primary' : isMiddle ? 'text-primary/70' : 'text-primary/50'}`} weight={isFront ? "duotone" : "regular"} />
                      <h3 className={`font-serif font-bold ${isFront ? 'text-xl text-foreground' : 'text-lg text-muted-foreground'}`}>
                        {service.title}
                      </h3>
                      {isFront && (
                        <>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <div className="w-12 h-1 bg-primary rounded-full mt-2" />
                        </>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
