'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/923456732994"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-0 sm:bottom-6 right-6 z-50 transition-all duration-300 flex items-center justify-center p-0 "
            aria-label="Contact on WhatsApp"
        >
            <div className="relative w-14 h-14 sm:w-20 h-20">
                <Image
                    src="/whatsappicon.png"
                    alt="WhatsApp"
                    fill
                    className="object-contain "
                />
            </div>

        </motion.a>
    )
}