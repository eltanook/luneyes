'use client'

import { WhatsappLogo } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/543484307219"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-soft-lg hover:scale-110 transition-transform"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      aria-label="Contactar por WhatsApp"
    >
      <WhatsappLogo className="h-7 w-7" weight="fill" />
    </motion.a>
  )
}
