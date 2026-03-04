import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Image from 'next/image'
import Link from 'next/link'

const posts = [
    {
        title: "Streetwear Trends to Watch in 2026",
        excerpt: "From oversized fits to tech-focused apparel, here is what is defining the hustle this year.",
        date: "Feb 20, 2026",
        image: "/ProductImages/91.jpg"
    },
    {
        title: "How to Style Your Signature Hoodie",
        excerpt: "The hoodie is a staple, but styling it right makes the difference between casual and professional.",
        date: "Feb 15, 2026",
        image: "/ProductImages/92.jpg"
    },
    {
        title: "The Story Behind the HustleMob Community",
        excerpt: "How a small brand turned into a global movement of ambitious individuals.",
        date: "Feb 10, 2026",
        image: "/ProductImages/93.jpg"
    },
    {
        title: "Top 5 Accessories for the Modern Hustler",
        excerpt: "Complete your look with the right caps, chains, and shades. Here's our top picks for the season.",
        date: "Feb 05, 2026",
        image: "/ProductImages/85.png"
    },
    {
        title: "Sustainable Fashion in the Streetwear World",
        excerpt: "How brands are moving towards more eco-friendly materials without sacrificing style.",
        date: "Jan 28, 2026",
        image: "/ProductImages/86.jpg"
    },
    {
        title: "Navigating Your Career with the Hustle Mindset",
        excerpt: "Ambition doesn't stop at your clothes. Here's how to bring that same energy to your professional life.",
        date: "Jan 22, 2026",
        image: "/ProductImages/87.jpg"
    },
    {
        title: "Color Theory for Streetwear Enthusiasts",
        excerpt: "Mastering the art of color coordination can elevate your style from basic to legendary.",
        date: "Jan 15, 2026",
        image: "/ProductImages/12.jpg"
    },
    {
        title: "The Evolution of Urban Footwear",
        excerpt: "From basketball courts to high-fashion runways, sneakers have come a long way.",
        date: "Jan 10, 2026",
        image: "/ProductImages/16.jpg"
    },
    {
        title: "Summer Vibes: Lightweight Fabrics for the Grind",
        excerpt: "Don't let the heat slow you down. Discover our breathable collection designed for productivity.",
        date: "Jan 05, 2026",
        image: "/ProductImages/1.jpg"
    }
]

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navigation />
            <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
                <SectionHeading title="Our Blog" subtitle="Insights, style guides, and community stories." />
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <div key={i} className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                            <div className="relative h-64 overflow-hidden">
                                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-8">
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">{post.date}</span>
                                <h3 className="font-heading font-bold text-xl mt-3 mb-4 uppercase tracking-tight leading-snug text-charcoal">{post.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                                <Link href="#" className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-widest text-charcoal hover:text-primary transition-all duration-300 group/link">
                                    Read More
                                    <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
