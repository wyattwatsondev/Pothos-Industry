'use client'

import { ProductCard } from '@/components/ProductGrid/ProductCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'

interface BundlesComboProps {
    products: Product[]
}

export function BundlesCombo({ products }: BundlesComboProps) {
    return (
        <section className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <SectionHeading title="Gloves Collection" subtitle="Save more with our exclusive premium gloves" />

                {/* 5-col grid on desktop, 6 items limit */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mt-12">
                    {products.slice(0, 6).map((product, index) => (
                        <motion.div
                            key={product.id}
                            className={index === 5 ? 'lg:hidden' : ''}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
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
                <div className="flex justify-center mt-12">
                    <Link
                        href="/products?category=Mens+%26+Women&subCategory=Gloves+Collection"
                        className="group flex items-center gap-3 bg-secondary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-extrabold uppercase tracking-widest transition-all duration-500 shadow-sm hover:shadow-primary/20"
                    >
                        <span className="text-xs">View All Gloves</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

