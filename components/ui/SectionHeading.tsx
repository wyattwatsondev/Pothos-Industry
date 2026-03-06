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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn('flex flex-col mb-12 sm:mb-20', alignments[align], className)}
        >
            {/* Decorative Pre-title */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
            >
                <div className="h-[1px] w-8 bg-black/90 hidden sm:block" />
                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400">
                    Premium Collection
                </span>
                <div className="h-[1px] w-8 bg-black/90 hidden sm:block" />
            </motion.div>

            {/* Main Title */}
            <div className="relative">
                <h2 className="text-2xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-charcoal tracking-tighter leading-none uppercase">
                    {title.split(' ').map((word, i) => (
                        <span key={i} className="inline-block mr-3">
                            {word}
                        </span>
                    ))}
                </h2>

                {/* Decorative underline element */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className={cn(
                        "h-1 bg-primary/20 mt-4 rounded-full",
                        align === 'center' ? "mx-auto" : align === 'right' ? "ml-auto" : ""
                    )}
                />
            </div>

            {/* Subtitle */}
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-gray-600 text-xs sm:text-sm max-w-xl font-bold uppercase tracking-widest leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    )
}
