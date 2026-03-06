'use client'

import { ProductCard } from './ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types/product'

interface ProductGridProps {
  title: string
  items: Product[]
}

export function ProductGrid({ title, items }: ProductGridProps) {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-[1550px]">
      <SectionHeading title={title} subtitle="Premium quality products selected just for you" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 lg:gap-8">
        {items.slice(0, 6).map((product, index) => (
          <motion.div
            key={product.id}
            className={index === 5 ? 'lg:hidden' : ''}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              badge={product.badge}
              rating={product.rating}
            />
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <div className="flex justify-center mt-16">
        <Link
          href="/products"
          className="group flex items-center gap-3 bg-secondary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-extrabold uppercase tracking-widest transition-all duration-500 shadow-sm hover:shadow-primary/20"
        >
          <span className="text-xs">View All Products</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  )
}
