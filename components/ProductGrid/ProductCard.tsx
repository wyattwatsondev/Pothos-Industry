import Image from 'next/image'
import { Heart, ArrowRight } from 'lucide-react'
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
    <div className="bg-white rounded-[2rem] p-2 border border-gray-100 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group relative overflow-hidden">
      <Link href={`/product/${id}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-[1.8rem] aspect-square bg-[#F9FAFB] flex items-center justify-center">
          <Image
            src={image || '/placeholder.svg'}
            alt={name}
            fill
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />

          {/* Badge */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span className="bg-black text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-lg">
              {badge || 'Premium'}
            </span>
          </div>

          {/* Heart/Wishlist Button */}
          <button className="absolute top-2 sm:top-4 right-2 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center border border-black/5 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-black hover:text-white">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {/* Hover Overlay Text */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="mt-5 px-2 pb-2">
          <div className="flex justify-between items-start mb-2">
            <div>
              {category && (
                <p className="text-gray-400 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 sm:mb-1">
                  {category}
                </p>
              )}
              <h3 className="font-bold text-charcoal text-xs sm:text-base lg:text-lg leading-tight tracking-tighter group-hover:text-primary transition-colors duration-300 line-clamp-1 uppercase">
                {name}
              </h3>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between mt-3 sm:mt-4">
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black text-charcoal tracking-tighter leading-none">${price}</span>
              {originalPrice && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through mt-0.5 sm:mt-1 opacity-60">
                  ${originalPrice}
                </span>
              )}
            </div>

            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal group-hover:bg-primary text-white flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg">
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
