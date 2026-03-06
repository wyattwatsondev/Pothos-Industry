'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, Eye } from 'lucide-react'

export function HeroBanner() {
  return (
    <section className="relative w-full lg:min-h-[600px] flex flex-col justify-between 
      bg-gradient-to-br from-[#A5C9E1]/50 via-[#D8D3F5]/50 to-[#F5E6FF]/50 
      overflow-hidden pt-4 lg:pt-2 pb-0 px-6 lg:px-16">

      {/* Background Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-[20vw] lg:text-[25vw] font-black text-white/15 uppercase tracking-tighter leading-none -rotate-12 translate-y-[-5%] transition-all duration-700">
          POTHOS
        </h2>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between relative z-10 max-w-[1400px] mx-auto w-full gap-8 lg:gap-0 mt-0 mb-0">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-[52%] flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left items-center lg:items-start"
        >
          <h1 className="text-3xl sm:text-6xl lg:text-[4.5rem] font-bold text-charcoal leading-[1.1] lg:leading-[1.05] tracking-tighter max-w-4xl drop-shadow-[0_2px_15px_rgba(255,255,255,0.9)] uppercase">
            Experience the <span className="text-[#065F46]">Premium</span>  Comfort you <span className="text-[#B45309]">Deserve</span>
          </h1>

          <p className="text-charcoal/70 text-sm sm:text-lg max-w-2xl font-bold leading-relaxed px-4 lg:px-0">
            Discover a new level of style with our premium clothing collection. Designed with attention to detail and crafted from high-quality fabrics, our pieces combine comfort, durability, and modern fashion to help you stand out wherever you go.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Button
              asChild
              className="group px-8 py-5 sm:px-10 sm:py-7 bg-charcoal hover:bg-[#2D4D63] text-white font-black rounded-full text-xs sm:text-base lg:text-lg uppercase tracking-widest transition-all duration-300 shadow-none active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Link href="/products">
                Buy Now
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="group px-8 py-5 sm:px-10 sm:py-7 border-2 border-charcoal hover:bg-charcoal hover:text-white text-charcoal font-black rounded-full text-xs sm:text-base lg:text-lg uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Link href="/blogs">
                Explore More
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Right Product Grid - Small Box 2x2 */}
        <div className="lg:w-[35%] grid grid-cols-2 gap-3 lg:gap-4 w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[500px] aspect-square relative z-10 mx-auto lg:mx-0">
          {[
            "/Photos Industry/1.jpeg",
            "/Photos Industry/7.jpeg",
            "/Photos Industry/11.jpeg",
            "/Photos Industry/12.jpeg"
          ].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative rounded-[1.2rem] lg:rounded-[1.5rem] overflow-hidden border border-white/30 group cursor-pointer"
            >
              <Image
                src={img}
                alt={`Collection ${idx + 1}`}
                fill
                className="object-cover md:group-hover:scale-110 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Product Quick Cards */}


    </section>
  )
}
