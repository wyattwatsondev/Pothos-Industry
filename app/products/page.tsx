"use client"

import { Suspense, useState } from 'react'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { ProductFilter } from '@/components/Products/ProductFilter'
import { ProductListing } from '@/components/Products/ProductListing'
import { ItemTypeFilter } from '@/components/Products/ItemTypeFilter'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function ProductsPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <div className="pt-0">
                <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* Mobile Filter Button */}
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-2 rounded-full border-gray-100 font-bold uppercase text-[10px] tracking-widest px-6 h-10 shadow-none hover:bg-black hover:text-white transition-all">
                                    <Filter className="w-3 h-3" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] p-0 bg-white border-r">
                                <SheetHeader className="p-6 border-b text-left">
                                    <SheetTitle className="text-sm font-black uppercase tracking-[0.2em]">Refine Search</SheetTitle>
                                </SheetHeader>
                                <div className="p-6 h-full overflow-y-auto custom-scrollbar">
                                    <Suspense fallback={<div className="h-64 w-full bg-gray-50 animate-pulse rounded-2xl" />}>
                                        <ProductFilter />
                                    </Suspense>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Pothos Industry
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Desktop Sidebar Filter (Hidden on mobile) */}
                        <aside className="hidden lg:block w-full lg:w-1/5 shrink-0">
                            <Suspense fallback={<div className="h-64 w-full bg-gray-50 animate-pulse rounded-2xl" />}>
                                <ProductFilter />
                            </Suspense>
                        </aside>

                        {/* Right Product Grid */}
                        <section className="flex-1 min-w-0">
                            {/* Item type chip bar — shown inline above products */}
                            <Suspense fallback={null}>
                                <ItemTypeFilter />
                            </Suspense>
                            <Suspense fallback={<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
        </div>
    );
}
