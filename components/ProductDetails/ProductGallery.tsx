"use client"

import React from 'react'
import Image from 'next/image'
import { Share2, Heart } from 'lucide-react'

interface ProductGalleryProps {
    images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const displayImage = images[0] || "/placeholder.svg"

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-[#F7F7F7] group">
                <Image
                    src={displayImage}
                    alt="Product Image"
                    fill
                    className="object-contain p-6 mix-blend-multiply"
                    priority
                />

                {/* Top Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors border border-gray-100">
                        <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors border border-gray-100">
                        <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}
