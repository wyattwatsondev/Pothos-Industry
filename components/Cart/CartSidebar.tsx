"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useFashionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export function CartSidebar() {
    const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useFashionStore()

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-black" />
                                <h2 className="text-lg font-bold">Shopping Cart ({cart.length})</h2>
                            </div>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500">Your cart is empty</p>
                                    <Button onClick={() => setCartOpen(false)} variant="outline">
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 group">
                                        <div className="relative w-24 h-24 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-bold truncate pr-4">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-3">
                                                {item.selectedSize && `Size: ${item.selectedSize}`}
                                                {item.selectedSize && item.selectedColor && ' | '}
                                                {item.selectedColor && `Color: ${item.selectedColor}`}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border rounded-lg bg-gray-50">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                                                        className="p-1 px-2 hover:text-black transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                                        className="p-1 px-2 hover:text-black transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="text-sm font-bold">Rs {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-xl font-bold">Rs {subtotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout.</p>
                                <div className="grid grid-cols-1 gap-3">
                                    <Link href="/cart" onClick={() => setCartOpen(false)}>
                                        <Button className="w-full bg-black hover:bg-gray-800 h-12 text-sm font-bold">
                                            View Cart
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="w-full h-12 text-sm font-bold">
                                        Checkout Now
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
