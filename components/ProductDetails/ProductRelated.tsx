'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '../ProductGrid/ProductCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

interface Product {
    id: number
    name: string
    category?: string
    price: number
    originalPrice?: number
    image: string
    rating?: number
}

export function ProductRelated() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const res = await fetch('/api/products?limit=10')
                const data = await res.json()
                if (data && data.products && Array.isArray(data.products)) {
                    setProducts(data.products)
                } else if (Array.isArray(data)) {
                    setProducts(data.slice(0, 10))
                }
            } catch (error) {
                console.error('Error fetching related products:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchRelated()
    }, [])

    if (loading) {
        return (
            <div className="py-12 border-t border-gray-100 flex justify-center">
                <div className="animate-pulse text-gray-400">Loading related products...</div>
            </div>
        )
    }

    if (products.length === 0) return null

    return (
        <div className="py-12 border-t border-gray-100 overflow-hidden">
            <div className="flex justify-between items-end mb-8 pl-1">
                <h2 className="text-xl font-bold text-[#1A1A1A]">Related Products</h2>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                        stopOnMouseEnter: true,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {products.map((product) => (
                        <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                image={product.image}
                                rating={product.rating}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
