'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Promo 1 */}
          <div className="flex flex-col justify-center">
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">
              Free Shipping
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              On orders over $50
            </p>
          </div>

          {/* Promo 2 */}
          <div className="flex flex-col justify-center border-l border-r border-gray-700 px-6 sm:px-8">
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">
              Easy Returns
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              30-day return policy
            </p>
          </div>

          {/* Promo 3 */}
          <div className="flex flex-col justify-center">
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Expert customer service
            </p>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Close banner"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
