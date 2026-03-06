'use client'

import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar, Clock, User } from 'lucide-react'

const posts = [
    {
        title: "The Art of Premium Leather Manufacturing in Sialkot",
        excerpt: "Discover the heritage and precision behind our world-class leather garments, where tradition meets modern industrial technology.",
        date: "March 01, 2026",
        readTime: "5 min read",
        author: "Pothos Editorial",
        category: "Manufacturing",
        image: "/Photos Industry/24.png"
    },
    {
        title: "Textile Innovations: Engineering Durable Workwear",
        excerpt: "Exploring the advanced fabric technologies that make our textile garments resistant to the toughest environments.",
        date: "Feb 25, 2026",
        readTime: "4 min read",
        author: "Tech Team",
        category: "Innovation",
        image: "/Photos Industry/14.png"
    },
    {
        title: "Hand-Stitched Excellence: The Glove Collection",
        excerpt: "A deep dive into the craftsmanship required to produce gloves that offer both maximum protection and superior comfort.",
        date: "Feb 18, 2026",
        readTime: "6 min read",
        author: "Design Studio",
        category: "Craftsmanship",
        image: "/Photos Industry/15.png"
    },
    {
        title: "Sustainability in Global Apparel Export",
        excerpt: "How Pothos Industry is leading the way in eco-friendly production methods for international markets.",
        date: "Feb 12, 2026",
        readTime: "4 min read",
        author: "Sustainability Dept",
        category: "Ethics",
        image: "/Photos Industry/18.png"
    },
    {
        title: "Industrial Safety Standards: A Guide for 2026",
        excerpt: "Understanding the latest international safety certifications and why they matter for your workforce's protection.",
        date: "Feb 05, 2026",
        readTime: "7 min read",
        author: "Safety Experts",
        category: "Safety",
        image: "/Photos Industry/20.png"
    },
    {
        title: "The Future of Synthetic Gear in Sports",
        excerpt: "How new materials are revolutionizing performance and durability in modern athletic and protective gear.",
        date: "Jan 28, 2026",
        readTime: "5 min read",
        author: "R&D Lab",
        category: "Sports",
        image: "/Photos Industry/11.jpeg"
    }
]

export default function BlogsPage() {
    return (
        <div className="min-h-screen">
            <TopBar />
            <Navigation />

            <main>
                {/* Hero section for Blog */}
                <section className="bg-gradient-to-br from-[#A5C9E1]/50 via-[#D8D3F5]/50 to-[#F5E6FF]/50  py-12 lg:py-16 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <SectionHeading
                            title="Industry Insights"
                            subtitle="Expert perspectives on manufacturing, quality, and global apparel trends."
                            className="mb-0 [&_h2]:!text-2xl sm:[&_h2]:!text-4xl lg:[&_h2]:!text-5xl [&_p]:!mt-3"
                        />
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 py-12 lg:py-20 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {posts.map((post, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Image Container */}
                                <div className="relative h-60 lg:h-64 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-charcoal rounded-lg shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 lg:p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-xl lg:text-2xl font-black text-charcoal leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tighter">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                                <User className="w-3 h-3 text-gray-400" />
                                            </div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.author}</span>
                                        </div>

                                        <Link
                                            href="#"
                                            className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white transition-all duration-300"
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Newsletter / CTA for Blog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-20 bg-charcoal rounded-[3rem] p-8 lg:p-12 text-center text-white relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-10 blur-xl group-hover:scale-150 transition-transform duration-[2000ms]">
                            <div className="w-64 h-64 bg-white rounded-full" />
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4">Stay Ahead of the Curve</h2>
                            <p className="text-white/70 font-medium mb-8">Subscribe to receive our latest manufacturing insights and product innovation updates directly in your inbox.</p>

                            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your work email"
                                    className="flex-1 h-14 rounded-full bg-white/10 border border-white/20 px-6 outline-none focus:bg-white/20 focus:border-white/40 transition-all placeholder:text-white/30 text-sm"
                                />
                                <button className="h-14 px-8 bg-white text-charcoal rounded-full font-black uppercase tracking-widest text-xs hover:bg-gray-100 active:scale-95 transition-all">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
