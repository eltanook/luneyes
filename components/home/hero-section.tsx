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

          {/* Right Column: Glassmorphism Card */}
          <motion.div 
            className="hidden lg:flex justify-center items-center relative w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-[420px]">
              {/* Badge */}
              <div className="absolute -top-4 -right-4 z-20 bg-primary text-primary-foreground font-bold px-5 py-1.5 rounded-full shadow-lg text-sm">
                100% Confiable
              </div>

              {/* Main Container */}
              <div className="bg-card/40 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-[2rem] p-6 flex flex-col gap-6">
                
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/40 backdrop-blur-md border border-border/40 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                    <span className="font-serif font-bold text-4xl text-foreground mb-1 drop-shadow-sm">6+</span>
                    <span className="text-xs text-muted-foreground font-medium">Años de Experiencia</span>
                  </div>
                  <div className="bg-background/40 backdrop-blur-md border border-border/40 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                    <span className="font-serif font-bold text-4xl text-foreground mb-1 drop-shadow-sm">200+</span>
                    <span className="text-xs text-muted-foreground font-medium">Alumnas Felices</span>
                  </div>
                </div>

                {/* Services List */}
                <div className="flex flex-col gap-3">
                  {heroServices.map((service, index) => {
                    const isActive = (phraseIndex % heroServices.length) === index;
                    const Icon = service.icon;
                    return (
                      <div 
                        key={index}
                        className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all duration-500 ${
                          isActive 
                            ? 'bg-primary/10 border-primary/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                            : 'bg-background/20 border-border/30 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500 ${
                          isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'bg-muted/50 text-muted-foreground'
                        }`}>
                          <Icon className="h-6 w-6" weight={isActive ? "duotone" : "regular"} />
                        </div>
                        <span className={`font-semibold text-[15px] transition-colors duration-500 ${
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {service.title}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
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
