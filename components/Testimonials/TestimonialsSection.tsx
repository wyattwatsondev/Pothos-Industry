'use client'

import Image from 'next/image'
import { Star, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Mateo Levi',
    role: 'COO sen brothers',
    content:
      'The user interface is intuitive and user-friendly. Even for someone like me, who isn\'t a professional photographer.',
    rating: 5,
    image: '/ProductImages/91.jpg',
    bgColor: 'bg-[#F0F9FF]', // Light Blue
  },
  {
    id: 2,
    name: 'Olivia Emma',
    role: 'CEO Pixify',
    content:
      'It was a pleasure working the headshot team they understood the brief correctly and delivered great design exceeding the expectations.',
    rating: 5,
    image: '/ProductImages/92.jpg',
    bgColor: 'bg-[#FFF1F2]', // Light Rose
  },
  {
    id: 3,
    name: 'Charlotte Amelia',
    role: 'Manager ImageIO',
    content:
      'The variety of styles and effects available is mind-blowing. I experimented with business portraits, and even some everyday looks.',
    rating: 5,
    image: '/ProductImages/90.jpg',
    bgColor: 'bg-[#F5F3FF]', // Light Lavender
  },
  {
    id: 4,
    name: 'James Elijah',
    role: 'CEO AI Forge',
    content:
      'I recently tried out and I am utterly amazed at the artistic brilliance it brings to the table. This tool is a game-changer for anyone.',
    rating: 5,
    image: '/ProductImages/93.jpg',
    bgColor: 'bg-[#F0FDF4]', // Light Emerald
  },
  {
    id: 5,
    name: 'William Henry',
    role: 'Director SnapGen',
    content:
      'One feature that stood out to me was the customization options. allows you to fine-tune the level of artistic expression.',
    rating: 5,
    image: '/ProductImages/94.png',
    bgColor: 'bg-[#EFF6FF]', // Light Blue
  },
  {
    id: 6,
    name: 'Sophia Rose',
    role: 'Marketing Head',
    content:
      'The process is seamless and the results are stunning. It has saved us a significant amount of time and resources.',
    rating: 5,
    image: '/ProductImages/8.jpg',
    bgColor: 'bg-[#FFFBEB]', // Light Gold
  },
]

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto">

        {/* Header with View All */}
        <div className="flex justify-between items-end mb-10 pb-6 border-b-2 border-gray-50">
          <h2 className="text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight uppercase">
            What Customers are Saying.
          </h2>
          <Link href="/reviews" className="group flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-charcoal hover:text-primary transition-all duration-300">
            View All Reviews
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`p-6 rounded-[2rem] ${testimonial.bgColor} transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between h-full`}
            >
              <div>
                {/* Author Block */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#1E293B] text-sm">{testimonial.name}</h4>
                    <p className="text-[10px] text-gray-500 font-medium">{testimonial.role}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-[#334155] text-[13px] leading-relaxed mb-6 font-medium">
                  {testimonial.content}
                </p>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mt-auto">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
