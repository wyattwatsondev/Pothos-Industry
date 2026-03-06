'use client'

import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <TopBar />
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:px-8">
                <SectionHeading
                    title="Get In Touch"
                    subtitle="Our team is ready to assist with your manufacturing and sourcing needs."
                    className="mb-6 lg:mb-8 [&_h2]:!text-2xl sm:[&_h2]:!text-4xl lg:[&_h2]:!text-5xl [&_p]:!mt-3"
                />

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left: Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-charcoal">Contact Details</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <ContactInfoCard
                                    icon={Mail}
                                    title="Email Us"
                                    details="info@pothosindustry.com"
                                    sub="Response within 24h"
                                />
                                <ContactInfoCard
                                    icon={Phone}
                                    title="Call Us"
                                    details="+92 345 6732994"
                                    sub="Mon-Sat, 9am-6pm"
                                />
                                <ContactInfoCard
                                    icon={MapPin}
                                    title="Our Office"
                                    details="Union St, opposite Noora bad Colony, Defence road Sialkot 51310-Pakistan"
                                    sub="Manufacturing Hub"
                                />
                                <ContactInfoCard
                                    icon={Globe}
                                    title="Global Sales"
                                    details="sales@pothosindustry.com"
                                    sub="Export Inquiries"
                                />
                            </div>
                        </div>

                        {/* Map Section */}
                        {/* Map Section */}
                        <div className="relative w-full h-[320px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.076395568!2d74.512637!3d32.4752677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eea08e174193f%3A0x65c9b41c9ff23da9!2sNoorabad%2C%20Sialkot%2C%20Pakistan!5e0!3m2!1sen!2s!4v1714150000000!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-charcoal rounded-xl flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/50">Location</p>
                                        <p className="text-xs font-bold text-charcoal">Sialkot, Pakistan (Export Hub)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 p-6 sm:p-10 rounded-[2rem] shadow-inner relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                            <Send className="w-20 h-20" />
                        </div>

                        <div className="relative z-10 text-center mb-8">
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-charcoal">Send Inquiry</h3>
                            <p className="text-gray-500 text-sm font-medium mt-1">Specify your requirements for a custom quote.</p>
                        </div>

                        <form className="space-y-4 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                                    <input type="text" className="w-full h-12 rounded-xl border-2 border-transparent bg-white px-5 outline-none focus:border-charcoal/20 transition-all shadow-sm text-sm" placeholder="John Doe" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                                    <input type="email" className="w-full h-12 rounded-xl border-2 border-transparent bg-white px-5 outline-none focus:border-charcoal/20 transition-all shadow-sm text-sm" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter subject"
                                    className="w-full h-12 rounded-xl border-2 border-transparent bg-white px-5 outline-none focus:border-charcoal/20 transition-all shadow-sm text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Message / Requirements</label>
                                <textarea className="w-full h-32 rounded-2xl border-2 border-transparent bg-white p-5 outline-none focus:border-charcoal/20 transition-all shadow-sm resize-none text-sm" placeholder="Include details like material specifications, quantities, and deadlines..."></textarea>
                            </div>

                            <button className="w-full h-14 bg-charcoal text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-[#2D4D63] transition-all duration-500 shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-3 active:scale-95 text-sm">
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>

                            <p className="text-center text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                                Protected by SSL Encrypted Communication
                            </p>
                        </form>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function ContactInfoCard({ icon: Icon, title, details, sub }: { icon: any, title: string, details: string, sub: string }) {
    return (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-charcoal transition-colors">
                <Icon className="w-5 h-5 text-charcoal group-hover:text-white" />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{title}</h4>
            <p className="text-charcoal font-bold text-[13px] leading-tight mb-0.5">{details}</p>
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-tight">{sub}</p>
        </div>
    )
}
