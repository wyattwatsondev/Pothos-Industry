import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Outfit, Cormorant_Garamond } from 'next/font/google'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'POTHOS INDUSTRY - Premium Fashion & Apparel',
  description:
    'Shop the latest mens and womens fashion including t-shirts, shoes, hoodies, caps and more. Get 25% OFF on your first order!',
  generator: 'v0.app',
  keywords: [
    'fashion',
    'clothing',
    'mens fashion',
    'womens fashion',
    'shoes',
    'hoodies',
    'jackets',
    'POTHOS INDUSTRY',
  ],
}

import { CartSidebar } from "@/components/Cart/CartSidebar"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${outfit.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
        <CartSidebar />
        <WhatsAppButton />
      </body>
    </html>
  )
}
