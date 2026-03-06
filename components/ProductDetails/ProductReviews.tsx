'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Star, MessageSquare, Plus, X, Send, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface Review {
    id: number
    name: string
    role?: string
    content: string
    rating: number
    image?: string
    createdAt: string
}

interface ProductReviewsProps {
    productId: number
}

const dummyReviews = [
    {
        id: -1,
        name: "James Anderson",
        role: "Verified Buyer",
        content: "Outstanding quality! The leather is supple and the stitching is perfect. Highly recommended for anyone looking for premium gear.",
        rating: 5,
        image: "/Photos Industry/1.jpeg",
        createdAt: new Date().toISOString()
    },
    {
        id: -2,
        name: "Sarah Jenkins",
        role: "Fashion Designer",
        content: "The fit is exactly as described. I love the attention to detail on the zippers and lining. Pothos Industry never disappoints!",
        rating: 5,
        image: "/Photos Industry/2.jpg",
        createdAt: new Date().toISOString()
    },
    {
        id: -3,
        name: "Michael Chen",
        role: "Outdoor Enthusiast",
        content: "Durable and stylish. I've been using this for months and it still looks brand new. Great value for the price.",
        rating: 4,
        image: "/Photos Industry/3.jpg",
        createdAt: new Date().toISOString()
    },
    {
        id: -4,
        name: "Emily White",
        role: "Verified Buyer",
        content: "Beautifully packaged and fast shipping. The product surpassed my expectations. I will definitely be ordering again soon!",
        rating: 5,
        image: "/Photos Industry/4.jpg",
        createdAt: new Date().toISOString()
    },
    {
        id: -5,
        name: "Hassan Raza",
        role: "Founder of Textile Hub",
        content: "Excellent quality and great attention to detail. The stitching and finishing are top-notch, and the delivery was right on time. Highly recommended for anyone looking for reliable garment manufacturing.",
        rating: 5,
        image: "/Photos Industry/4.jpg",
        createdAt: new Date().toISOString()
    }
]

export function ProductReviews({ productId }: ProductReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newReview, setNewReview] = useState({ name: '', content: '', rating: 5, image: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploading, setUploading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/products/${productId}/reviews`)
                const data = await res.json()
                setReviews([...dummyReviews, ...data])
            } catch (error) {
                console.error('Error fetching reviews:', error)
                setReviews(dummyReviews)
            }
        }
        fetchReviews()
    }, [productId])

    // Auto-scroll logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
                if (scrollLeft + clientWidth >= scrollWidth - 5) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
                } else {
                    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
                }
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [reviews])

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            if (data.url) {
                setNewReview(prev => ({ ...prev, image: data.url }))
            }
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (id < 0) { // Don't try to delete dummy reviews from DB
            setReviews(prev => prev.filter(r => r.id !== id))
            return
        }

        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setReviews(prev => prev.filter(r => r.id !== id))
            }
        } catch (error) {
            console.error('Error deleting review:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await fetch(`/api/products/${productId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            })
            if (res.ok) {
                const addedReview = await res.json()
                setReviews(prev => [...prev, addedReview])
                setIsModalOpen(false)
                setNewReview({ name: '', content: '', rating: 5, image: '' })
            }
        } catch (error) {
            console.error('Error submitting review:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="review-section" className="mt-2 pt-6 pb-2">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-charcoal flex items-center gap-2 sm:gap-3">
                        <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        Customer Reviews
                    </h2>
                    <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[8px] sm:text-[10px]">What our global clients say about this product</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 mr-4">
                        <button
                            onClick={() => handleScroll('left')}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleScroll('right')}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-charcoal hover:bg-primary text-white font-black uppercase tracking-widest px-4 sm:px-6 h-9 sm:h-11 text-[9px] sm:text-[10px] rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        Add Your Review
                    </Button>
                </div>
            </div>

            {/* Scrolling Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-8 snap-x no-scrollbar scroll-smooth"
            >
                {reviews.map((review, i) => (
                    <motion.div
                        key={review.id + i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex-shrink-0 w-[calc(20%-1rem)] min-w-[220px] snap-center bg-white p-6 rounded-[2rem] border-2 border-gray-200 shadow-sm hover:border-primary/20 hover:shadow-xl transition-all duration-500 group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm transition-transform duration-500 group-hover:scale-110">
                                <Image
                                    src={review.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`}
                                    alt={review.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-black text-charcoal text-[10px] uppercase tracking-tighter">{review.name}</h4>
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{review.role || "Verified Buyer"}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(review.id)}
                                className="ml-auto p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                title="Delete Review"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="flex gap-0.5 mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-gray-200 fill-gray-200'}`} />
                            ))}
                        </div>

                        <p className="text-gray-500 text-[11px] leading-relaxed font-medium italic line-clamp-4">
                            "{review.content}"
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Review Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-[380px] rounded-[2rem] p-5 sm:p-6 relative z-10 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto no-scrollbar"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-black uppercase tracking-tighter text-charcoal">Add Review</h3>
                                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mt-1">Share your feedback with us</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-3">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={newReview.name}
                                        onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                                        className="w-full h-11 bg-gray-50 border-none rounded-full px-5 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-xs"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-3">Profile Photo (Optional)</label>
                                    <div className="flex items-center gap-4 ml-3 mt-1">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                                        >
                                            <Plus className="w-3 h-3" />
                                            {uploading ? 'Uploading...' : 'Choose File'}
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        {newReview.image && (
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                                <Image src={newReview.image} alt="Preview" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setNewReview(prev => ({ ...prev, image: '' }))}
                                                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-3">Rating</label>
                                    <div className="flex gap-1.5 ml-3">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className="transition-transform active:scale-90"
                                            >
                                                <Star className={`w-5 h-5 ${star <= newReview.rating ? 'fill-primary text-primary' : 'text-gray-200'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-3">Your Review</label>
                                    <textarea
                                        required
                                        value={newReview.content}
                                        onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                                        className="w-full h-24 bg-gray-50 border-none rounded-[1.2rem] p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-xs resize-none"
                                        placeholder="How was the quality?"
                                    />
                                </div>

                                <Button
                                    disabled={isSubmitting}
                                    className="w-full h-10 sm:h-12 bg-charcoal hover:bg-primary text-white rounded-full font-black uppercase tracking-widest text-[9px] sm:text-[10px] transition-all shadow-lg flex items-center justify-center gap-2 sm:gap-3"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Post Review'}
                                    <Send className="w-3.5 h-3.5" />
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}
