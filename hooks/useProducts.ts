'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'

// Update cache key so any old empty cache is automatically invalidated
const CACHE_KEY = 'fashion_products_cache_v2'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

interface CacheEntry {
  data: Product[]
  timestamp: number
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check sessionStorage cache first
        const cached = sessionStorage.getItem(CACHE_KEY)
        if (cached) {
          const entry: CacheEntry = JSON.parse(cached)
          const isValid = Date.now() - entry.timestamp < CACHE_TTL
          if (isValid && entry.data.length > 0) {
            setProducts(entry.data)
            setLoading(false)
            return
          }
        }

        // Fetch from API if no cache or cache expired
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        if (data && data.products) {
          const entry: CacheEntry = { data: data.products, timestamp: Date.now() }
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry))
          setProducts(data.products)
        } else if (Array.isArray(data)) {
          setProducts(data)
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter by one or more category IDs (exact match as stored in DB)
  const byCategory = (categories: string[]) =>
    products.filter((p) => p.category && categories.includes(p.category))

  // New Arrivals: latest 8 from all products (API returns newest first)
  const newArrivals = products.slice(0, 8)

  // Best Sellers: next 8 products
  const bestSellers = products.slice(8, 16)

  // Shirts: DB category ids from ProductFilter
  const shirts = byCategory(['mens-shirts', 'womens-shirts', 'mens-tshirt', 'womens-tshirt', 'shirts'])

  // Accessories: caps, hoodies, jackets, shoes etc
  const accessories = byCategory(['caps-hats', 'hoodies', 'jackets', 'shoes', 'cap', 'shades', 'jackets-hoodie'])

  // Bundles
  const bundlesFromDB = byCategory(['bundles-combo', 'bundle', 'bundles'])
  // Fallback: show first 4 products if no dedicated bundle category
  const bundles = bundlesFromDB.length > 0 ? bundlesFromDB : products.slice(0, 4)

  return {
    products,
    loading,
    error,
    newArrivals,
    bestSellers,
    shirts,
    accessories,
    bundles,
    byCategory,
  }
}
