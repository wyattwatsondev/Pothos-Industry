'use client'

import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'

const galleryItems = [
  {
    id: 1,
    image: '/Photos Industry/10.jpeg',
    title: 'Summer Collection',
    colSpan: 'col-span-1 row-span-2',
  },
  {
    id: 2,
    image: '/Photos Industry/13.jpeg',
    title: 'Accessories',
    colSpan: 'col-span-1',
  },
  {
    id: 3,
    image: '/Photos Industry/7.jpeg',
    title: 'Beauty & Care',
    colSpan: 'col-span-1',
  },
  {
    id: 4,
    image: '/Photos Industry/9.jpeg',
    title: 'Skincare',
    colSpan: 'col-span-1 row-span-2',
  },
]

export function GallerySection() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Inspire Your Style" subtitle="Discover our latest collections and trending lifestyle pieces" />

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`${item.id === 1 || item.id === 4 ? 'sm:row-span-2' : ''} relative group overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] h-40 sm:h-80 lg:h-96 cursor-pointer border border-gray-100 shadow-sm`}
            >
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 font-sans"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-primary/70 transition-all duration-500 flex items-end p-8 opacity-0 group-hover:opacity-100">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-black text-2xl uppercase tracking-tighter">
                    {item.title}
                  </h3>
                  <div className="w-12 h-1.5 bg-white mt-2 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
