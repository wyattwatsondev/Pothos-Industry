import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navigation />
            <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
                <SectionHeading title="About Us" subtitle="Wear your hustle with pride." />
                <div className="mt-12 prose prose-zinc max-w-none">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        HustleMob is more than just a brand; it's a movement. Born from the streets and driven by the ambition of those who never stop grinding, we create premium streetwear that reflects the energy of the hustle.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed mt-6">
                        Our mission is simple: to provide high-quality, stylish, and comfortable apparel that empowers you to chase your dreams. From our signature hoodies to our custom caps, every piece is designed with excellence in mind.
                    </p>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8 rounded-3xl">
                            <h3 className="font-black text-xl mb-4 uppercase tracking-tighter">Our Quality</h3>
                            <p className="text-gray-500 text-sm">We use only the finest fabrics and materials, ensuring that your HustleMob gear lasts as long as your ambition.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-3xl">
                            <h3 className="font-black text-xl mb-4 uppercase tracking-tighter">Our Community</h3>
                            <p className="text-gray-500 text-sm">Join thousands of hustlers worldwide who trust us to represent their drive and dedication.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
