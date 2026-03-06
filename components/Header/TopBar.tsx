'use client'

import { useState, useEffect } from 'react'
import { X, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function TopBar() {
  // Permanently visible per user preference
  const isVisible = true;


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-gray-800 text-white 
                     flex items-center justify-between 
                     h-9 sm:h-11
                     px-2 sm:px-8
                     text-[9px] sm:text-sm
                     shadow-md"
        >
          {/* Left Side */}
          <p className="font-medium truncate pr-2">
            Get 25% OFF
          </p>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">

            {/* Phone */}
            <a
              href="https://wa.me/923456732994"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Phone className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
              <span>
                +92 345 6732994
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:info@pothosindustry.com"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Mail className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
              <span className="lowercase">
                info@pothosindustry.com
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}