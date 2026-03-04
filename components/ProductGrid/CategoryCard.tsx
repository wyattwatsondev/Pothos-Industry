'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface CategoryCardProps {
  id: number
  name: string
  slug: string
  image: string
  link: string
  badge?: string
}

export function CategoryCard({
  name,
  image,
  link,
}: CategoryCardProps) {
  return (
    <Link href={link}>
      <motion.div
        className="flex flex-col gap-3 group cursor-pointer max-w-[220px] mx-auto w-full md:hover:-translate-y-2 transition-transform duration-300"
      >
        {/* Rounded Image Container */}
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-gray-100 shadow-none transition-all duration-500 md:group-hover:border-primary/20">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover md:group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 250px, 300px"
          />
          {/* Subtle Overlay - Hidden on mobile, shown on desktop hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
            <span className="text-white font-black text-xs uppercase tracking-[0.2em] translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
              Shop Collection
            </span>
          </div>
        </div>

        {/* Category Name */}
        <div className="flex flex-col items-center">
          <h3 className="text-center font-bold text-sm sm:text-lg lg:text-xl text-charcoal md:group-hover:text-primary transition-colors duration-300 uppercase tracking-tighter leading-tight">
            {name}
          </h3>
          <div className="w-0 md:group-hover:w-full h-0.5 bg-primary transition-all duration-500 mt-1" />
        </div>
      </motion.div>
    </Link>
  )
}
