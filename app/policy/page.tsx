import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function PolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navigation />
            <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-gray-600">
                <SectionHeading title="Privacy Policy" subtitle="Your privacy is important to us." />
                <div className="mt-12 space-y-8">
                    <section>
                        <h2 className="text-xl font-black text-black uppercase mb-4 tracking-tighter">Information We Collect</h2>
                        <p className="leading-relaxed">We collect information from you when you register on our site, place an order, or subscribe to our newsletter. This includes your name, email address, mailing address, and phone number.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-black text-black uppercase mb-4 tracking-tighter">How We Use Your Information</h2>
                        <p className="leading-relaxed">We may use the information we collect to personalize your experience, improve our website, process transactions, and send periodic emails regarding your order or other products and services.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-black text-black uppercase mb-4 tracking-tighter">Data Protection</h2>
                        <p className="leading-relaxed">We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
