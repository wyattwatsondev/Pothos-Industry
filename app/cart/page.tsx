"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { useFashionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart } = useFashionStore()

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : 15
    const total = subtotal + shipping

    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navigation />

            <main className="bg-gray-50/50 min-h-[calc(100vh-160px)]">
                <div className="container mx-auto px-4 max-w-6xl py-12">
                    <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

                    {cart.length === 0 ? (
                        <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-gray-100">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-10 h-10 text-gray-300" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Cart feels a bit light!</h2>
                            <p className="text-gray-500 mb-8">Your shopping cart is currently empty. Explore our latest collections and find something you love.</p>
                            <Link href="/products">
                                <Button className="bg-black text-white px-8 h-12 rounded-full font-bold">
                                    Start Shopping
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Product List */}
                            <div className="lg:col-span-8 space-y-6">
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="space-y-8">
                                        {cart.map((item) => (
                                            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                                                <div className="relative w-full sm:w-32 aspect-square rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0">
                                                    <Image src={item.image} alt={item.name} fill className="object-contain p-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{item.name}</h3>
                                                            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold text-xs">
                                                                {item.category?.replace('-', ' ')}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                                            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-wrap gap-4 mb-6 mt-2">
                                                        {item.selectedSize && (
                                                            <div className="bg-gray-100 px-3 py-1 rounded-md text-xs font-bold text-gray-600">
                                                                Size: {item.selectedSize}
                                                            </div>
                                                        )}
                                                        {item.selectedColor && (
                                                            <div className="bg-gray-100 px-3 py-1 rounded-md text-xs font-bold text-gray-600 flex items-center gap-2">
                                                                Color: {item.selectedColor}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between mt-auto">
                                                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                                                                className="p-2 px-4 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-12 text-center font-bold">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                                                className="p-2 px-4 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xl font-bold">Rs {(item.price * item.quantity).toFixed(2)}</p>
                                                            <p className="text-xs text-gray-400">Rs {item.price.toFixed(2)} / unit</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Link href="/products" className="inline-flex items-center text-sm font-bold hover:text-gray-600 transition-colors gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Continue Shopping
                                </Link>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-24">
                                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-gray-500">
                                            <span>Subtotal</span>
                                            <span className="text-black font-bold">Rs {subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-500">
                                            <span>Shipping Fee</span>
                                            <span className="text-black font-bold">
                                                {shipping === 0 ? <span className="text-green-500">Free</span> : `Rs ${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-gray-500">
                                            <span>Estimated Tax</span>
                                            <span className="text-black font-bold">Rs 0.00</span>
                                        </div>
                                        <div className="h-px bg-gray-100 my-2" />
                                        <div className="flex justify-between text-xl font-bold">
                                            <span>Total</span>
                                            <span>Rs {total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Link href="/checkout">
                                        <Button className="w-full bg-black hover:bg-gray-800 h-14 rounded-2xl text-lg font-bold mb-4">
                                            Proceed to Checkout
                                        </Button>
                                    </Link>


                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    )
}
