'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PaperPlaneRight, 
  Spinner,
  EnvelopeSimple,
  Phone,
  MapPin,
  InstagramLogo,
  WhatsappLogo
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const contactInfo = [
  {
    icon: EnvelopeSimple,
    label: 'Email',
    value: 'Asesorias@luneyez.com',
    href: 'mailto:Asesorias@luneyez.com',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+54 348 430 7219',
    href: 'https://wa.me/543484307219',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Argentina',
    href: null,
  },
]

const socialLinks = [
  { icon: InstagramLogo, href: 'https://www.instagram.com/lu.neyez', label: 'Instagram' },
  { icon: WhatsappLogo, href: 'https://wa.me/543484307219', label: 'WhatsApp' },
]

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formsubmit.co/ajax/Asesorias@luneyez.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "Nueva consulta (Home) - Luneyez",
          Nombre: formData.get("name"),
          Email: formData.get("email"),
          Asunto: formData.get("subject"),
          Mensaje: formData.get("message")
        })
      })

      if (response.ok) {
        toast.success('Mensaje enviado correctamente. Te responderemos pronto.')
        form.reset()
      } else {
        toast.error('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.')
      }
    } catch (error) {
      toast.error('Hubo un error de conexión.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contacto
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
            ¿Tenés alguna consulta?
          </h2>
          <p className="text-muted-foreground">
            Escribime y te respondo a la brevedad
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card rounded-2xl shadow-soft p-6 md:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="¿En qué puedo ayudarte?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Contame más sobre tu consulta..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4 animate-spin" weight="bold" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <PaperPlaneRight className="ml-2 h-4 w-4" weight="bold" />
                  </>
                )}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-2xl shadow-soft p-6 h-fit">
                <h3 className="font-serif font-semibold text-lg mb-4">Información de contacto</h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    const content = (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" weight="duotone" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="font-medium text-sm">{item.value}</p>
                        </div>
                      </div>
                    )

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block hover:opacity-80 transition-opacity"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-soft p-6">
                <h3 className="font-serif font-semibold text-lg mb-4">Seguime en redes</h3>
                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={link.label}
                      >
                        <Icon className="h-5 w-5" weight="fill" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
