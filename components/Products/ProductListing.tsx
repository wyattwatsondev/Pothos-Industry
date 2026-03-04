"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductGrid/ProductCard'
import { Product } from '@/types/product'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm">
            <Skeleton className="aspect-square rounded-[1.5rem] mb-4" />
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-5 w-full mb-3" />
            <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-10 w-full rounded-full" />
        </div>
    )
}

const ITEMS_PER_PAGE = 20

export function ProductListing() {
    const searchParams = useSearchParams()
    const categoryFilter = searchParams.get('category')
    const searchQuery = searchParams.get('search')

    const [dbProducts, setDbProducts] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [skip, setSkip] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const observer = useRef<IntersectionObserver | null>(null)
    const lastProductRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || loadingMore) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setSkip(prevSkip => prevSkip + ITEMS_PER_PAGE)
            }
        })

        if (node) observer.current.observe(node)
    }, [loading, loadingMore, hasMore])

    // Reset and fetch on filter change
    useEffect(() => {
        const resetAndFetch = async () => {
            setLoading(true)
            setSkip(0)
            setHasMore(true)
            try {
                const params = new URLSearchParams()
                if (categoryFilter) params.append('search', categoryFilter)
                if (searchQuery) params.append('search', searchQuery)
                params.append('limit', ITEMS_PER_PAGE.toString())
                params.append('skip', '0')

                const res = await fetch(`/api/products?${params.toString()}`)
                const data = await res.json()

                if (data && data.products) {
                    setDbProducts(data.products)
                    setTotal(data.total || data.products.length)
                    setHasMore(data.products.length < (data.total || data.products.length))
                } else if (Array.isArray(data)) {
                    setDbProducts(data)
                    setTotal(data.length)
                    setHasMore(false)
                }
            } catch (error) {
                console.error('Error fetching products from DB:', error)
            } finally {
                setLoading(false)
            }
        }
        resetAndFetch()
    }, [categoryFilter, searchQuery])

    // Load more when skip changes
    useEffect(() => {
        if (skip === 0) return

        const fetchMore = async () => {
            setLoadingMore(true)
            try {
                const params = new URLSearchParams()
                if (categoryFilter) params.append('search', categoryFilter)
                if (searchQuery) params.append('search', searchQuery)
                params.append('limit', ITEMS_PER_PAGE.toString())
                params.append('skip', skip.toString())

                const res = await fetch(`/api/products?${params.toString()}`)
                const data = await res.json()

                if (data && data.products) {
                    setDbProducts(prev => [...prev, ...data.products])
                    setHasMore(dbProducts.length + data.products.length < (data.total || 0))
                }
            } catch (error) {
                console.error('Error loading more products:', error)
            } finally {
                setLoadingMore(false)
            }
        }
        fetchMore()
    }, [skip, categoryFilter, searchQuery]) // Removed dbProducts.length to fix infinite loop

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
                <p className="text-sm text-gray-500 uppercase font-bold ">
                    Showing <span className="font-bold text-black">{total}</span> products
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select className="text-sm font-bold bg-transparent border-none focus:ring-0 p-0 cursor-pointer">
                        <option>Newest</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {dbProducts.map((product, index) => {
                            if (dbProducts.length === index + 1) {
                                return (
                                    <div ref={lastProductRef} key={`${product.id}-${index}`}>
                                        <ProductCard
                                            id={product.id}
                                            name={product.name}
                                            category={product.category}
                                            price={product.price}
                                            originalPrice={'originalPrice' in product ? product.originalPrice : undefined}
                                            image={product.image}
                                            badge={'badge' in product ? product.badge : undefined}
                                            rating={'rating' in product ? product.rating : undefined}
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <ProductCard
                                        key={`${product.id}-${index}`}
                                        id={product.id}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        originalPrice={'originalPrice' in product ? product.originalPrice : undefined}
                                        image={product.image}
                                        badge={'badge' in product ? product.badge : undefined}
                                        rating={'rating' in product ? product.rating : undefined}
                                    />
                                )
                            }
                        })}
                    </div>

                    {loadingMore && (
                        <div className="flex justify-center py-12">
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">
                                    Loading more products...
                                </p>
                            </div>
                        </div>
                    )}

                    {!hasMore && dbProducts.length > 0 && (
                        <div className="text-center py-12">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                You've reached the end of the collection
                            </p>
                        </div>
                    )}

                    {dbProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No products found for this filter.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
