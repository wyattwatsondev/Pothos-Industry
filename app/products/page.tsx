import { Suspense } from 'react'
import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { ProductFilter } from '@/components/Products/ProductFilter'
import { ProductListing } from '@/components/Products/ProductListing'
import { BackButton } from '@/components/Header/BackButton'
import { ScrollToTop } from '@/components/ScrollToTop'

export default async function ProductsPage() {
    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navigation />
            <BackButton />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar Filter */}
                    <aside className="w-full lg:w-1/5 shrink-0">
                        <Suspense fallback={<div className="h-64 w-full bg-gray-50 animate-pulse rounded-2xl" />}>
                            <ProductFilter />
                        </Suspense>
                    </aside>

                    {/* Right Product Grid */}
                    <section className="flex-1">
                        <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="aspect-square bg-gray-50 animate-pulse rounded-[2rem]" />
                            ))}
                        </div>}>
                            <ProductListing />
                        </Suspense>
                    </section>
                </div>
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    );
}
