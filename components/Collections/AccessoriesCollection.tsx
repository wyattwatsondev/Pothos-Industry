'use client'

import { ProductCard } from '@/components/ProductGrid/ProductCard'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types/product'

interface AccessoriesCollectionProps {
  products: Product[]
}

export function AccessoriesCollection({ products }: AccessoriesCollectionProps) {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Accessories Collection" subtitle="Complete your look with our premium caps & accessories" />

        {/* 4-col grid, 1 row = 4 products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                badge={product.badge}
                category={product.category}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="flex justify-center mt-16">
          <Link
            href="/products?category=caps-hats"
            className="group flex items-center gap-3 bg-secondary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-extrabold uppercase tracking-widest transition-all duration-500 shadow-sm hover:shadow-primary/20"
          >
            <span className="text-xs">View Full Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
