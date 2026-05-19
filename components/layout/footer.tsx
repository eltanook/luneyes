import Link from 'next/link'
import Image from 'next/image'
import { 
  InstagramLogo, 
  TiktokLogo, 
  WhatsappLogo, 
  EnvelopeSimple,
  MapPin,
  Phone
} from '@phosphor-icons/react/dist/ssr'

const quickLinks = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/catalogo?categoria=recetarios', label: 'Recetarios' },
  { href: '/catalogo?categoria=nutri-guia', label: 'Nutri-Guía' },
  { href: '/catalogo?categoria=planes-principiantes', label: 'Planes Principiantes' },
  { href: '/sobre-mi', label: 'Sobre Mí' },
  { href: '/blog', label: 'Blog' },
]

const socialLinks = [
  { 
    href: 'https://www.instagram.com/lu.neyez', 
    label: 'Instagram',
    icon: InstagramLogo 
  },
  { 
    href: 'https://www.tiktok.com/@lu.neyez', 
    label: 'TikTok',
    icon: TiktokLogo 
  },
  { 
    href: 'https://wa.me/543484307219', 
    label: 'WhatsApp',
    icon: WhatsappLogo 
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t overflow-hidden">
      {/* Dotted pattern background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #ff69b4 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
        }}
      />
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Lu Neyez Wellness Coach"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-semibold text-lg block">Lu Neyez</span>
                <span className="text-xs text-muted-foreground">Wellness Coach</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hace más de 6 años acompaño a mujeres en su transformación hacia una vida más saludable y equilibrada.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-base mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-base mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:Asesorias@luneyez.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <EnvelopeSimple className="h-4 w-4 shrink-0" weight="duotone" />
                  Asesorias@luneyez.com
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/543484307219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" weight="duotone" />
                  +54 348 430 7219
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" weight="duotone" />
                Argentina
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-serif font-semibold text-base mb-4">Redes Sociales</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.href}
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
            <p className="text-xs text-muted-foreground mt-4">
              Seguime en redes para tips, recetas y motivación diaria.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {currentYear} Lu Neyez Wellness Coach. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="/privacidad" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidad
              </Link>
              <Link 
                href="/terminos" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Términos
              </Link>
              <span className="text-xs text-muted-foreground">|</span>
              <a 
                href="https://zevetix.online" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Diseñado y desarrollado por <span className="font-medium">Zevetix</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
