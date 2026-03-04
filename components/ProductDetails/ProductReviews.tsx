"use client"

import React from 'react'
import Image from 'next/image'
import { Star, ThumbsUp, ThumbsDown, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export function ProductReviews() {
    const reviews = [
        {
            id: 1,
            author: "Darrell Steward",
            rating: 5,
            date: "July 2, 2020 08:23 PM",
            content: "This is amazing product I have.",
            avatar: "/ProductImages/2.jpg",
            likes: 128
        },
        {
            id: 2,
            author: "Darlene Robertson",
            rating: 5,
            date: "July 2, 2020 1:04 PM",
            content: "This is amazing product I have.",
            avatar: "/ProductImages/9.jpg",
            likes: 82
        }
    ]

    return (
        <div className="space-y-8 py-10 border-t border-gray-100">
            <h2 className="text-xl font-bold text-[#1A1A1A]">Product Reviews</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Review Summary */}
                <div className="lg:col-span-1 border rounded-[1.5rem] p-6 h-fit bg-gray-50/50">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full border-2 border-orange-400 flex items-center justify-center bg-white">
                            <span className="text-xl font-bold text-[#1A1A1A]">4.5</span>
                        </div>
                        <div>
                            <div className="flex gap-0.5 mb-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`w-3 h-3 ${s <= 4 ? 'fill-orange-400 text-orange-400' : 'text-gray-200'}`} />
                                ))}
                            </div>
                            <p className="text-gray-400 text-[11px]">from 1.25k reviews</p>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-3">
                                <span className="w-3 text-[11px] font-bold text-gray-500">{rating}</span>
                                <Star className="w-2.5 h-2.5 fill-orange-400 text-orange-400" />
                                <Progress value={rating === 5 ? 80 : rating === 4 ? 40 : rating === 3 ? 15 : 0} className="h-1 flex-1 bg-gray-100" />
                                <span className="w-8 text-right text-[11px] text-gray-400">
                                    {rating === 5 ? '2023' : rating === 4 ? '38' : rating === 3 ? '4' : '0'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-6">
                        <div>
                            <h4 className="font-bold text-sm mb-3">Reviews Filter</h4>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <label key={r} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-black" />
                                        <div className="flex items-center gap-0.5">
                                            <Star className="w-2.5 h-2.5 fill-orange-400 text-orange-400" />
                                            <span className="text-xs text-gray-500 group-hover:text-black transition-colors">{r} Stars</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review List */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex gap-2 border-b border-gray-100 pb-4">
                        <button className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold">All Reviews</button>
                        <button className="bg-gray-100 text-gray-400 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 hover:text-gray-600 transition-colors">Media</button>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {reviews.map((review) => (
                            <div key={review.id} className="py-6 first:pt-0">
                                <div className="flex gap-0.5 mb-1.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                                <h4 className="font-bold text-base mb-1 text-[#1A1A1A]">{review.content}</h4>
                                <p className="text-gray-400 text-[11px] mb-4">{review.date}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                                            <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                                        </div>
                                        <span className="font-bold text-sm text-[#1A1A1A]">{review.author}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex items-center gap-1.5 text-xs text-gray-400 border rounded-full px-3 py-1 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                                            <ThumbsUp className="w-3.5 h-3.5" /> {review.likes}
                                        </button>
                                        <button className="flex items-center justify-center text-gray-400 border rounded-full w-8 h-8 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                                            <ThumbsDown className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
