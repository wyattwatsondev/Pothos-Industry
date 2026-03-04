'use client'

import { CategoryCard } from './CategoryCard'
import categories from '@/data/categories.json'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'

export function CategoryGrid() {
  return (
    <section className="w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl">
      <SectionHeading title="Shop by Category" subtitle="Explore our premium collection across specialized textile and leather categories" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10 mt-12"
      >
        {categories.categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CategoryCard {...category} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
