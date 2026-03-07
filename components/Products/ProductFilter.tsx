"use client"

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight, ChevronDown, Filter } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { CATEGORY_HIERARCHY } from '@/lib/constants'

export function ProductFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategory = searchParams.get('category')
    const currentSubCategory = searchParams.get('subCategory')
    const currentItemType = searchParams.get('itemType')

    const [expandedCategories, setExpandedCategories] = useState<string[]>(currentCategory ? [currentCategory] : [])
    const [expandedSubCategories, setExpandedSubCategories] = useState<string[]>(currentSubCategory ? [currentSubCategory] : [])

    const toggleCategory = (cat: string) => {
        setExpandedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }

    const toggleSubCategory = (sub: string) => {
        setExpandedSubCategories(prev =>
            prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
        )
    }

    const handleFilterChange = (cat: string = '', sub: string = '', item: string = '') => {
        const params = new URLSearchParams()
        if (cat) params.set('category', cat)
        if (sub) params.set('subCategory', sub)
        if (item) params.set('itemType', item)
        router.push(`/products?${params.toString()}`)
    }

    const isActive = (cat: string, sub: string = '', item: string = '') => {
        if (item) return currentCategory === cat && currentSubCategory === sub && currentItemType === item
        if (sub) return currentCategory === cat && currentSubCategory === sub && !currentItemType
        return currentCategory === cat && !currentSubCategory && !currentItemType
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Filter className="w-4 h-4" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Refine Results</h3>
            </div>

            {/* All Products */}
            <div
                className="flex items-center space-x-3 group cursor-pointer py-1"
                onClick={() => handleFilterChange()}
            >
                <div className={`w-4 h-4 rounded-md border-2 transition-all flex items-center justify-center ${!currentCategory ? 'bg-black border-black text-white' : 'border-gray-200 group-hover:border-black'}`}>
                    {!currentCategory && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <Label className={`text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors ${!currentCategory ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
                    All Collection
                </Label>
            </div>

            <div className="space-y-1">
                {Object.entries(CATEGORY_HIERARCHY).map(([catName, subCats]) => (
                    <div key={catName} className="space-y-1">
                        {/* Category Row */}
                        <div className="flex items-center group">
                            <div
                                onClick={() => handleFilterChange(catName)}
                                className="flex flex-1 items-center space-x-3 cursor-pointer py-2"
                            >
                                <div className={`w-4 h-4 rounded-md border-2 transition-all flex items-center justify-center ${isActive(catName) ? 'bg-black border-black' : 'border-gray-200 group-hover:border-black'}`}>
                                    {isActive(catName) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                                <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isActive(catName) ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>
                                    {catName}
                                </span>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleCategory(catName); }}
                                className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {expandedCategories.includes(catName) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                            </button>
                        </div>

                        {/* Sub-categories */}
                        {expandedCategories.includes(catName) && (
                            <div className="pl-4 ml-2 border-l border-gray-100 space-y-1 mt-1">
                                {Object.entries(subCats).map(([subName, items]) => (
                                    <div key={subName} className="space-y-1">
                                        <div className="flex items-center group">
                                            <div
                                                onClick={() => handleFilterChange(catName, subName)}
                                                className="flex flex-1 items-center space-x-3 cursor-pointer py-1.5"
                                            >
                                                <div className={`w-3 h-3 rounded-full border-2 transition-all flex items-center justify-center ${isActive(catName, subName) ? 'bg-black border-black' : 'border-gray-200 group-hover:border-black'}`}>
                                                    {isActive(catName, subName) && <div className="w-1 h-1 bg-white rounded-full" />}
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isActive(catName, subName) ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
                                                    {subName}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleSubCategory(subName); }}
                                                className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                                            >
                                                {expandedSubCategories.includes(subName) ? <ChevronDown className="w-3 h-3 text-gray-400" /> : <ChevronRight className="w-3 h-3 text-gray-400" />}
                                            </button>
                                        </div>

                                        {/* Item Types */}
                                        {expandedSubCategories.includes(subName) && (
                                            <div className="pl-4 ml-1.5 border-l border-gray-100 space-y-1 mt-1 mb-2">
                                                {items.map(itemName => (
                                                    <div
                                                        key={itemName}
                                                        onClick={() => handleFilterChange(catName, subName, itemName)}
                                                        className="flex items-center space-x-2 cursor-pointer py-1 group"
                                                    >
                                                        <div className={`w-1 h-1 rounded-full transition-colors ${isActive(catName, subName, itemName) ? 'bg-black scale-150' : 'bg-gray-300 group-hover:bg-gray-500'}`} />
                                                        <span className={`text-[10px] font-semibold uppercase tracking-tight transition-colors ${isActive(catName, subName, itemName) ? 'text-black font-black' : 'text-gray-400 group-hover:text-black'}`}>
                                                            {itemName}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
