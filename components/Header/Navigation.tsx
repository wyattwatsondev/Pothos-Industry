'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Menu, X, Loader2, Facebook, Instagram, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import { useFashionStore } from '@/lib/store'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'About US', href: '/about' },
  { name: 'Shop', href: '/products' },
  {
    name: 'Mens',
    href: '/products?category=Mens',
    children: [
      {
        name: 'Textile',
        href: '/products?category=Mens&subCategory=Textile',
        items: [
          { name: 'Denim Shirts', href: '/products?category=Mens&subCategory=Textile&itemType=Denim%20Shirts' },
          { name: 'Sweatshirts', href: '/products?category=Mens&subCategory=Textile&itemType=Sweatshirts' },
          { name: 'Hoodies', href: '/products?category=Mens&subCategory=Textile&itemType=Hoodies' },
          { name: 'Joggers & Chinos', href: '/products?category=Mens&subCategory=Textile&itemType=Joggers%20%26%20Chinos' },
          { name: 'T Shirts', href: '/products?category=Mens&subCategory=Textile&itemType=T%20Shirts' },
          { name: 'Tank Tops And Singlets', href: '/products?category=Mens&subCategory=Textile&itemType=Tank%20Tops%20And%20Singlets' },
          { name: 'Track Suits', href: '/products?category=Mens&subCategory=Textile&itemType=Track%20Suits' },
          { name: 'Polo Shirts', href: '/products?category=Mens&subCategory=Textile&itemType=Polo%20Shirts' },
          { name: 'Shorts', href: '/products?category=Mens&subCategory=Textile&itemType=Shorts' },
        ]
      },
      {
        name: 'Textile Jackets',
        href: '/products?category=Mens&subCategory=Textile%20Jackets',
        items: [
          { name: 'Denim Jackets', href: '/products?category=Mens&subCategory=Textile%20Jackets&itemType=Denim%20Jackets' },
          { name: 'Windbreaker Jackets', href: '/products?category=Mens&subCategory=Textile%20Jackets&itemType=Windbreaker%20Jackets' },
          { name: 'Bubble-Puffer Jackets', href: '/products?category=Mens&subCategory=Textile%20Jackets&itemType=Bubble-Puffer%20Jackets' },
          { name: 'Varsity Jackets', href: '/products?category=Mens&subCategory=Textile%20Jackets&itemType=Varsity%20Jackets' },
          { name: 'Softshell Jackets', href: '/products?category=Mens&subCategory=Textile%20Jackets&itemType=Softshell%20Jackets' },
          { name: 'Fleece Jackets', href: '/products?category=Mens&subCategory=Textile%20Jackets&itemType=Fleece%20Jackets' },
        ]
      },
      {
        name: 'Leather Jackets',
        href: '/products?category=Mens&subCategory=Leather%20Jackets',
        items: [
          { name: 'Suede Leather Jackets', href: '/products?category=Mens&subCategory=Leather%20Jackets&itemType=Suede%20Leather%20Jackets' },
          { name: 'Shearling Leather Jackets', href: '/products?category=Mens&subCategory=Leather%20Jackets&itemType=Shearling%20Leather%20Jackets' },
          { name: 'Leather Fashion Jackets', href: '/products?category=Mens&subCategory=Leather%20Jackets&itemType=Leather%20Fashion%20Jackets' },
          { name: 'PU Leather Fashion Jackets', href: '/products?category=Mens&subCategory=Leather%20Jackets&itemType=PU%20Leather%20Fashion%20Jackets' },
          { name: 'Motorbike Leather Jacket', href: '/products?category=Mens&subCategory=Leather%20Jackets&itemType=Motorbike%20Leather%20Jacket' },
          { name: 'Motorbike Leather Suit', href: '/products?category=Mens&subCategory=Leather%20Jackets&itemType=Motorbike%20Leather%20Suit' },
          { name: 'Leather Blazers', href: '/products?category=Mens&subCategory=Leather%20Jackets&itemType=Leather%20Blazers' },
          { name: 'Leather Long Coats', href: '/products?category=Mens&subCategory=Leather%20Jackets&itemType=Leather%20Long%20Coats' },
        ]
      },
      {
        name: 'Pant',
        href: '/products?category=Mens&subCategory=Pant',
        items: [
          { name: 'Leather Pants', href: '/products?category=Mens&subCategory=Pant&itemType=Leather%20Pants' },
        ]
      },
      { name: 'Swimming Diving Suit', href: '/products?category=Mens&subCategory=Swimming%20Diving%20Suit' },
      {
        name: 'Gloves Collection',
        href: '/products?category=Mens&subCategory=Gloves%20Collection',
        items: [
          { name: 'Cycling Gloves', href: '/products?category=Mens&subCategory=Gloves%20Collection&itemType=Cycling%20Gloves' },
          { name: 'Driving Gloves', href: '/products?category=Mens&subCategory=Gloves%20Collection&itemType=Driving%20Gloves' },
          { name: 'Golf Gloves', href: '/products?category=Mens&subCategory=Gloves%20Collection&itemType=Golf%20Gloves' },
          { name: 'Mechanics Gloves', href: '/products?category=Mens&subCategory=Gloves%20Collection&itemType=Mechanics%20Gloves' },
          { name: 'TPR Impact Gloves', href: '/products?category=Mens&subCategory=Gloves%20Collection&itemType=TPR%20Impact%20Gloves' },
          { name: 'Weightlifting Gloves', href: '/products?category=Mens&subCategory=Gloves%20Collection&itemType=Weightlifting%20Gloves' },
          { name: 'Working Gloves', href: '/products?category=Mens&subCategory=Gloves%20Collection&itemType=Working%20Gloves' },
        ]
      },
      {
        name: 'Accessories',
        href: '/products?category=Mens&subCategory=Accessories',
        items: [
          { name: 'Backpack', href: '/products?category=Mens&subCategory=Accessories&itemType=Backpack' },
          { name: 'Bracelets', href: '/products?category=Mens&subCategory=Accessories&itemType=Bracelets' },
          { name: 'Face Mask', href: '/products?category=Mens&subCategory=Accessories&itemType=Face%20Mask' },
          { name: 'Hand Bags', href: '/products?category=Mens&subCategory=Accessories&itemType=Hand%20Bags' },
          { name: 'Hats & Caps', href: '/products?category=Mens&subCategory=Accessories&itemType=Hats%20%26%20Caps' },
          { name: 'Night Masks', href: '/products?category=Mens&subCategory=Accessories&itemType=Night%20Masks' },
          { name: 'Wallets', href: '/products?category=Mens&subCategory=Accessories&itemType=Wallets' },
        ]
      },
    ]
  },
  {
    name: 'Women',
    href: '/products?category=Women',
    children: [
      {
        name: 'Textile',
        href: '/products?category=Women&subCategory=Textile',
        items: [
          { name: 'Hoodies', href: '/products?category=Women&subCategory=Textile&itemType=Hoodies' },
          { name: 'Sweatshirts', href: '/products?category=Women&subCategory=Textile&itemType=Sweatshirts' },
          { name: 'Women T-Shirt', href: '/products?category=Women&subCategory=Textile&itemType=Women%20T-Shirt' },
          { name: 'Polo Shirts', href: '/products?category=Women&subCategory=Textile&itemType=Polo%20Shirts' },
          { name: 'Crop Tops', href: '/products?category=Women&subCategory=Textile&itemType=Crop%20Tops' },
          { name: 'Tank Tops', href: '/products?category=Women&subCategory=Textile&itemType=Tank%20Tops' },
          { name: 'Jeans Shirts', href: '/products?category=Women&subCategory=Textile&itemType=Jeans%20Shirts' },
          { name: 'Sweatsuits', href: '/products?category=Women&subCategory=Textile&itemType=Sweatsuits' },
        ]
      },
      {
        name: 'Textile Jackets',
        href: '/products?category=Women&subCategory=Textile%20Jackets',
        items: [
          { name: 'Denim Jackets', href: '/products?category=Women&subCategory=Textile%20Jackets&itemType=Denim%20Jackets' },
          { name: 'Windbreaker Jackets', href: '/products?category=Women&subCategory=Textile%20Jackets&itemType=Windbreaker%20Jackets' },
          { name: 'Bubble Jackets', href: '/products?category=Women&subCategory=Textile%20Jackets&itemType=Bubble%20Jackets' },
          { name: 'Varsity Jackets', href: '/products?category=Women&subCategory=Textile%20Jackets&itemType=Varsity%20Jackets' },
          { name: 'Softshell Jackets', href: '/products?category=Women&subCategory=Textile%20Jackets&itemType=Softshell%20Jackets' },
          { name: 'Fleece Jacket', href: '/products?category=Women&subCategory=Textile%20Jackets&itemType=Fleece%20Jacket' },
        ]
      },
      {
        name: 'Leather Jackets',
        href: '/products?category=Women&subCategory=Leather%20Jackets',
        items: [
          { name: 'Suede Jackets', href: '/products?category=Women&subCategory=Leather%20Jackets&itemType=Suede%20Jackets' },
          { name: 'PU Leather Jackets', href: '/products?category=Women&subCategory=Leather%20Jackets&itemType=PU%20Leather%20Jackets' },
          { name: 'Biker Leather Jackets', href: '/products?category=Women&subCategory=Leather%20Jackets&itemType=Biker%20Leather%20Jackets' },
          { name: 'Shearling Leather Jackets', href: '/products?category=Women&subCategory=Leather%20Jackets&itemType=Shearling%20Leather%20Jackets' },
          { name: 'Women Leather Shirts', href: '/products?category=Women&subCategory=Leather%20Jackets&itemType=Women%20Leather%20Shirts' },
          { name: 'Leather Long Coats', href: '/products?category=Women&subCategory=Leather%20Jackets&itemType=Leather%20Long%20Coats' },
          { name: 'Leather Skirts', href: '/products?category=Women&subCategory=Leather%20Jackets&itemType=Leather%20Skirts' },
          { name: 'Leather Dresses', href: '/products?category=Women&subCategory=Leather%20Jackets&itemType=Leather%20Dresses' },
        ]
      },
      {
        name: 'Pants',
        href: '/products?category=Women&subCategory=Pants',
        items: [
          { name: 'Fashion Pants', href: '/products?category=Women&subCategory=Pants&itemType=Fashion%20Pants' },
        ]
      },
      { name: 'Swimming Diving Suits', href: '/products?category=Women&subCategory=Swimming%20Diving%20Suits' },
    ]
  },
  {
    name: 'Kids',
    href: '/products?category=Kids',
    children: [
      {
        name: 'Textile',
        href: '/products?category=Kids&subCategory=Textile',
        items: [
          { name: 'Hoodies', href: '/products?category=Kids&subCategory=Textile&itemType=Hoodies' },
          { name: 'T-Shirts', href: '/products?category=Kids&subCategory=Textile&itemType=T-Shirts' },
          { name: 'Polo Shirts', href: '/products?category=Kids&subCategory=Textile&itemType=Polo%20Shirts' },
          { name: 'Kids Tracksuits', href: '/products?category=Kids&subCategory=Textile&itemType=Kids%20Tracksuits' },
          { name: 'Sweatshirts', href: '/products?category=Kids&subCategory=Textile&itemType=Sweatshirts' },
        ]
      },
      {
        name: 'Kids Leather And Textile Jackets',
        href: '/products?category=Kids&subCategory=Kids%20Leather%20And%20Textile%20Jackets',
        items: [
          { name: 'Kids Leather & Textile Jackets', href: '/products?category=Kids&subCategory=Kids%20Leather%20And%20Textile%20Jackets&itemType=Kids%20Leather%20%26%20Textile%20Jackets' },
        ]
      }
    ]
  },
  { name: 'Uniforms', href: '/products?category=Other&subCategory=Uniforms' },
  {
    name: 'Gloves',
    href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection',
    children: [
      {
        name: 'Gloves Collection',
        href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection',
        items: [
          { name: 'Cycling Gloves', href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection&itemType=Cycling%20Gloves' },
          { name: 'Driving Gloves', href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection&itemType=Driving%20Gloves' },
          { name: 'Golf Gloves', href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection&itemType=Golf%20Gloves' },
          { name: 'Mechanics Gloves', href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection&itemType=Mechanics%20Gloves' },
          { name: 'TPR Impact Gloves', href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection&itemType=TPR%20Impact%20Gloves' },
          { name: 'Weightlifting Gloves', href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection&itemType=Weightlifting%20Gloves' },
          { name: 'Working Gloves', href: '/products?category=Mens%20%26%20Women&subCategory=Gloves%20Collection&itemType=Working%20Gloves' },
        ]
      },
    ]
  },
  {
    name: 'Accessories',
    href: '/products?category=Mens%20%26%20Women&subCategory=Accessories',
    children: [
      {
        name: 'Accessories',
        href: '/products?category=Mens%20%26%20Women&subCategory=Accessories',
        items: [
          { name: 'Backpack', href: '/products?category=Mens%20%26%20Women&subCategory=Accessories&itemType=Backpack' },
          { name: 'Bracelets', href: '/products?category=Mens%20%26%20Women&subCategory=Accessories&itemType=Bracelets' },
          { name: 'Face Mask', href: '/products?category=Mens%20%26%20Women&subCategory=Accessories&itemType=Face%20Mask' },
          { name: 'Hand Bags', href: '/products?category=Mens%20%26%20Women&subCategory=Accessories&itemType=Hand%20Bags' },
          { name: 'Hats & Caps', href: '/products?category=Mens%20%26%20Women&subCategory=Accessories&itemType=Hats%20%26%20Caps' },
          { name: 'Night Masks', href: '/products?category=Mens%20%26%20Women&subCategory=Accessories&itemType=Night%20Masks' },
          { name: 'Wallets', href: '/products?category=Mens%20%26%20Women&subCategory=Accessories&itemType=Wallets' },
        ]
      },
    ]
  },
  { name: 'Contact Us', href: '/contact' },
]

export function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const { cart, setCartOpen } = useFashionStore()
  const searchRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    )
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true)
        try {
          const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}&limit=5&skip=0`)
          const data = await res.json()
          setSearchResults(data.products || [])
          setShowResults(true)
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Close search results on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setShowResults(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-[100] w-full uppercase tracking-wider bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-28">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="YourStore Logo"
                width={140}
                height={60}
                priority
                className="h-8 sm:h-16 w-auto object-cover"
              />
            </Link>


            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-[11px] font-extrabold text-[#2D4D63] hover:text-[#1D3D53] hover:bg-white/20 rounded-full transition-all duration-300 flex items-center gap-1"
                  >
                    {item.name}
                    {item.children && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${hoveredItem === item.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Dropdown / Mega Menu */}
                  <AnimatePresence>
                    {item.children && hoveredItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 bg-gradient-to-br from-[#A5C9E1]/90 via-[#D8D3F5]/90 to-[#F5E6FF]/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl py-6 px-8 min-w-[700px] z-[110] columns-3 gap-8 space-y-8"
                      >
                        {item.children.map((child) => (
                          <div key={child.name} className="break-inside-avoid-column space-y-4">
                            <Link
                              href={child.href}
                              className="text-[12px] font-black text-[#1D3D53] hover:text-black transition-colors block"
                              onClick={() => setHoveredItem(null)}
                            >
                              {child.name}
                            </Link>
                            {child.items && (
                              <ul className="space-y-2">
                                {child.items.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      className="text-[10px] font-bold text-[#2D4D63] hover:text-black transition-colors block"
                                      onClick={() => setHoveredItem(null)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-3 md:space-x-4">

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-white/10 rounded-full group"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5 text-charcoal group-hover:text-white transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </Button>



              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-charcoal hover:text-black hover:bg-black/5 rounded-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Portal: renders mobile menu directly into document.body, outside sticky header stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 9998 }}
              />
              <motion.nav
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '290px', background: '#fff', zIndex: 9999, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
              >
                {/* Menu Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1D3D53' }}>Menu</span>
                  <button onClick={() => setIsOpen(false)} style={{ padding: '6px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    <X style={{ width: '18px', height: '18px', color: '#6b7280' }} />
                  </button>
                </div>

                {/* Search */}
                <div style={{ padding: '12px 20px', borderBottom: '1px solid #f9fafb' }}>
                  <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: '100%', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '8px', padding: '8px 36px 8px 12px', fontSize: '11px', fontWeight: 700, color: '#1D3D53', outline: 'none', boxSizing: 'border-box' }}
                    />
                    <button type="submit" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Search style={{ width: '13px', height: '13px', color: '#9ca3af' }} />
                    </button>
                  </form>
                </div>

                {/* Nav Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}>
                  {navigationItems.map((item) => (
                    <div key={item.name} style={{ borderBottom: '1px solid #f9fafb' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                        <Link
                          href={item.href}
                          style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1D3D53', flex: 1, textDecoration: 'none' }}
                          onClick={() => { if (!item.children) setIsOpen(false) }}
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <button onClick={() => toggleExpanded(item.name)} style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <ChevronDown style={{ width: '13px', height: '13px', color: '#9ca3af', transform: expandedItems.includes(item.name) ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {item.children && expandedItems.includes(item.name) && (
                          <motion.div
                            key="sub"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', paddingLeft: '12px', borderLeft: '2px solid #f3f4f6', marginBottom: '8px' }}
                          >
                            {item.children.map((child) => (
                              <div key={child.name}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                                  <Link
                                    href={child.href}
                                    style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(29,61,83,0.75)', flex: 1, textDecoration: 'none' }}
                                    onClick={() => { if (!child.items) setIsOpen(false) }}
                                  >
                                    {child.name}
                                  </Link>
                                  {child.items && (
                                    <button onClick={() => toggleExpanded(child.name)} style={{ padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                      <ChevronRight style={{ width: '11px', height: '11px', color: '#d1d5db', transform: expandedItems.includes(child.name) ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                                    </button>
                                  )}
                                </div>
                                {child.items && expandedItems.includes(child.name) && (
                                  <div style={{ paddingLeft: '8px', paddingBottom: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    {child.items.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        style={{ fontSize: '9px', fontWeight: 700, color: '#9ca3af', textDecoration: 'none', padding: '2px 0', display: 'block' }}
                                        onClick={() => setIsOpen(false)}
                                      >
                                        · {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
