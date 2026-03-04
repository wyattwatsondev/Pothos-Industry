'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Menu, X, Loader2, Facebook, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { useFashionStore } from '@/lib/store'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: "Men's shirts", href: '/products?category=mens-shirts' },
  { name: "Women's shirts", href: '/products?category=womens-shirts' },
  { name: 'Shoes', href: '/products?category=shoes' },
  { name: 'Caps & Hats', href: '/products?category=caps-hats' },
  { name: 'Hoodies', href: '/products?category=hoodies' },
  { name: 'Jackets', href: '/products?category=jackets' },
]

export function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { cart, setCartOpen } = useFashionStore()
  const searchRef = useRef<HTMLDivElement>(null)

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setShowResults(false)
      setIsOpen(false)
    }
  }

  return (
    <header className="absolute top-0 left-0 z-50 w-full uppercase tracking-wider bg-transparent">
      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-28">
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
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-[11px] font-extrabold text-[#2D4D63] hover:text-[#1D3D53] hover:bg-white/20 rounded-full transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 md:space-x-6">
            {/* Search - Desktop only */}
            <div className="hidden sm:flex items-center bg-secondary rounded-full px-5 py-2.5 max-w-xs relative border border-black/5" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && setShowResults(true)}
                  className="bg-transparent outline-none text-[12px] font-bold flex-1 text-gray-800 placeholder-gray-500"
                />
                <button type="submit">
                  {isSearching ? <Loader2 className="w-4 h-4 text-gray-400 ml-2 animate-spin" /> : <Search className="w-4 h-4 text-gray-400 ml-2" />}
                </button>
              </form>

              {/* Search Results Dropdown */}
              {showResults && (searchResults.length > 0 || isSearching) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden py-2 min-w-[280px]">
                  {isSearching && searchResults.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => {
                            setShowResults(false)
                            setSearchQuery('')
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative w-10 h-10 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-black truncate uppercase tracking-tight">{product.name}</p>
                            <p className="text-[10px] text-primary font-bold uppercase">{product.category}</p>
                          </div>
                          <p className="text-[11px] font-bold">${product.price}</p>
                        </Link>
                      ))}
                      <Link
                        href={`/products?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setShowResults(false)}
                        className="block px-4 py-2 text-center text-[10px] font-bold text-gray-500 hover:text-black border-t border-gray-100 mt-1 uppercase"
                      >
                        See all results
                      </Link>
                    </>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">No products found</div>
                  )}
                </div>
              )}
            </div>

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

        {/* Mobile Navigation overlay */}
        {isOpen && (
          <nav className="md:hidden fixed inset-0 top-0 bg-gradient-to-br from-[#A5C9E1] via-[#D8D3F5] to-[#F5E6FF] z-50 flex flex-col pt-24 pb-10 px-10 overflow-y-auto transition-all duration-500 ease-in-out">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-8 right-6 text-charcoal hover:text-black rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-7 h-7 font-black" />
            </Button>
            <div className="flex flex-col space-y-5">
              {navigationItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block text-lg font-black text-[#1D3D53] hover:text-[#065F46] transition-colors uppercase tracking-[0.15em]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4 border-t border-black/5"
            >
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-white/50 backdrop-blur-sm rounded-full px-5 py-2.5 border border-black/5 w-full">
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-xs font-bold flex-1 text-[#1D3D53] placeholder-[#2D4D63]/30"
                />
                <button type="submit">
                  <Search className="w-4 h-4 text-gray-400 ml-2" />
                </button>
              </form>
            </motion.div>
          </nav>
        )}
      </div>
    </header>
  )
}
