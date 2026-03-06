import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { HeroBanner } from '@/components/Hero/HeroBanner'
import { CategoryGrid } from '@/components/ProductGrid/CategoryGrid'
import { ProductGrid } from '@/components/ProductGrid/ProductGrid'
import { FeaturedBanner } from '@/components/FeaturedBanner/FeaturedBanner'
import { GallerySection } from '@/components/Gallery/GallerySection'
import { ShirtsCollection } from '@/components/Collections/ShirtsCollection'
import { AccessoriesCollection } from '@/components/Collections/AccessoriesCollection'
import { BundlesCombo } from '@/components/Collections/BundlesCombo'
import { TestimonialsSection } from '@/components/Testimonials/TestimonialsSection'
import { FAQSection } from '@/components/FAQ/FAQSection'
import { BlogSection } from '@/components/Blog/BlogSection'
import { Newsletter } from '@/components/Newsletter/Newsletter'
import { Footer } from '@/components/Footer/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { prisma } from '@/lib/prisma'
import { Product } from '@/types/product'

// Helper to fetch lean product data
async function getSectionProducts(options: {
  take?: number,
  where?: any,
  orderBy?: any
} = {}) {
  try {
    return await prisma.product.findMany({
      take: options.take || 8,
      where: options.where,
      orderBy: options.orderBy || { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        category: true,
        // originalPrice: true, // Add if these exist in DB
        // badge: true,
        // rating: true
      }
    }) as any[]
  } catch (error) {
    console.error('Failed to fetch section products:', error)
    return []
  }
}

export default async function Home() {

  // Define categories early
  const streetwearCategories = ['mens-shirts', 'womens-shirts', 'shirts', 'trousers-shorts', 'mens-tshirt', 'womens-tshirt']
  const bundleCategories = ['bundles-combo', 'bundle', 'bundles']

  // Fetch all products once for all sections (Consolidated to fix connection pool timeout)
  const allProducts = await prisma.product.findMany({
    take: 150, // Grab enough to cover all sections
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      category: true,
    }
  })

  // Filter products in memory
  const newArrivals = allProducts.slice(0, 6)
  const bestSellers = [...allProducts].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 6)
  const streetwear = allProducts.filter(p => streetwearCategories.includes(p.category)).slice(0, 6)
  const bundles = allProducts.filter(p => bundleCategories.includes(p.category)).slice(0, 6)
  const accessories = allProducts.filter(p => p.category === 'caps-hats').slice(0, 6)


  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="flex flex-col">
        <HeroBanner />
        <CategoryGrid />

        {/* NEW ARRIVALS — 4 products, 1 row */}
        <section>
          <ProductGrid title="New Arrivals" items={newArrivals} />
        </section>

        <GallerySection />

        <section className="w-full py-10 sm:py-12 lg:py-16 overflow-hidden">
          <FeaturedBanner />
        </section>

        {/* TEXTILE JACKETS — 8 products (shirts + trousers), 2 rows */}
        <ShirtsCollection products={streetwear} />

        {/* BEST SELLERS — 8 products all mixed, 2 rows */}
        <section>
          <ProductGrid title="Best Sellers" items={bestSellers} />
        </section>

        {/* SPORTSWEAR — 4 products, 1 row */}
        <BundlesCombo products={bundles} />

        {/* ACCESSORIES COLLECTION — 4 cap products, 1 row */}
        <AccessoriesCollection products={accessories} />

        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
