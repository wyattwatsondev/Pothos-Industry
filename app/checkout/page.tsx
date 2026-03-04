"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, RotateCcw, Lock, Tag, HelpCircle, ChevronDown, Zap, ChevronRight, Info, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useFashionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
    const { cart, clearCart } = useFashionStore()
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        country: 'United Kingdom',
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
    const shipping = subtotal > 100 ? 0 : 15
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
        <div className="min-h-screen bg-white font-sans text-[#333] overflow-x-hidden relative">
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight">Order Successful!</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Your order was successful. We have received your order details and will process it shortly.
                        </p>
                        <Link href="/" className="w-full">
                            <Button
                                className="w-full bg-black hover:bg-gray-800 text-white font-bold h-12 rounded-lg transition-colors uppercase tracking-widest text-xs"
                            >
                                Return to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px]">

                {/* Left Side: Forms (Main Content) */}
                <div className="px-4 py-6 md:px-10 lg:py-10 lg:border-r border-gray-100 order-2 lg:order-1 lg:min-h-screen">
                    {/* Logo & Social Proof */}
                    <div className="flex flex-col items-center mb-8">
                        <Link href="/">
                            <Image src="/hutlemoblogo.png" alt="Logo" width={120} height={120} className="object-contain scal-100 sm:scale-150 " />
                        </Link>

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 w-fit">
                            <div className="flex -space-x-1.5">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-5 h-5 rounded-full border border-white bg-gray-200 overflow-hidden relative">
                                        <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-black uppercase tracking-tight">
                                Trusted by <span className="text-gray-600">770k+</span> Fashion Lovers
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            <div className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-gray-400" /> FAST Shipping</div>
                            <div className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 text-gray-400" /> 90-Day Guarantee</div>
                            <div className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-gray-400" /> Secure Checkout</div>
                        </div>
                    </div>

                    {/* Breadcrumbs (Desktop Only or clean) */}
                    <nav className="hidden md:flex items-center gap-2 text-[10px] mb-8 overflow-x-auto whitespace-nowrap pb-2 uppercase tracking-widest font-bold text-gray-400">
                        <Link href="/cart" className="text-black">Cart</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-black">Information</span>
                        <ChevronRight className="w-3 h-3" />
                        <span>Shipping</span>
                        <ChevronRight className="w-3 h-3" />
                        <span>Payment</span>
                    </nav>

                  

                    {/* Contact Section */}
                    <section className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-base font-bold text-black uppercase tracking-tight">Contact</h2>
                            <Link href="/login" className="text-xs text-gray-500 underline font-medium">Log in</Link>
                        </div>
                        <div className="space-y-3">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="Email"
                                className="w-full h-11 px-3 rounded-md border border-gray-300 focus:border-black outline-none text-[13px] placeholder:text-gray-400"
                            />
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="news" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black" />
                                <label htmlFor="news" className="text-[12px] text-gray-500">Email me with news and offers</label>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Section */}
                    <section className="mb-8">
                        <h2 className="text-base font-bold mb-3 text-black uppercase tracking-tight">Delivery</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2 relative">
                                <label className="absolute top-1.5 left-3 text-[9px] text-gray-400 font-bold uppercase">Country/Region</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full h-12 pt-4 pb-1 px-3 rounded-md border border-gray-300 focus:border-black outline-none text-[13px] appearance-none bg-white font-medium"
                                >
                                    <option value="">Select Country</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Pakistan">Netherland</option>
                                    <option value="India">India</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="Germany">Germany</option>
                                    <option value="France">France</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Japan">Japan</option>
                                    <option value="China">China</option>
                                    <option value="Brazil">Brazil</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="First name" className="w-full h-11 px-3 rounded-md border border-gray-300 text-[13px] outline-none focus:border-black" />
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="Last name" className="w-full h-11 px-3 rounded-md border border-gray-300 text-[13px] outline-none focus:border-black" />
                            <div className="col-span-2 relative">
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required placeholder="Address" className="w-full h-11 px-3 rounded-md border border-gray-300 text-[13px] outline-none focus:border-black pr-10" />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                            <div className="col-span-2">
                                <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} placeholder="Apartment, suite, etc. (optional)" className="w-full h-11 px-3 rounded-md border border-gray-300 text-[13px] outline-none focus:border-black" />
                            </div>
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="City" className="w-full h-11 px-3 rounded-md border border-gray-300 text-[13px] outline-none focus:border-black" />
                            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required placeholder="Postal code" className="w-full h-11 px-3 rounded-md border border-gray-300 text-[13px] outline-none focus:border-black" />
                            <div className="col-span-2 relative">
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Phone" className="w-full h-11 px-3 rounded-md border border-gray-300 text-[13px] outline-none focus:border-black pr-10" />
                                <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-help" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <input type="checkbox" id="save" className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black" />
                            <label htmlFor="save" className="text-[12px] text-gray-500">Save this information for next time</label>
                        </div>
                    </section>

                    {/* Pay Now Button */}
                    <div className="mt-10">
                        <Button type="submit" disabled={isSubmitting} className="w-full bg-black hover:bg-gray-800 h-14 rounded-md text-base font-bold transition-all transform active:scale-[0.98]">
                            {isSubmitting ? 'Processing...' : 'Complete Order'}
                        </Button>
                        <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
                            By clicking complete order, you agree to our Terms of Service.
                            Secure payment powered by Stripe.
                        </p>
                    </div>

                    <footer className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <Link href="#" className="hover:text-black transition-colors">Shipping policy</Link>
                        <Link href="#" className="hover:text-black transition-colors">Privacy policy</Link>
                        <Link href="#" className="hover:text-black transition-colors">Terms of service</Link>
                    </footer>
                </div>

                {/* Right Side: Order Summary */}
                <div className="bg-[#fafafa] lg:bg-gray-50/50 px-4 py-8 md:px-10 lg:px-12 border-b lg:border-b-0 order-1 lg:order-2 border-l border-gray-100">
                    <div className="max-w-full space-y-6 sticky top-8">
                        {/* Cart Items */}
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-4 group">
                                    <div className="relative w-16 h-16 rounded-lg bg-white border border-gray-200 p-1 flex-shrink-0 overflow-visible shadow-sm">
                                        <div className="relative w-full h-full">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                        </div>
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10 border border-white">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xs font-bold text-black group-hover:text-gray-600 transition-colors uppercase tracking-tight">{item.name}</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">
                                            {item.selectedSize && `Size: ${item.selectedSize}`}
                                            {item.selectedSize && item.selectedColor && ' / '}
                                            {item.selectedColor && `Color: ${item.selectedColor}`}
                                        </p>
                                    </div>
                                    <div className="text-xs font-bold text-black">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Discount Input */}
                        <div className="flex gap-2 py-6 border-y border-gray-100">
                            <input
                                type="text"
                                placeholder="Discount code or gift card"
                                className="flex-1 h-12 px-4 rounded-md border border-gray-200 text-[12px] bg-white outline-none focus:border-black transition-all"
                            />
                            <button className="px-5 bg-gray-100 text-gray-400 font-bold rounded-md text-[12px] hover:bg-gray-200 hover:text-black transition-all uppercase tracking-widest">
                                Apply
                            </button>
                        </div>

                        {/* Totals */}
                        <div className="space-y-2 pt-1">
                            <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                                <span>Subtotal • {cart.reduce((a, b) => a + b.quantity, 0)} items</span>
                                <span className="font-bold text-black uppercase">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                                <span>Shipping</span>
                                <span className="text-[11px] font-bold uppercase">
                                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="flex justify-between items-end pt-6 border-t border-gray-100 mt-4">
                                <span className="text-lg font-black text-black uppercase">Total</span>
                                <div className="text-right flex items-center gap-2">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">USD</span>
                                    <span className="text-2xl font-black text-black leading-none">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Badge (Fashion context) */}
                        <div className="pt-6">
                            <div className="border border-dashed border-gray-200 rounded-lg p-5 bg-white/50 backdrop-blur-sm shadow-sm">
                                <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    Quality Assured <ShieldCheck className="w-3 h-3" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 relative border border-gray-100">
                                        <Image src="/Quality-Assurance.png" alt="Specialist" fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[11px] font-black text-black uppercase tracking-tight mb-1">Standard of Excellence</h4>
                                        <p className="text-[10px] text-gray-500 leading-relaxed italic">
                                            "Every piece in our collection is hand-picked for its premium quality and unique style."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}