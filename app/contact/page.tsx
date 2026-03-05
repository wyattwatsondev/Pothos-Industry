import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navigation />
            <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
                <SectionHeading title="Contact Us" subtitle="We're here to help." />
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <p className="text-lg text-gray-600 leading-relaxed">Have a question about an order, a product, or just want to say hello? Get in touch with us using the form or our contact information below.</p>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-black uppercase tracking-tight">Email Us</h4>
                                    <p className="text-gray-500">info@pothosindustry.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-black uppercase tracking-tight">Call Us</h4>
                                    <p className="text-gray-500">+92 345 6732994</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-black uppercase tracking-tight">Our Office</h4>
                                    <p className="text-gray-500">Union St, opposite Noora bad Colony, Defence road Sialkot 51310-Pakistan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="bg-gray-50 p-8 sm:p-12 rounded-[2.5rem] space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                                <input type="text" className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                <input type="email" className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Subject</label>
                            <input type="text" className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-primary transition-colors" placeholder="Order Support" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Message</label>
                            <textarea className="w-full h-32 rounded-xl border border-gray-200 p-4 outline-none focus:border-primary transition-colors resize-none" placeholder="Write your message here..."></textarea>
                        </div>
                        <button className="w-full h-14 bg-charcoal text-white rounded-full font-extrabold uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-xl hover:shadow-primary/30">Send Message</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
