import { Metadata } from 'next'
import { ContactContent } from '@/components/contact/contact-content'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactá a Lu Neyez para consultas sobre programas, asesorías personalizadas o cualquier otra pregunta.',
}

export default function ContactoPage() {
  return <ContactContent />
}
