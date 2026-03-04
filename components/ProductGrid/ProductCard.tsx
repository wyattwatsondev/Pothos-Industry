import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProductCardProps {
  id: number
  name: string
  category?: string
  price: string | number
  originalPrice?: string | number
  image: string
  badge?: string
  rating?: number
}

export function ProductCard({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  badge,
  rating,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-[2rem] p-1.5 sm:p-2.5 border border-gray-100 transition-all duration-500 md:hover:shadow-xl group shadow-none">
      <Link href={`/product/${id}`}>
        {/* Image Container — shorter on mobile */}
        <div className="relative overflow-hidden rounded-lg sm:rounded-[1.5rem] aspect-[4/3] sm:aspect-square flex items-center justify-center">
          <Image
            src={image || '/placeholder.svg'}
            alt={name}
            fill
            className="object-contain p-2 sm:p-3 md:group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />

          {/* Badge + Heart */}
          <div className="absolute inset-x-1.5 top-1.5 sm:inset-x-2 sm:top-2 flex justify-between items-start">
            <div className="bg-white/80 backdrop-blur-sm px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold text-gray-700 border border-black/5 shadow-none">
              {badge || 'Best Seller'}
            </div>
            <button className="w-6 h-6 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-black/5 shadow-none md:hover:scale-110 transition-transform duration-300">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-accent fill-accent" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-charcoal/20" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-charcoal/10" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-2 sm:mt-4 px-0.5 sm:px-1 pb-0.5 sm:pb-1">
          {category && (
            <p className="text-primary text-[8px] sm:text-[11px] font-extrabold uppercase tracking-[0.15em] mb-1 sm:mb-2">
              {category}
            </p>
          )}
          <h3 className="font-heading font-semibold text-[#1A1A1A] text-[10px] sm:text-sm leading-tight mb-1 sm:mb-1.5 line-clamp-1">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-1 sm:gap-2 mb-1.5 sm:mb-5">
            <span className="text-sm sm:text-xl font-black text-charcoal tracking-tight">${price}</span>
            {originalPrice && (
              <span className="text-[9px] sm:text-xs text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Buy Now Button — compact on mobile */}
          <Button
            className="w-full bg-charcoal md:hover:bg-primary text-white font-extrabold py-2 sm:py-3 h-8 sm:h-11 text-[10px] sm:text-xs rounded-full transition-all duration-500 active:scale-95 shadow-none md:hover:shadow-primary/30"
          >
            Explore Item
          </Button>
        </div>
      </Link>
    </div>
  )
}
