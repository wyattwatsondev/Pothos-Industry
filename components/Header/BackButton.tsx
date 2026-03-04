'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BackButton() {
    const router = useRouter()
    const pathname = usePathname()

    // Don't show the back button on the homepage
    if (pathname === '/') return null

    return (
        <div className="bg-white border-b border-gray-100">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-black hover:bg-gray-100 -ml-2 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back</span>
                </Button>
            </div>
        </div>
    )
}
