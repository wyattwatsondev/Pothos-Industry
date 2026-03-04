'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductCarouselProps {
    children: React.ReactNode[]
}

export function ProductCarousel({ children }: ProductCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        skipSnaps: false,
        dragFree: false,
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="relative group/carousel">
            {/* Mobile-only Navigation Buttons at top right */}
            <div className="absolute -top-10 sm:-top-20 right-0 flex items-center gap-1 sm:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollPrev}
                    className="w-7 h-7 rounded-full border-gray-200 hover:border-primary hover:text-primary transition-colors bg-white shadow-sm"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollNext}
                    className="w-7 h-7 rounded-full border-gray-200 hover:border-primary hover:text-primary transition-colors bg-white shadow-sm"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-3.5 h-3.5" />
                </Button>
            </div>

            {/* Carousel Container with padding to avoid clipping */}
            <div className="overflow-hidden sm:overflow-visible py-2 px-1 -mx-1" ref={emblaRef}>
                <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_100%] min-w-0 sm:flex-none sm:w-auto"
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
