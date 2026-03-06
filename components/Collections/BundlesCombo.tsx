'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, Heart, ArrowRight } from 'lucide-react'
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
                <SectionHeading title="Sportswear" subtitle="Save more with our exclusive curated bundles" />

                {/* 5-col grid on desktop, 6 items limit */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                    {products.slice(0, 6).map((bundle, index) => (
                        <motion.div
                            key={bundle.id}
                            className={`${index === 5 ? 'lg:hidden' : ''} group bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-3 sm:p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full`}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden rounded-[1rem] sm:rounded-[2rem] aspect-square flex items-center justify-center">
                                <Image
                                    src={bundle.image || '/placeholder.svg'}
                                    alt={bundle.name}
                                    fill
                                    className="object-contain p-4 sm:p-6 group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                                />

                                {/* Badges & Icons */}
                                <div className="absolute inset-x-4 top-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-black text-accent shadow-sm border border-black/5 uppercase tracking-widest">
                                        {bundle.badge || 'Bundle Pack'}
                                    </div>
                                    <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 border border-black/5">
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-accent" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            < div className="mt-4 sm:mt-6 px-1 sm:px-2 flex flex-col flex-grow" >
                                <p className="text-primary text-[10px] sm:text-sm font-black uppercase tracking-widest mb-1 sm:mb-2">
                                    Exclusive Bundle
                                </p>
                                <h3 className="font-heading font-semibold text-[#1A1A1A] text-xs sm:text-lg leading-snug mb-2 sm:mb-3 line-clamp-2">
                                    {bundle.name}
                                </h3>

                                {
                                    bundle.rating && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex text-accent">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(bundle.rating!) ? 'fill-current' : 'text-gray-200'}`}
                                                    />
                                                ))}
                                            </div>
                                            {bundle.reviews && (
                                                <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">
                                                    ({bundle.reviews} Reviews)
                                                </span>
                                            )}
                                        </div>
                                    )
                                }

                                < div className="mt-auto pt-2 sm:pt-4" >
                                    <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
                                        <span className="text-sm sm:text-2xl font-black text-[#1A1A1A]">
                                            ${typeof bundle.price === 'number' ? bundle.price.toFixed(2) : bundle.price}
                                        </span>
                                        {bundle.originalPrice && (
                                            <span className="text-[10px] sm:text-base text-gray-400 line-through font-medium">
                                                ${bundle.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    <Button className="w-full bg-charcoal hover:bg-primary text-white font-extrabold py-2 sm:py-6 text-[9px] sm:text-base rounded-full transition-all duration-500 active:scale-95 shadow-lg hover:shadow-primary/30">
                                        Explore Bundle
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                    }
                </div >

                {/* View All Link */}
                < div className="flex justify-center mt-12" >
                    <Link
                        href="/products?category=bundles-combo"
                        className="group flex items-center gap-3 bg-secondary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-extrabold uppercase tracking-widest transition-all duration-500 shadow-sm hover:shadow-primary/20"
                    >
                        <span className="text-xs">View All Bundles</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div >
            </div >
        </section >
    )
}
