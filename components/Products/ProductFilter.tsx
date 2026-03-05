"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const filterCategories = [
    {
        id: 'Mens',
        name: 'Mens',
        subCategories: [
            { id: 'Textile', name: 'Textile' },
            { id: 'Textile Jackets', name: 'Textile Jackets' },
            { id: 'Leather Jackets', name: 'Leather Jackets' },
            { id: 'Pant', name: 'Leather Pants' },
            { id: 'Swimming Diving Suit', name: 'Swimming Diving Suit' },
        ]
    },
    {
        id: 'Women',
        name: 'Women',
        subCategories: [
            { id: 'Textile', name: 'Textile' },
            { id: 'Textile Jackets', name: 'Textile Jackets' },
            { id: 'Leather Jackets', name: 'Leather Jackets' },
            { id: 'Pants', name: 'Pants' },
            { id: 'Swimming Diving Suits', name: 'Swimming Diving Suits' },
        ]
    },
    {
        id: 'Kids',
        name: 'Kids',
        subCategories: [
            { id: 'Textile', name: 'Textile' },
            { id: 'Kids Leather And Textile Jackets', name: 'Leather & Textile Jackets' },
        ]
    },
    {
        id: 'Mens & Women',
        name: 'Gloves & Accessories',
        subCategories: [
            { id: 'Gloves Collection', name: 'Gloves Collection' },
            { id: 'Accessories', name: 'Accessories' },
        ]
    },
    {
        id: 'Other',
        name: 'Uniforms',
        subCategories: [
            { id: 'Uniforms', name: 'Uniforms' },
        ]
    },
]

export function ProductFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category')
    const currentSubCategory = searchParams.get('subCategory')

    const handleCategoryChange = (categoryId: string, subCategoryId?: string) => {
        const params = new URLSearchParams()
        if (categoryId) {
            params.set('category', categoryId)
            if (subCategoryId) params.set('subCategory', subCategoryId)
        }
        router.push(`/products?${params.toString()}`)
    }

    const isActive = (catId: string, subId?: string) => {
        if (subId) return currentCategory === catId && currentSubCategory === subId
        return currentCategory === catId
    }

    return (
        <div className="space-y-5 lg:pr-8 lg:border-r border-gray-100 h-full">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Categories</h3>

            {/* All */}
            <div
                className="flex items-center space-x-3 group cursor-pointer"
                onClick={() => handleCategoryChange('')}
            >
                <Checkbox
                    id="all-categories"
                    checked={!currentCategory}
                    onCheckedChange={() => handleCategoryChange('')}
                    className="w-4 h-4 rounded-md border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label
                    htmlFor="all-categories"
                    className={`text-xs cursor-pointer transition-colors ${!currentCategory ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}
                >
                    All Products
                </Label>
            </div>

            {/* Category groups */}
            <div className="space-y-4">
                {filterCategories.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                        {/* Category header - clickable */}
                        <div
                            className="flex items-center space-x-3 group cursor-pointer"
                            onClick={() => handleCategoryChange(cat.id)}
                        >
                            <Checkbox
                                id={cat.id}
                                checked={isActive(cat.id) && !currentSubCategory}
                                onCheckedChange={() => handleCategoryChange(cat.id)}
                                className="w-4 h-4 rounded-md border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                            />
                            <Label
                                htmlFor={cat.id}
                                className={`text-xs font-bold cursor-pointer uppercase tracking-wide transition-colors ${isActive(cat.id) && !currentSubCategory ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}
                            >
                                {cat.name}
                            </Label>
                        </div>

                        {/* Sub-categories (always visible, indented) */}
                        <div className="pl-7 space-y-1.5 border-l-2 border-gray-100">
                            {cat.subCategories.map((sub) => (
                                <div
                                    key={sub.id}
                                    className="flex items-center space-x-2 group cursor-pointer"
                                    onClick={() => handleCategoryChange(cat.id, sub.id)}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors flex-shrink-0 ${isActive(cat.id, sub.id) ? 'bg-black' : 'bg-gray-300 group-hover:bg-gray-600'}`} />
                                    <span
                                        className={`text-[11px] cursor-pointer transition-colors ${isActive(cat.id, sub.id) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}
                                    >
                                        {sub.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
