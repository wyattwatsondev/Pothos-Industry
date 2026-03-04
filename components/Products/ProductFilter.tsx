"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const categories = [
    { id: 'mens-shirts', name: "Men's Shirts" },
    { id: 'womens-shirts', name: "Women's Shirts" },
    { id: 'shoes', name: 'Shoes' },
    { id: 'caps-hats', name: 'Caps & Hats' },
    { id: 'hoodies', name: 'Hoodies' },
    { id: 'jackets', name: 'Jackets' },
    { id: 'trousers-shorts', name: 'Trousers & Shorts' },
    { id: 'bundles-combo', name: 'Bundles & Combo' },
]

export function ProductFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category')

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (!categoryId || currentCategory === categoryId) {
            params.delete('category')
        } else {
            params.set('category', categoryId)
        }
        router.push(`/products?${params.toString()}`)
    }

    return (
        <div className="space-y-6 lg:pr-8 lg:border-r border-gray-100 h-full">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Categories</h3>
                <div className="grid grid-cols-3 gap-x-2 gap-y-2 lg:flex lg:flex-col lg:space-y-2.5">
                    {/* All Option */}
                    <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleCategoryChange('')}>
                        <Checkbox
                            id="all-categories"
                            checked={!currentCategory}
                            onCheckedChange={() => handleCategoryChange('')}
                            className="w-5 h-5 rounded-md border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                        <Label
                            htmlFor="all-categories"
                            className={`text-[10px] sm:text-xs font-medium cursor-pointer transition-colors ${!currentCategory ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}
                        >
                            All
                        </Label>
                    </div>

                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleCategoryChange(category.id)}>
                            <Checkbox
                                id={category.id}
                                checked={currentCategory === category.id}
                                onCheckedChange={() => handleCategoryChange(category.id)}
                                className="w-5 h-5 rounded-md border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                            />
                            <Label
                                htmlFor={category.id}
                                className={`text-[10px] sm:text-xs font-medium cursor-pointer transition-colors ${currentCategory === category.id ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}
                            >
                                {category.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
