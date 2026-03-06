"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { ProductBreadcrumbs } from '@/components/ProductDetails/ProductBreadcrumbs'
import { ProductGallery } from '@/components/ProductDetails/ProductGallery'
import { ProductInfo } from '@/components/ProductDetails/ProductInfo'
import { ProductRelated } from '@/components/ProductDetails/ProductRelated'
import { ProductReviews } from '@/components/ProductDetails/ProductReviews'
import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { BackButton } from '@/components/Header/BackButton'
import { Footer } from '@/components/Footer/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import productsData from '@/data/products.json'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`)
                const data = await res.json()
                setProduct(data)
            } catch (error) {
                console.error('Error fetching product:', error)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchProduct()
    }, [id])

    // Prepare detailed product with defaults for UI
    const detailedProduct = product ? {
        ...product,
        description: product.description || "No description available.",
        rating: 4.5,
        reviews: 1250,
        colors: [
            { name: "Royal Brown", value: "#544439" },
            { name: "Cloud White", value: "#EFEFEF" },
            { name: "Ocean Blue", value: "#4A7091" },
            { name: "Midnight Black", value: "#1A1B20" }
        ],
        sizes: product.sizes && product.sizes.length > 0 ? product.sizes : []
    } : null

    const breadcrumbs = detailedProduct ? [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: detailedProduct.category || "General", href: `/products?category=${detailedProduct.category}` },
        { label: detailedProduct.name, href: "#" }
    ] : []

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <TopBar />
            <Navigation />
            <BackButton />

            <main className="flex-1 bg-white">
                <div className="container mx-auto px-4 max-w-7xl pt-8 pb-16">
                    {loading ? (
                        <div className="space-y-8">
                            {/* Breadcrumbs Skeleton */}
                            <Skeleton className="h-4 w-48" />

                            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 mb-20 items-start">
                                {/* Gallery Skeleton */}
                                <Skeleton className="aspect-[4/5] rounded-[1.5rem]" />

                                {/* Info Skeleton */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    <div className="flex gap-4">
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-8 w-24" />
                                    </div>

                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-24 w-full" />
                                    </div>

                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-16" />
                                        <div className="flex gap-2">
                                            <Skeleton className="h-10 w-10 rounded-lg" />
                                            <Skeleton className="h-10 w-10 rounded-lg" />
                                            <Skeleton className="h-10 w-10 rounded-lg" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-16" />
                                        <div className="flex gap-2">
                                            <Skeleton className="h-10 w-12 rounded-lg" />
                                            <Skeleton className="h-10 w-12 rounded-lg" />
                                            <Skeleton className="h-10 w-12 rounded-lg" />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Skeleton className="h-12 flex-1 rounded-xl" />
                                        <Skeleton className="h-12 flex-1 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : !product ? (
                        <div className="flex flex-col justify-center items-center py-20">
                            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                            <p className="text-gray-500 mb-8">The product you are looking for does not exist.</p>
                        </div>
                    ) : (
                        <>
                            <ProductBreadcrumbs items={breadcrumbs} />

                            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 mb-20 items-start">
                                <ProductGallery images={[detailedProduct!.image]} />
                                <ProductInfo product={detailedProduct!} />
                            </div>

                            <ProductReviews productId={parseInt(id as string)} />
                            <ProductRelated />
                        </>
                    )}
                </div>
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    )
}
