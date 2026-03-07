'use client'

import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="w-full bg-white text-gray-900 py-6 sm:py-8 border-y border-gray-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-12 sm:w-20 sm:h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-8 shadow-inner border border-primary/10"
        >
          <Mail className="w-6 h-6 sm:w-10 sm:h-10 text-primary" />
        </motion.div>

        <h2 className="text-xl sm:text-4xl md:text-5xl font-semibold mb-2 sm:mb-6 text-charcoal uppercase tracking-tight">
          Join the <span className="text-primary italic">Collective</span>
        </h2>

        <p className="text-gray-500 mb-6 sm:mb-12 text-xs sm:text-lg sm:text-xl font-medium max-w-xl mx-auto">
          Get exclusive offers, new arrivals, and special promotions delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 sm:px-8 py-2.5 sm:py-2 rounded-full border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-xs sm:text-lg bg-white"
          />
          <Button
            type="submit"
            className="bg-charcoal hover:bg-primary text-white font-extrabold px-6 sm:px-8 py-2.5 sm:py-6 rounded-full transition-all duration-500 whitespace-nowrap tracking-widest text-[10px] sm:text-md shadow-xl hover:shadow-primary/30"
          >
            Subscribe Now
          </Button>
        </form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 sm:mt-6 text-green-600 font-black uppercase tracking-widest text-sm sm:text-base"
          >
            ✓ You're in the squad!
          </motion.p>
        )}
      </motion.div>
    </section>

  )
}
