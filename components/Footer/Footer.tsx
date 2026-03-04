'use client'

import React from 'react'
import { Facebook, Instagram, Mail, Phone, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { name: "Textile", link: "/products?category=textile" },
  { name: "Textile Jackets", link: "/products?category=textile-jackets" },
  { name: "Leather Jackets", link: "/products?category=leather-jackets" },
  { name: "Gloves Collection", link: "/products?category=gloves-collection" },
  { name: "Accessories", link: "/products?category=accessories" },
  { name: "Pants", link: "/products?category=pants" },
  { name: "Swimming Diving Suits", link: "/products?category=swimming-diving-suits" },
  { name: "Uniforms", link: "/products?category=uniforms" }
]

export function Footer() {
  return (
    <footer className="w-full font-sans border-t border-black/5 bg-gradient-to-br from-[#A5C9E1]/30 via-[#D8D3F5]/30 to-[#F5E6FF]/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 text-center md:text-left">

          {/* Brand & Mission */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="POTHOS Logo"
                width={180}
                height={70}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-[15px] leading-relaxed max-w-xs text-[#2D4D63] font-bold italic">
              "Excellence in technical performance. Premium streetwear crafted for those who deserve the best."
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, link: "https://facebook.com" },
                { Icon: Instagram, link: "https://instagram.com" },
                { Icon: Twitter, link: "https://twitter.com" },
                { Icon: Youtube, link: "https://youtube.com" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#2D4D63] hover:bg-[#065F46] hover:border-[#065F46] hover:text-white transition-all duration-300 shadow-sm"
                >
                  <item.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories List */}
          <div className="lg:pl-8">
            <h3 className="text-[#111827] font-black text-[12px] uppercase tracking-[0.2em] mb-6 flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-px bg-[#065F46]" />
              Categories
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {categories.map((cat, i) => (
                <li key={i}>
                  <Link href={cat.link} className="text-sm font-bold text-[#2D4D63]/80 hover:text-[#065F46] hover:translate-x-1 inline-block transition-all duration-300">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:pl-8">
            <h3 className="text-[#111827] font-black text-[12px] uppercase tracking-[0.2em] mb-6 flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-px bg-[#B45309]" />
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="font-bold text-[#2D4D63]/80 hover:text-[#B45309] transition-colors">All Products</Link></li>
              <li><Link href="/about" className="font-bold text-[#2D4D63]/80 hover:text-[#B45309] transition-colors">About Story</Link></li>
              <li><Link href="/blogs" className="font-bold text-[#2D4D63]/80 hover:text-[#B45309] transition-colors">Latest Insights</Link></li>
              <li><Link href="/contact" className="font-bold text-[#2D4D63]/80 hover:text-[#B45309] transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="lg:pl-8">
            <h3 className="text-[#111827] font-black text-[12px] uppercase tracking-[0.2em] mb-6 flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-px bg-black/20" />
              Direct Support
            </h3>
            <div className="space-y-4">
              <a href="mailto:Hustlemoblifestyle1@gmail.com" className="group flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Email Us</span>
                <span className="text-sm text-[#2D4D63] font-bold group-hover:text-[#065F46] transition-colors break-all">
                  hustlemoblifestyle1@gmail.com
                </span>
              </a>
              <a href="https://wa.me/17737105399" target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">WhatsApp Direct</span>
                <span className="text-sm text-[#2D4D63] font-bold group-hover:text-[#065F46] transition-colors">
                  (773) 710-5399
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#2D4D63]/60">
            © 2026 POTHOS INDUSTRY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D4D63]/60">
            <Link href="/policy" className="hover:text-[#065F46] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#065F46] transition-colors">Terms</Link>
            <Link href="/shipping" className="hover:text-[#065F46] transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
