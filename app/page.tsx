import { HeroSection } from '@/components/home/hero-section'
import { AboutPreview } from '@/components/home/about-preview'
import { CategoriesSection } from '@/components/home/categories-section'
import { BannerSection } from '@/components/home/banner-section'
import { FeaturedProductsSection } from '@/components/home/featured-products'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { ContactForm } from '@/components/home/contact-form'
import { GoogleMapsSection } from '@/components/home/google-maps-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <CategoriesSection />
      <BannerSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <ContactForm />
      <GoogleMapsSection />
    </>
  )
}
