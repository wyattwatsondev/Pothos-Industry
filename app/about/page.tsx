'use client'

import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQSection } from '@/components/FAQ/FAQSection'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, Factory, Globe2, ShieldCheck } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <TopBar />
            <Navigation />

            <main>
                {/* Hero Section */}
                <section className="relative h-[300px] lg:h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#A5C9E1]/50 via-[#D8D3F5]/50 to-[#F5E6FF]/50 ">

                    <div className="relative z-10 text-center px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl lg:text-4xl font-black text-gray-700 uppercase tracking-tighter mb-3"
                        >
                            About Pothos Industry
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-base lg:text-lg text-black/50 max-w-xl mx-auto font-medium"
                        >
                            Leading Manufacturers and Exporters of Premium Apparel and Gear.
                        </motion.p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-10 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <SectionHeading
                                title="Our Manufacturing Excellence"
                                subtitle="Quality without compromise"
                                className="text-left !px-0 mb-6 [&_h2]:!text-2xl lg:[&_h2]:!text-3xl [&_p]:!mt-2"
                            />
                            <div className="space-y-4 mt-6">
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Leading Manufacturers and Exporters of Premium <span className="text-black font-bold">Leather Garments, Textile Garments, Gloves, Sports Wear, Drindl Dress and Work Wear Products.</span>
                                </p>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Our state-of-the-art production facility enables us to deliver high-quality products in bulk quantities, meeting customer-specific deadlines. Our products adhere to stringent international quality standards, ensuring optimal performance in real-world working conditions.
                                </p>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    We offer competitive pricing tailored to the specific material and design requirements of our clients.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {[
                                    { icon: Factory, text: "Advanced Production" },
                                    { icon: Globe2, text: "Global Export" },
                                    { icon: ShieldCheck, text: "Quality Certified" },
                                    { icon: CheckCircle2, text: "On-time Delivery" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <item.icon className="w-4 h-4 text-charcoal" />
                                        </div>
                                        <span className="font-bold text-[10px] uppercase tracking-tight">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="space-y-4">
                                <div className="relative h-48 lg:h-64 rounded-3xl overflow-hidden shadow-2xl">
                                    <Image src="/Photos Industry/14.png" alt="Process" fill className="object-cover" />
                                </div>
                                <div className="relative h-36 lg:h-48 rounded-3xl overflow-hidden shadow-xl">
                                    <Image src="/Photos Industry/15.png" alt="Detail" fill className="object-cover" />
                                </div>
                            </div>
                            <div className="space-y-4 pt-6">
                                <div className="relative h-36 lg:h-48 rounded-3xl overflow-hidden shadow-xl">
                                    <Image src="/Photos Industry/18.png" alt="Material" fill className="object-cover" />
                                </div>
                                <div className="relative h-48 lg:h-64 rounded-3xl overflow-hidden shadow-2xl">
                                    <Image src="/Photos Industry/20.png" alt="Quality" fill className="object-cover" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section Integration */}
                <div className="bg-gray-50 border-y border-gray-100">
                    <FAQSection />
                </div>
            </main>

            <Footer />
        </div>
    )
}
