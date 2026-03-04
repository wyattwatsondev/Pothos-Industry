import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: rawCategory } = await params;
    const category = decodeURIComponent(rawCategory);

    const products = await prisma.product.findMany({
        where: { category },
        orderBy: { createdAt: "desc" },
    });

    if (products.length === 0) {
        // Optionally we could show an empty state, but if the category doesn't exist, notFound is fine too.
        // However, since categories are dynamic, let's just show an empty state if no products.
    }

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-16">
            <header className="space-y-6">
                <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                    ← Back to Collection
                </Link>
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tight text-gray-900 uppercase italic">{category}</h1>
                    <p className="text-xl text-gray-500 font-medium">Explore our premium selection of {category.toLowerCase()}.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product: any) => (
                    <div key={product.id} className="group">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                        </div>
                        <div className="mt-6 space-y-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:underline decoration-2 underline-offset-4">{product.name}</h3>
                            <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">{product.description}</p>
                            <p className="text-lg font-bold text-black pt-2">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-24 border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="text-lg text-gray-400 italic">No products found for this category.</p>
                </div>
            )}
        </div>
    );
}
