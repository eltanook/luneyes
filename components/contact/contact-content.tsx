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
  TiktokLogo,
  WhatsappLogo
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
    label: 'Teléfono',
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
  { icon: TiktokLogo, href: 'https://www.tiktok.com/@lu.neyez', label: 'TikTok' },
  { icon: WhatsappLogo, href: 'https://wa.me/543484307219', label: 'WhatsApp' },
]

export function ContactContent() {
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
          _subject: "Nuevo mensaje de contacto - Luneyez",
          Nombre: formData.get("name"),
          Email: formData.get("email"),
          Teléfono: formData.get("phone"),
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
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Contacto
          </h1>
          <p className="text-muted-foreground">
            ¿Tenés alguna consulta? Escribime y te respondo a la brevedad
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Form */}
          <motion.div
            className="lg:col-span-2 h-full flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form 
              onSubmit={handleSubmit} 
              className="bg-card rounded-2xl shadow-soft p-6 md:p-8 space-y-6 flex-1 flex flex-col"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Nombre completo</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Teléfono (opcional)</Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+54 11 1234 5678"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Asunto</Label>
                  <Select name="subject" required>
                    <SelectTrigger id="contact-subject">
                      <SelectValue placeholder="Seleccioná un tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta-general">Consulta general</SelectItem>
                      <SelectItem value="programas">Sobre programas</SelectItem>
                      <SelectItem value="asesorias">Asesorías personalizadas</SelectItem>
                      <SelectItem value="colaboraciones">Colaboraciones</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <Label htmlFor="contact-message">Mensaje</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Contame más sobre tu consulta..."
                  className="flex-1 min-h-[150px] resize-y"
                  required
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={isLoading}>
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
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-card rounded-2xl shadow-soft p-6 flex flex-col justify-center">
              <h2 className="font-serif font-semibold text-lg mb-4">
                Información de contacto
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" weight="duotone" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
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
              <h2 className="font-serif font-semibold text-lg mb-4">
                Seguime en redes
              </h2>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={link.label}
                    >
                      <Icon className="h-5 w-5" weight="fill" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl overflow-hidden shadow-soft h-[400px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.0!2d-60.7!3d-31.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ4LjAiUyA2MMKwNDInMDAuMCJX!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación"
          />
        </motion.div>
      </div>
    </div>
  )
}
