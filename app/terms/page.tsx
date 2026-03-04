import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navigation />
            <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-gray-600">
                <SectionHeading title="Terms of Service" subtitle="Last updated: February 2026" />
                <div className="mt-12 space-y-8">
                    <section>
                        <h2 className="text-xl font-black text-black uppercase mb-4 tracking-tighter">1. Agreement to Terms</h2>
                        <p className="leading-relaxed">By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-black text-black uppercase mb-4 tracking-tighter">2. Use License</h2>
                        <p className="leading-relaxed">Permission is granted to temporarily download one copy of the materials on HustleMob's website for personal, non-commercial transitory viewing only.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-black text-black uppercase mb-4 tracking-tighter">3. Disclaimer</h2>
                        <p className="leading-relaxed">The materials on HustleMob's website are provided on an 'as is' basis. HustleMob makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-black text-black uppercase mb-4 tracking-tighter">4. Limitations</h2>
                        <p className="leading-relaxed">In no event shall HustleMob or its suppliers be liable for any damages arising out of the use or inability to use the materials on HustleMob's website.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
