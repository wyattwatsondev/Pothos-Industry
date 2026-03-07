"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    Search, RotateCcw, Lock, Tag, HelpCircle,
    ChevronDown, Zap, ChevronRight, Info,
    ShieldCheck, CheckCircle2, Loader2, ArrowLeft,
    CreditCard, Truck, ExternalLink
} from 'lucide-react'
import { useFashionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer/Footer'

export default function CheckoutPage() {
    const { cart, clearCart } = useFashionStore()
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        country: 'Pakistan',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        phone: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping = subtotal > 50 ? 0 : 15
    const total = subtotal + shipping

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (cart.length === 0) {
            alert("Your cart is empty!")
            return
        }

        setIsSubmitting(true)
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    total,
                    items: cart,
                }),
            })

            if (response.ok) {
                setShowSuccess(true)
                clearCart()
            } else {
                const errorData = await response.json()
                alert(`Error: ${errorData.error || 'Failed to place order'}`)
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred while placing your order.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-black selection:text-white">
            {/* Success Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/90 backdrop-blur-xl p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-12 max-w-lg w-full shadow-[0_50px_100px_rgba(0,0,0,0.1)] text-center border border-gray-100"
                    >
                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-[#E8F5E9] mb-10">
                            <CheckCircle2 className="h-14 w-14 text-[#2E7D32]" />
                        </div>
                        <h3 className="text-4xl font-extrabold text-black mb-6 tracking-tight">Order Confirmed</h3>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-xs mx-auto">
                            Your premium selection is now being prepared. We'll notify you as soon as it's on its way.
                        </p>
                        <Link href="/" className="block">
                            <Button className="w-full bg-black hover:bg-[#333] text-white font-bold h-12 rounded-xl transition-all text-xs uppercase tracking-[0.2em]">
                                Explore More
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            )}

            {/* Top Bar for Mobile Branding */}
            <div className="lg:hidden bg-white border-b border-gray-100 py-6 px-4 text-center">
                <Link href="/">
                    <Image src="/logo.png" alt="POTHOS Logo" width={120} height={50} className="mx-auto object-contain" priority />
                </Link>
            </div>

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_500px] min-h-screen">
                {/* Left Section: Details */}
                <div className="bg-white p-6 md:p-8 lg:p-12 order-2 lg:order-1">
                    {/* PC Branding */}
                    <div className="hidden lg:block mb-8">
                        <Link href="/">
                            <Image src="/logo.png" alt="POTHOS Logo" width={160} height={60} className="object-contain" priority />
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto lg:mx-0">
                        {/* Navigation Steps */}


                        <div className="grid grid-cols-1 gap-8">
                            {/* Account Section */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Contact</h2>

                                </div>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Email (for order updates)"
                                        className="w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB] group-hover:bg-[#F2F2F7] transition-all"
                                    />
                                    <div className="mt-4 flex items-center gap-3">
                                        <input type="checkbox" id="newsletter" defaultChecked className="w-5 h-5 rounded-md accent-black" />
                                        <label htmlFor="newsletter" className="text-xs font-semibold text-gray-500 cursor-pointer">Email me about new drops and exclusive offers</label>
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Section */}
                            <section>
                                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-6">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2 relative">
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB] appearance-none"
                                        >
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="USA">United States</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="UAE">United Arab Emirates</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <input type="text" name="firstName" required placeholder="First Name" onChange={handleInputChange} className="w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB]" />
                                    <input type="text" name="lastName" required placeholder="Last Name" onChange={handleInputChange} className="w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB]" />
                                    <input type="text" name="address" required placeholder="Street Address" className="col-span-2 w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB]" />
                                    <input type="text" name="apartment" placeholder="Apartment, suite, etc. (Optional)" className="col-span-2 w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB]" />
                                    <input type="text" name="city" required placeholder="City" className="w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB]" />
                                    <input type="text" name="postalCode" required placeholder="Postal Code" className="w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB]" />
                                    <input type="tel" name="phone" required placeholder="Phone (for delivery contact)" className="col-span-2 w-full h-12 px-5 rounded-xl border-2 border-[#F2F2F7] focus:border-black outline-none text-sm font-semibold bg-[#F9F9FB]" />
                                </div>
                            </section>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 md:h-16 bg-black hover:bg-[#333] text-white rounded-xl text-xs md:text-base font-bold tracking-[0.1em] transition-all shadow-lg active:scale-[0.98] mt-4 uppercase"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        PROCESSING YOUR ORDER...
                                    </span>
                                ) : (
                                    'COMPLETELY SECURE PURCHASE'
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Footer Links (Checkout specific) */}
                    <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        <Link href="/policy" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
                        <Link href="/shipping" className="hover:text-black transition-colors">Shipping Policy</Link>
                    </div>
                </div>

                {/* Right Section: Summary */}
                <div className="bg-[#F5F5F7] p-6 md:p-8 lg:p-12 order-1 lg:order-2 lg:border-l border-gray-200/50">
                    <div className="max-w-md mx-auto sticky top-10">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-xl font-extrabold tracking-tight">Order Summary</h2>
                            <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">{cart.length} items</span>
                        </div>

                        {/* Cart List */}
                        <div className="space-y-6 mb-12 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="relative w-24 h-24 rounded-3xl bg-white border border-gray-200 overflow-hidden flex-shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                        <Image src={item.image} alt={item.name} fill className="object-cover p-2" />
                                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center flex-1">
                                        <h3 className="text-sm font-bold text-black leading-tight mb-1">{item.name}</h3>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                            {item.selectedSize} / {item.selectedColor}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center text-sm font-bold">
                                        Rs {(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Promo Code */}
                        <div className="flex gap-3 mb-10">
                            <input
                                type="text"
                                placeholder="Discount code"
                                className="flex-1 h-12 bg-white px-5 rounded-xl border border-gray-200 outline-none focus:border-black transition-all text-xs font-medium"
                            />
                            <button className="px-6 bg-gray-100 hover:bg-gray-200 text-black font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all">
                                Apply
                            </button>
                        </div>

                        {/* Totals */}
                        <div className="space-y-4 pt-10 border-t border-gray-200">
                            <div className="flex justify-between text-sm font-medium text-gray-500">
                                <span>Subtotal</span>
                                <span className="text-black font-bold">Rs {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <span>Shipping</span>
                                    <Info className="w-3.5 h-3.5 cursor-help" />
                                </div>
                                <span className="text-black font-bold">
                                    {shipping === 0 ? <span className="text-emerald-600 font-extrabold uppercase text-[10px] tracking-widest">Calculated at next step</span> : `Rs ${shipping.toLocaleString()}`}
                                </span>
                            </div>
                            <div className="pt-8 flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-sm font-extrabold tracking-tight">Total</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Including taxes & duties</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-gray-400 mb-1">PKR</span>
                                    <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter leading-none">Rs {total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Symbols */}
                        <div className="mt-12 p-8 bg-white/50 rounded-[2rem] border border-white/80 shadow-inner">
                            <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
                                <ShieldCheck className="w-10 h-10" />
                                <Lock className="w-10 h-10" />
                                <Truck className="w-10 h-10" />
                                <RotateCcw className="w-10 h-10" />
                            </div>
                            <p className="mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                                Guaranteed safe checkout via Industry-standard 256-bit SSL encryption.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Footer (As requested) */}
            <Footer />
        </div>
    )
}