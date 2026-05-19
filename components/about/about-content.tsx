'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  InstagramLogo, 
  TiktokLogo,
  WhatsappLogo,
  Heart, 
  Target, 
  Sparkle,
  GraduationCap,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { GoogleMapsSection } from '@/components/home/google-maps-section'

const team = [
  {
    name: 'Matías Fernandez',
    role: 'Profesor de Educación Física',
    image: '/images/matias-portrait.jpg',
    bio: 'Profesor de Educación Física y entrenador orientado al desarrollo de fuerza, rendimiento y entrenamiento funcional. Busca acompañar a cada persona de manera personalizada para potenciar su desempeño, mejorar su calidad de vida y generar hábitos sostenibles a largo plazo.',
    instagram: 'https://www.instagram.com/matias.fit',
  },
  {
    name: 'Sofía Minkevich',
    role: 'Licenciada en Nutrición (MN. 11592)',
    image: '/images/sofia-portrait.jpg',
    bio: 'Especializada en alimentación basada en plantas, salud digestiva y deporte. Su enfoque combina alimentación real, hábitos saludables y educación nutricional para ayudarte a mejorar tu bienestar de manera sostenible, disfrutando el proceso y aprendiendo a nutrirte desde un lugar más consciente.',
    instagram: 'https://www.instagram.com/sofia.nutricion',
  },
  {
    name: 'Lucia Neyez',
    role: 'Entrenadora Personal',
    image: '/images/lu-portrait.jpg',
    bio: 'Entrenadora enfocada en wellness, entrenamiento híbrido y rendimiento. Su objetivo es ayudarte a construir hábitos sostenibles, aprender a entrenar de manera inteligente y disfrutar el proceso, combinando salud, bienestar y performance en un acompañamiento cercano y personalizado.',
    instagram: 'https://www.instagram.com/lu.neyez',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Empatía',
    description: 'Entiendo que cada persona tiene su propio ritmo y proceso.',
  },
  {
    icon: Target,
    title: 'Compromiso',
    description: 'Me involucro en tu transformación como si fuera la mía.',
  },
  {
    icon: Sparkle,
    title: 'Sostenibilidad',
    description: 'Creamos hábitos que puedas mantener toda la vida.',
  },
  {
    icon: Heart,
    title: 'Acompañamiento',
    description: 'Nunca estás sola en el proceso de transformación.',
  },
  {
    icon: Target,
    title: 'Motivación',
    description: 'El empuje diario que necesitas para llegar a tu meta.',
  },
]

const features = [
  'Más de 6 años de experiencia',
  'Enfoque integral cuerpo y mente',
  'Programas adaptados a tu vida',
]

const socialLinks = [
  { href: 'https://www.instagram.com/lu.neyez', icon: InstagramLogo, label: 'Instagram' },
  { href: 'https://www.tiktok.com/@lu.neyez', icon: TiktokLogo, label: 'TikTok' },
  { href: 'https://wa.me/543484307219', icon: WhatsappLogo, label: 'WhatsApp' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function AboutContent() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Sobre Mí
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance flex items-center flex-wrap gap-2">
                Bienvenida, Soy Lu <Heart className="text-primary h-8 w-8 md:h-10 md:w-10" weight="fill" />
              </h1>
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

              {/* Features with checks */}
              <div className="mt-8 space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" weight="duotone" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/catalogo">
                    Ver mis programas
                    <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Image with social overlay on hover */}
              <div className="relative aspect-[4/3.5] rounded-2xl overflow-hidden shadow-soft-lg group">
                <Image
                  src="/images/lu-portrait.jpg"
                  alt="Lu Neyez - Wellness Coach"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Social overlay */}
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
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/30 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* YouTube Video Section with Parallax Background */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Conoceme un poco más
              </h2>
              <p className="text-muted-foreground">
                Te cuento mi historia y mi forma de trabajar
              </p>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-soft-lg bg-black">
              <iframe
                srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1><img src=https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg alt='Conoce a Lu Neyez'><span>▶</span></a>"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                title="Conocé a Lu Neyez"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Marquee */}
      <section className="py-16 md:py-24 overflow-hidden bg-primary/5">
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Mi filosofía
            </h2>
            <p className="text-muted-foreground">
              Los pilares que guían mi trabajo y la forma en que acompaño a cada persona
            </p>
          </motion.div>
        </div>

        <div className="flex relative overflow-hidden group w-full max-w-[100vw]">
          <motion.div
            className="flex gap-6 whitespace-nowrap min-w-full pl-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            whileHover={{ animationPlayState: 'paused' }}
            style={{ width: "fit-content" }}
          >
            {[...values, ...values].map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={`${value.title}-${index}`}
                  className="bg-card rounded-xl p-6 shadow-soft w-[300px] shrink-0 inline-flex flex-col items-start whitespace-normal hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 mb-4 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" weight="duotone" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              El Equipo
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Profesionales que me acompañan
            </h2>
            <p className="text-muted-foreground text-pretty max-w-3xl mx-auto">
              Detrás de cada proceso hay un equipo comprometido en acompañarte de manera cercana, profesional y personalizada. Creemos que lograr resultados reales va mucho más allá de seguir un plan: se trata de aprender, entender tu cuerpo, crear hábitos sostenibles y sentirte acompañado/a durante todo el proceso. A continuación vas a conocer a los profesionales que forman parte de esta experiencia integral, trabajando en conjunto para ayudarte a alcanzar tus objetivos desde un enfoque humano, completo y adaptado a vos <Heart className="inline-block ml-1 text-primary/60 h-5 w-5 align-text-bottom" weight="fill" />
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member) => (
              <motion.article
                key={member.name}
                variants={itemVariants}
                className="bg-card rounded-2xl overflow-hidden shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-serif font-semibold text-xl">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" weight="duotone" />
                        {member.role}
                      </p>
                    </div>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Instagram de ${member.name}`}
                    >
                      <InstagramLogo className="h-5 w-5" weight="fill" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Google Maps Section */}
      <GoogleMapsSection />
    </div>
  )
}
