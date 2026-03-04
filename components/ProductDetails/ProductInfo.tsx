"use client"

import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFashionStore } from '@/lib/store'

interface ProductInfoProps {
    product: {
        id: number
        name: string
        price: number
        originalPrice?: number
        rating: number
        reviews: number
        description: string
        image: string
        category?: string
        colors: { name: string, value: string }[]
        sizes: string[]
    }
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name)
    const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0])
    const { addToCart } = useFashionStore()

    const handleAddToCart = () => {
        addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                originalPrice: product.originalPrice,
                rating: product.rating,
            },
            1,
            selectedSize,
            selectedColor
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">John Lewis ANYDAY</p>
                <h1 className="text-2xl font-bold text-[#1A1A1A] mb-3 leading-tight">{product.name}</h1>

                <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-2">
                        {product.originalPrice && (
                            <span className="text-base text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                        <span className="text-2xl font-bold text-[#1A1A1A]">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-400 text-xs">1,238 Sold</span>
                        <div className="flex items-center gap-0.5 ml-1">
                            <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                            <span className="font-bold text-sm text-[#1A1A1A]">{product.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#1A1A1A]">Description:</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {product.description} <button className="text-black font-bold">See More...</button>
                </p>
            </div>



            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-sm text-[#1A1A1A]">
                            Size: <span className="text-gray-400 font-medium">{product.sizes.includes(selectedSize) ? selectedSize : product.sizes[0]}</span>
                        </h3>
                        <button className="text-gray-400 text-xs font-medium underline">Size Chart</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`min-w-[3rem] h-10 rounded-lg border font-bold text-sm transition-all ${selectedSize === size
                                    ? 'border-black bg-white text-black'
                                    : 'border-gray-50 bg-[#F7F7F7] text-gray-500'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
                <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black hover:bg-black/90 text-white h-12 rounded-xl text-sm font-bold"
                >
                    Add To Cart
                </Button>
                <Button variant="outline" className="flex-1 border-gray-200 hover:bg-gray-50 h-12 rounded-xl text-sm font-bold">
                    Checkout Now
                </Button>
            </div>

            <p className="text-gray-400 text-[10px] underline cursor-pointer">Delivery: TBC</p>
        </div>
    )
}
