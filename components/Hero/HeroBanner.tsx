'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroBanner() {
  return (
    <section className="relative w-full lg:min-h-[750px] flex flex-col justify-between 
      bg-gradient-to-br from-[#A5C9E1]/50 via-[#D8D3F5]/50 to-[#F5E6FF]/50 
      overflow-hidden pt-8 lg:pt-16 pb-8 px-6 lg:px-24">

      {/* Background Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-[20vw] lg:text-[25vw] font-black text-white/15 uppercase tracking-tighter leading-none -rotate-12 translate-y-[-5%] transition-all duration-700">
          POTHOS
        </h2>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between relative z-10 max-w-[1440px] mx-auto w-full gap-8 lg:gap-0 mt-0 mb-4">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-[62%] flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left items-center lg:items-start"
        >
          <h1 className="text-3xl sm:text-6xl lg:text-[4.5rem] font-bold text-charcoal leading-[1.1] lg:leading-[1.05] tracking-tighter max-w-4xl drop-shadow-[0_2px_15px_rgba(255,255,255,0.9)] uppercase">
            Experience the <span className="text-[#065F46]">Premium</span>  Comfort you <span className="text-[#B45309]">Deserve</span>
          </h1>

          <p className="text-charcoal/70 text-sm sm:text-lg max-w-2xl font-bold leading-relaxed px-4 lg:px-0">
           Discover a new level of style with our premium clothing collection. Designed with attention to detail and crafted from high-quality fabrics, our pieces combine comfort, durability, and modern fashion to help you stand out wherever you go.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Button
              className="group px-8 py-5 sm:px-10 sm:py-7 bg-charcoal hover:bg-[#2D4D63] text-white font-black rounded-full text-xs sm:text-base lg:text-lg uppercase tracking-widest transition-all duration-300 shadow-none active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Buy Now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Button>

            <Button
              variant="outline"
              className="group px-8 py-5 sm:px-10 sm:py-7 border-2 border-charcoal hover:bg-charcoal hover:text-white text-charcoal font-black rounded-full text-xs sm:text-base lg:text-lg uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Explore More
              <span className="group-hover:translate-y-[-2px] transition-transform">↗</span>
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
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 relative z-20 mt-8 lg:mt-4 px-4 sm:px-0">
        {[
          { color: "bg-[#7CC6E9]", price: "322.99", img: "/ProductImages/89.jpg" },
          { color: "bg-[#F3DE45]", price: "322.99", img: "/ProductImages/87.jpg" },
          { color: "bg-[#FFFFFF]", price: "322.99", img: "/ProductImages/12.jpg" }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (idx * 0.2) }}
            className="group flex items-center bg-white/40 backdrop-blur-md rounded-2xl lg:rounded-3xl p-3 lg:p-4 pr-6 lg:pr-8 border border-white/30 md:hover:bg-white/50 transition-all duration-500 cursor-pointer shadow-none"
          >
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl lg:rounded-2xl overflow-hidden mr-4 flex-shrink-0">
              <div className={`absolute inset-0 ${item.color} opacity-20`} />
              <Image src={item.img} alt="Product" fill className="object-cover md:group-hover:scale-110 transition-transform duration-500 p-2" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-800 font-bold text-[10px] lg:text-xs mb-0.5 uppercase tracking-tight">Mauris porta</h4>
              <p className="text-gray-900 font-black text-sm lg:text-base">${item.price}</p>
            </div>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-base lg:text-lg md:group-hover:scale-110 transition-transform">
              +
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}
