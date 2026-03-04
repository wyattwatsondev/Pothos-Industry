'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
    title: string
    subtitle?: string
    className?: string
    align?: 'left' | 'center' | 'right'
}

export function SectionHeading({
    title,
    subtitle,
    className,
    align = 'center',
}: SectionHeadingProps) {
    const alignments = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    }

    const titleParts = title.split(' ')
    const lastWord = titleParts.pop()
    const mainPart = titleParts.join(' ')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={cn('flex flex-col mb-12 sm:mb-16', alignments[align], className)}
        >
            <div className="relative inline-block">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-charcoal tracking-tight uppercase">
                    {mainPart}{' '}
                    <span className="text-primary relative italic">
                        {lastWord}
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute -bottom-2 left-0 h-1 bg-accent hidden sm:block rounded-full"
                        />
                    </span>
                </h2>
            </div>
            {subtitle && (
                <p className="mt-4 text-gray-500 text-lg sm:text-xl max-w-2xl font-medium">
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}
