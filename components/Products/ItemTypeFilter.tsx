"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { X } from 'lucide-react'

// Full item type map: category -> subCategory -> itemTypes
const ITEM_TYPES: Record<string, Record<string, string[]>> = {
    "Mens": {
        "Textile": ["Denim Shirts", "Sweatshirts", "Hoodies", "Joggers & Chinos", "T Shirts", "Tank Tops And Singlets", "Track Suits", "Polo Shirts", "Shorts"],
        "Textile Jackets": ["Denim Jackets", "Windbreaker Jackets", "Bubble-Puffer Jackets", "Varsity Jackets", "Softshell Jackets", "Fleece Jackets"],
        "Leather Jackets": ["Suede Leather Jackets", "Shearling Leather Jackets", "Leather Fashion Jackets", "PU Leather Fashion Jackets", "Motorbike Leather Jacket", "Motorbike Leather Suit", "Leather Blazers", "Leather Long Coats"],
        "Pant": ["Leather Pants"],
        "Swimming Diving Suit": [],
    },
    "Women": {
        "Textile": ["Hoodies", "Sweatshirts", "Women T-Shirt", "Polo Shirts", "Crop Tops", "Tank Tops", "Jeans Shirts", "Sweatsuits"],
        "Textile Jackets": ["Denim Jackets", "Windbreaker Jackets", "Bubble Jackets", "Varsity Jackets", "Softshell Jackets", "Fleece Jacket"],
        "Leather Jackets": ["Suede Jackets", "PU Leather Jackets", "Biker Leather Jackets", "Shearling Leather Jackets", "Women Leather Shirts", "Leather Long Coats", "Leather Skirts", "Leather Dresses"],
        "Pants": ["Fashion Pants"],
        "Swimming Diving Suits": [],
    },
    "Kids": {
        "Textile": ["Hoodies", "T-Shirts", "Polo Shirts", "Kids Tracksuits", "Sweatshirts"],
        "Kids Leather And Textile Jackets": ["Kids Leather & Textile Jackets"],
    },
    "Mens & Women": {
        "Gloves Collection": ["Cycling Gloves", "Driving Gloves", "Golf Gloves", "Mechanics Gloves", "TPR Impact Gloves", "Weightlifting Gloves", "Working Gloves"],
        "Accessories": ["Backpack", "Bracelets", "Face Mask", "Hand Bags", "Hats & Caps", "Night Masks", "Wallets"],
    },
    "Other": {
        "Uniforms": [],
    },
}

export function ItemTypeFilter() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const category = searchParams.get('category') || ''
    const subCategory = searchParams.get('subCategory') || ''
    const currentItemType = searchParams.get('itemType') || ''

    // Get the item types for current selection
    const itemTypes = ITEM_TYPES[category]?.[subCategory] ?? []

    // Don't render if no sub-category selected or no item types
    if (!subCategory || itemTypes.length === 0) return null

    const buildUrl = (itemType: string) => {
        const params = new URLSearchParams()
        if (category) params.set('category', category)
        if (subCategory) params.set('subCategory', subCategory)
        if (itemType && currentItemType !== itemType) params.set('itemType', itemType)
        return `/products?${params.toString()}`
    }

    const clearItemType = () => {
        const params = new URLSearchParams()
        if (category) params.set('category', category)
        if (subCategory) params.set('subCategory', subCategory)
        router.push(`/products?${params.toString()}`)
    }

    return (
        <div className="w-full border-b border-gray-100 pb-4 mb-6">
            {/* Breadcrumb label */}
            <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    {category}{subCategory ? ` › ${subCategory}` : ''}
                </span>
                {currentItemType && (
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        › {currentItemType}
                    </span>
                )}
            </div>

            {/* Grid-like row for chips (wraps naturally) */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-1">
                {/* All chip */}
                <Link
                    href={buildUrl('')}
                    onClick={currentItemType ? undefined : (e) => e.preventDefault()}
                    className={`inline-flex items-center justify-center whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border transition-all duration-200 ${!currentItemType
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                        }`}
                >
                    All
                </Link>

                {itemTypes.map((type) => (
                    <Link
                        key={type}
                        href={buildUrl(type)}
                        className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border transition-all duration-200 ${currentItemType === type
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                            }`}
                    >
                        {type}
                        {currentItemType === type && (
                            <span
                                onClick={(e) => { e.preventDefault(); clearItemType(); }}
                                className="ml-0.5 text-gray-300 hover:text-white cursor-pointer"
                            >
                                <X size={10} />
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}
