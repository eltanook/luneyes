'use client'

import { motion } from 'framer-motion'

export function GoogleMapsSection() {
  return (
    <section className="pb-0 w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full h-[300px] md:h-[400px]"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.0!2d-60.7!3d-31.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ4LjAiUyA2MMKwNDInMDAuMCJX!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Lu Neyez"
        />
      </motion.div>
    </section>
  )
}
