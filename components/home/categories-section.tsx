'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Barbell, Leaf, Users } from '@phosphor-icons/react'

const categories = [
  {
    title: 'Programas Personalizados',
    description: 'Asesorías individuales adaptadas a tus objetivos específicos con seguimiento continuo.',
    image: '/images/coaching-category.jpg',
    categorySlug: 'programas-personalizados',
    icon: Users,
  },
  {
    title: 'Nutri-Guía',
    description: 'Guías de alimentación completas con recetarios saludables incluidos.',
    image: '/images/nutrition-category.jpg',
    categorySlug: 'nutri-guia',
    icon: Leaf,
  },
  {
    title: 'Planes Principiantes',
    description: 'Programas de 6 semanas diseñados para comenzar tu transformación.',
    image: '/images/training-category.jpg',
    categorySlug: 'planes-principiantes',
    icon: Barbell,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nuestros Programas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
            Encontrá el programa ideal para vos
          </h2>
          <p className="text-muted-foreground">
            Un enfoque integral donde entrenamiento y nutrición trabajan en conjunto 
            para ayudarte a lograr resultados reales y sostenibles.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div key={category.title} variants={itemVariants}>
                <Link
                  href={`/catalogo?categoria=${category.categorySlug}`}
                  className="group block h-full"
                >
                  <article className="relative h-full bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" weight="duotone" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-serif font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Ver más
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
