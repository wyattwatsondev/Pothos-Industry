'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface BlogPost {
    id: number
    title: string
    subtitle: string
    category: string
    date: string
    image?: string
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Wanderlust Unleashed: Top Hidden Gems You Must Visit This Year",
        subtitle: "Discover unique, off-the-radar destinations around the world that offer breathtaking scenery and unforgettable experiences.",
        category: "Health & Nutrition",
        date: "August 7, 2017",
        image: "/Photos Industry/8.jpeg",
    },
    {
        id: 2,
        title: "Travel Bucket List: 25 Destinations for Every Adventurer",
        subtitle: "Explore a curated list of must-visit places for every kind of traveler, whether you love mountains, beaches, or cultural landmarks.",
        category: "Sustainability",
        date: "March 23, 2013",
        image: "/Photos Industry/12.jpeg",
    },
    {
        id: 3,
        title: "How to Travel Like a Local: Insider Tips for Authentic Experiences",
        subtitle: "Learn how to immerse yourself in the culture of each place you visit by following these insider tips. From dining at local spots to embracing.",
        category: "Cultural Insights",
        date: "May 31, 2015",
        image: "/Photos Industry/7.jpeg",
    },
    {
        id: 4,
        title: "The Ordinary: A Minimalist Approach to Skincare",
        subtitle: "Discover the science-backed ingredients that are revolutionizing the beauty industry with a focus on simplicity and efficacy.",
        category: "Skincare",
        date: "October 24, 2024",
        image: "/Photos Industry/30.jpeg",
    },
    {
        id: 5,
        title: "Urban Exploration: Finding Beauty in the Concrete Jungle",
        subtitle: "A photographic journey through the world's most iconic cities, capturing the hidden details often overlooked by the casual observer.",
        category: "Photography",
        date: "January 15, 2024",
        image: "/Photos Industry/11.jpeg",
    },
]

export function BlogSection() {
    return (
        <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden font-sans border-t border-gray-100">
            <div className="max-w-[1550px] mx-auto">

                {/* Header with View All */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b-2 border-gray-50 pb-6 gap-2 md:gap-0">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                            Latest Insights.
                        </h2>
                    </div>
                    <div className="flex justify-end">
                        <Link href="/blog" className="group flex items-center gap-1.5 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-charcoal hover:text-primary transition-all duration-300">
                            View All Stories
                            <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* 5 Cards in a Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {blogPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className="group relative aspect-[3/4.5] rounded-3xl overflow-hidden shadow-md bg-gray-100 flex flex-col justify-end">
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

                            <div className="relative z-10 p-5 flex flex-col items-start gap-3">
                                <span className="px-2 py-1 bg-white/95 backdrop-blur-sm text-black text-[9px] font-black tracking-tight rounded-md shadow-sm uppercase">
                                    {post.category}
                                </span>
                                <div>
                                    <h3 className="text-base sm:text-lg font-black text-white leading-tight mb-2 tracking-tight group-hover:text-primary transition-colors uppercase">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-300 text-[11px] font-medium line-clamp-3 leading-snug opacity-80">
                                        {post.subtitle}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
