import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbsProps {
    items: { label: string; href: string }[]
}

export function ProductBreadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 mb-8 py-4">
            <Link href="/" className="hover:text-black transition-colors">Homepage</Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    <Link
                        href={item.href}
                        className={`hover:text-black transition-colors ${index === items.length - 1 ? 'text-gray-400 pointer-events-none' : ''}`}
                    >
                        {item.label}
                    </Link>
                </React.Fragment>
            ))}
        </nav>
    )
}

import React from 'react'
