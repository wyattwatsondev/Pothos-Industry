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

  // Specific glove names requested by user
  const gloveNames = [
    'Cycling Glove',
    'Driving Glove',
    'Golf Glove',
    'Mechanic',
    'TPR Impact'
  ]

  // Specific accessory names requested by user
  const accessoryNames = [
    'Backpack',
    'Bracelet',
    'Hand Bag',
    'Cap',
    'Wallet'
  ]

  // Specific jacket names requested by user
  const jacketNames = [
    'Denim',
    'Windbreaker',
    'Bubble',
    'Varsity',
    'Softshell'
  ]

  const sectionSelect = {
    id: true,
    name: true,
    price: true,
    image: true,
    category: true,
  }

  // Fetch all products once for all sections
  const allProducts = await prisma.product.findMany({
    take: 150, // Grab enough to cover all sections
    orderBy: { createdAt: 'desc' },
    select: sectionSelect
  })

  // Sequentially fetch Gloves to avoid Connection Pool Timeout
  const selectedGloves: any[] = []
  for (const name of gloveNames) {
    const p = await prisma.product.findFirst({ where: { name: { contains: name, mode: 'insensitive' } }, select: sectionSelect })
    if (p) selectedGloves.push(p)
  }
  const extraGlove = await prisma.product.findFirst({ where: { name: { contains: 'Cycling Glove', mode: 'insensitive' } }, skip: 1, select: sectionSelect })
  if (extraGlove) selectedGloves.push(extraGlove)

  // Sequentially fetch Accessories
  const selectedAccessories: any[] = []
  for (const name of accessoryNames) {
    const p = await prisma.product.findFirst({ where: { name: { contains: name, mode: 'insensitive' } }, select: sectionSelect })
    if (p) selectedAccessories.push(p)
  }
  const extraAcc = await prisma.product.findFirst({ where: { name: { contains: 'Cap', mode: 'insensitive' } }, skip: 1, select: sectionSelect })
  if (extraAcc) selectedAccessories.push(extraAcc)

  // Sequentially fetch Jackets
  const selectedJackets: any[] = []
  for (const name of jacketNames) {
    const p = await prisma.product.findFirst({ where: { name: { contains: name, mode: 'insensitive' } }, select: sectionSelect })
    if (p) selectedJackets.push(p)
  }
  const extraJac = await prisma.product.findFirst({ where: { name: { contains: 'Denim', mode: 'insensitive' } }, skip: 1, select: sectionSelect })
  if (extraJac) selectedJackets.push(extraJac)

  // Filter products in memory
  const newArrivals = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 6)
  const bestSellers = [...allProducts].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 6)
  // const bundles = allProducts.filter(p => bundleCategories.includes(p.category)).slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="flex flex-col">
        <HeroBanner />
        <CategoryGrid />

        {/* NEW ARRIVALS — 5 mixed products */}
        <section>
          <ProductGrid title="New Arrivals" items={newArrivals} />
        </section>

        <GallerySection />

        <section className="w-full py-10 sm:py-12 lg:py-16 overflow-hidden">
          <FeaturedBanner />
        </section>

        {/* TEXTILE JACKETS — 5 products on desktop, 6 on mobile, 2 rows */}
        <ShirtsCollection products={selectedJackets} />

        {/* BEST SELLERS — 8 products all mixed, 2 rows */}
        <section>
          <ProductGrid title="Best Sellers" items={bestSellers} />
        </section>

        {/* GLOVES COLLECTION (Using Bundles Combo layout) */}
        <BundlesCombo products={selectedGloves} />

        {/* ACCESSORIES COLLECTION — 5 mixed accessory products, 1 row */}
        <AccessoriesCollection products={selectedAccessories} />

        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
