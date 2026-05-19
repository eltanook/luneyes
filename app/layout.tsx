import type { Metadata, Viewport } from 'next'
import { Outfit, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CartProvider } from '@/lib/store/cart-store'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Lu Neyez | Wellness Coach',
    template: '%s | Lu Neyez',
  },
  description: 'Tu cambio empieza hoy. Programas de entrenamiento y nutrición personalizados para mujeres que buscan transformar su vida de manera sostenible.',
  keywords: ['wellness', 'coach', 'entrenamiento', 'nutrición', 'fitness', 'yoga', 'pilates', 'recetarios', 'guías de alimentación'],
  authors: [{ name: 'Lu Neyez' }],
  creator: 'Lu Neyez',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://luneyez.com',
    siteName: 'Lu Neyez Wellness Coach',
    title: 'Lu Neyez | Wellness Coach',
    description: 'Tu cambio empieza hoy. Programas de entrenamiento y nutrición personalizados.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lu Neyez | Wellness Coach',
    description: 'Tu cambio empieza hoy. Programas de entrenamiento y nutrición personalizados.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${sora.variable}`}>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
            <Toaster 
              position="bottom-left" 
              toastOptions={{
                style: {
                  background: 'oklch(0.65 0.15 145)', // Green success color
                  color: 'white',
                  border: 'none',
                },
              }}
            />
          </CartProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
