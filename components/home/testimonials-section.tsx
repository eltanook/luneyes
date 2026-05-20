'use client'

import { Quotes, Star } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Paloma Illescas',
    text: 'Estoy tan contenta de tener como hábito entrenar y de considerar que somos un equipo! Fué y es super positivo entrenar con vos Lu! Empecé a notar cambios en el espejo y a mi me re cuesta eso, incluso mi familia me lo dice siempre! Internos siento más comodidad conmigo y mejor autoestima!',
    image: null,
  },
  {
    id: 2,
    name: 'Flavia Gutierrez',
    text: 'Fue increible el cambio que tuve, en todos los sentidos. Desde lo que como, cómo me organizo, lo bien que me hace ir al gym, estar deshinchada, mi cutis cambió para bien, mejore mis hábitos un montón. Ni yo puedo creer lo que podía lograr, y es gracias a vos!',
    image: null,
  },
  {
    id: 3,
    name: 'Loli Peirano',
    text: 'Mi cable a tierra es ir a entrenar, siento que gano los días haciendo algo por mi. Haberte encontrado y poder seguir un plan personalizado me motivó un montón a no bajar los brazos y a entrenar BIEN. Aprendí a tener una relación consciente con mi alimentación comiendo saludable y completo por que me hace sentir liviana.',
    image: null,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: 'easeOut',
    },
  }),
}

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
            Lo que dicen mis alumnas
          </h2>
          <p className="text-muted-foreground">
            Historias reales de mujeres que transformaron su vida
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="bg-card rounded-2xl shadow-soft p-6 md:p-8 flex flex-col border border-border hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 text-primary" weight="fill" />
                ))}
              </div>

              <Quotes className="h-10 w-10 text-primary/20 mb-4 shrink-0" weight="fill" />
              <blockquote className="text-sm md:text-base text-foreground leading-relaxed mb-6 flex-grow text-pretty">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="mt-auto flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-serif font-bold text-primary text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {testimonial.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
