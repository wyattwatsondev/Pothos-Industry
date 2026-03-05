'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import faqs from '@/data/faqs.json'

export function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(null)

    return (
        <section className="w-full py-12 lg:py-16 bg-gray-50/30 relative overflow-hidden border-y border-gray-100">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A5C9E1]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F5E6FF]/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-60" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8D3F5]/30 border border-[#D8D3F5]/50 mb-6"
                    >
                        <HelpCircle className="w-4 h-4 text-[#1D3D53]" />
                        <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#1D3D53]">Help Center</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-extrabold text-charcoal mb-6 tracking-tighter uppercase"
                    >
                        Frequently Asked <span className="text-primary italic">Questions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 font-bold max-w-2xl mx-auto uppercase text-sm tracking-widest"
                    >
                        Everything you need to know about our premium garments, shipping, and bespoke services.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group"
                        >
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className={`w-full text-left p-4 lg:p-5 rounded-[2rem] transition-all duration-500 border-2 flex items-center justify-between gap-4 
                  ${openId === faq.id
                                        ? 'bg-white border-charcoal  scale-[1.02]'
                                        : 'bg-slate-50 border-slate-300 hover:border-charcoal/50 hover:bg-white'}`}
                            >
                                <span className={`text-sm lg:text-base font-black uppercase tracking-tight transition-colors duration-300
                  ${openId === faq.id ? 'text-[#1D3D53]' : 'text-gray-600'}`}>
                                    {faq.question}
                                </span>
                                <div className={`p-2 rounded-full transition-all duration-500
                  ${openId === faq.id ? 'bg-[#1D3D53] text-white rotate-180' : 'bg-white border border-gray-100 text-gray-400 rotate-0'}`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 lg:px-10 pb-8 pt-4">
                                            <p className="text-gray-500 text-sm lg:text-base font-bold leading-relaxed lg:leading-[1.8]">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">Still have questions?</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-charcoal font-black uppercase text-sm border-b-2 border-primary hover:text-primary transition-colors pb-1"
                    >
                        Contact Customer Support <ChevronDown className="w-4 h-4 -rotate-90" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
