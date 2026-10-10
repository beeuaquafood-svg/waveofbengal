'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg/landingpagebg.png"
                    alt="Ocean waves"
                    fill
                    className="object-cover object-center"
                    quality={95}
                    priority
                />
                {/* No overlay — clean background */}
            </div>

            {/* Subtle particle/star dots */}
            <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.1, 0.6, 0.1],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">

                {/* Logo / Crest */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="-mb-8"
                >
                    <Image
                        src="/images/wob-crest.png"
                        alt="Wave of Bengal Crest"
                        width={800}
                        height={800}
                        className="drop-shadow-2xl"
                    />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-lg md:text-xl text-[#f5f0e8]/80 mb-10 text-center max-w-lg font-medium tracking-wide"
                >
                    Export-grade seafood at peak freshness
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/products"
                        className="btn-gold px-8 py-4 text-sm rounded-2xl text-center"
                    >
                        Shop Premium Seafood
                    </Link>
                    <Link
                        href="/our-story"
                        className="px-8 py-4 border-2 border-[#f5f0e8]/40 text-[#f5f0e8] font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-[#f5f0e8]/10 hover:border-[#f5f0e8]/70 transition-all duration-300 text-center"
                    >
                        Explore Our Story
                    </Link>
                </motion.div>
            </div>

            {/* Bottom gold accent line */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="h-[3px] bg-linear-to-r from-transparent via-[#c5a061] to-transparent" />
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#f5f0e8]/50 mb-3 font-bold">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-px h-8 bg-linear-to-b from-[#c5a061]/60 to-transparent"
                />
            </motion.div>
        </section>
    )
}