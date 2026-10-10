'use client'

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const storyFrames = [
    {
        label: 'Brand Story',
        year: 'Est. 1970s',
        heading: 'Our Story',
        body: [
            "Wave of Bengal is recognised as one of the most trusted names in seafood processing from the Eastern Coast of India, West Bengal, Kolkata. We have positioned our brand uniquely and strategically, serving consumers across India.",
            "Keeping up with the dynamism of our acquired knowledge, modern infrastructure, and innovative technology \u2014 including a competent in-house lab approved by EIC, Govt. of India \u2014 we have been committed since inception to pushing forward growth consistency from advanced shrimp processing to delivering a range of best-quality and value-added shrimps.",
            "Today, Wave of Bengal brings the finest sustainably sourced seafood directly to your doorstep in Kolkata, combining over four decades of industry expertise with state-of-the-art processing facilities.",
        ],
        cta: { label: 'Shop Fresh Catch', href: '/products' },
        scrollHint: true,
    },
    {
        label: 'The Foundation',
        year: '1970s',
        heading: 'The Foundation',
        highlight: 'Where it all began',
        body: [
            "Network building stage \u2014 we began forging strong bonds with local farmers and suppliers across West Bengal, acting as a trade channel partner and laying the groundwork for a robust supply chain.",
            "These early relationships with aquaculture farmers became the bedrock of everything Wave of Bengal stands for today.",
        ],
    },
    {
        label: 'Empowering Farmers',
        year: '1980s',
        heading: 'Empowering Farmers',
        highlight: 'Growth through partnership',
        body: [
            "We enhanced our business model by providing financial support to farmers for aquaculture investment along with buyback arrangements.",
            "This created a win-win ecosystem \u2014 empowering local communities while securing a reliable, high-quality supply of shrimp.",
        ],
    },
    {
        label: 'Processing Mastery',
        year: '1990s',
        heading: 'Processing Mastery',
        highlight: 'Supply chain excellence',
        body: [
            "We acquired responsibility of factory management for processing and reached the zenith of supply chain capability in West Bengal.",
            "Quality control became our hallmark, with every step of the process carefully monitored to ensure premium standards.",
        ],
    },
    {
        label: 'Rapid Growth',
        year: '2000s',
        heading: 'Rapid Growth',
        highlight: 'Establishing the brand',
        body: [
            "Wave of Bengal evolved as the fastest growing and most reliable processor of frozen shrimp from West Bengal.",
            "We invested heavily in building infrastructure with state-of-the-art modern processing facilities, earning international accreditations and gaining complete control over our supply chain.",
        ],
    },
    {
        label: 'Modern Era',
        year: '2013',
        heading: 'Modern Processing',
        highlight: 'State of the art',
        body: [
            "We established our modern processing unit at Rajarhat, Kolkata \u2014 strategically located within 30 minutes of Kolkata airport. Our facility accommodates 500 workers equipped with advanced safety measures and BSCI-approved social compliances.",
            "Wave of Bengal took the lead in certifying aquaculture shrimp farms through independent bodies such as ASC and BAP, championing environmental sustainability and social responsibility.",
        ],
    },
    {
        label: 'Serving India',
        year: '2025',
        heading: 'Serving India',
        highlight: 'A new chapter begins',
        body: [
            "Wave of Bengal began serving consumers directly in India, starting from Kolkata. We stand with our core fundamentals \u2014 engaging with our farmers and customers, creating better supply chains, and meeting consumer needs with refined services, teamwork, and flawless management.",
            "From the Bay of Bengal to your doorstep \u2014 premium, sustainably sourced seafood, now just a click away.",
        ],
        cta: { label: 'Shop Fresh Catch', href: '/products' }
    },
];

function StoryFrame({ frame, scrollYProgress, index, total }) {
    const start = index / total;
    const end = (index + 1) / total;
    // Frame 0 must be fully visible at scroll=0 (no fade-in delay)
    const opacityInput = index === 0
        ? [0, end - 0.05, end]
        : [start, start + 0.05, end - 0.05, end];
    const opacityOutput = index === 0
        ? [1, 1, 0]
        : [0, 1, 1, 0];
    const yInput = index === 0
        ? [0, end - 0.05, end]
        : [start, start + 0.05, end - 0.05, end];
    const yOutput = index === 0
        ? [0, 0, -40]
        : [40, 0, 0, -40];
    const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
    const y = useTransform(scrollYProgress, yInput, yOutput);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-20 py-12 overflow-y-auto"
        >
            <span className="text-[#c5a061] text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                {frame.year}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-black text-white mb-3 tracking-tight leading-[1.15] break-words">
                {frame.heading}
            </h2>
            {frame.highlight && (
                <p className="text-[#f5f0e8]/50 italic uppercase tracking-widest text-xs mb-7">{frame.highlight}</p>
            )}
            <div className="space-y-4 text-base md:text-lg text-[#f5f0e8]/75 font-light leading-relaxed max-w-lg">
                {frame.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {frame.cta && (
                <div className="mt-10">
                    <Link
                        href={frame.cta.href}
                        className="inline-block px-8 py-3.5 border-2 border-white/40 text-white font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 hover:border-white transition-all duration-300"
                    >
                        {frame.cta.label}
                    </Link>
                </div>
            )}
            {frame.scrollHint && (
                <div className="mt-12 flex items-center gap-3 text-white/30">
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.div>
                    <span className="text-xs uppercase tracking-widest font-semibold">Scroll to explore our journey</span>
                </div>
            )}
        </motion.div>
    );
}

function StoryDot({ scrollYProgress, index, total, label }) {
    const start = index / total;
    const mid = (index + 0.5) / total;
    const end = (index + 1) / total;
    const opacity = useTransform(scrollYProgress, [start, mid, end], [0.25, 1, 0.25]);
    const scale = useTransform(scrollYProgress, [start, mid, end], [0.7, 1.4, 0.7]);
    return (
        <motion.div
            style={{ opacity, scale }}
            className="w-2 h-2 rounded-full bg-[#c5a061]"
            title={label}
        />
    );
}

function StoryHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const numFrames = storyFrames.length;

    return (
        <div
            ref={containerRef}
            className="relative z-10 pt-16"
            style={{ height: `${numFrames * 100}vh` }}
        >
            {/* Sticky wrapper — left and right both stick */}
            <div className="sticky top-0 h-screen flex overflow-hidden">

                {/* LEFT: constant boat image */}
                <div className="relative w-1/2 h-full shrink-0 overflow-hidden">
                    <Image
                        src="/images/boat-story.png"
                        alt="Fishing boat at night"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Atmospheric particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(14)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-white/25 rounded-full blur-[1px]"
                                style={{
                                    top: `${(i * 17 + 5) % 95}%`,
                                    left: `${(i * 13 + 8) % 92}%`,
                                }}
                                animate={{ opacity: [0.15, 0.65, 0.15], scale: [0.7, 1.3, 0.7] }}
                                transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                            />
                        ))}
                    </div>
                    {/* Gradient edge to blend */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0a1628]" />
                </div>

                {/* RIGHT: parallax frames */}
                <div className="relative w-1/2 h-full bg-[#0a1628]">
                    {storyFrames.map((frame, i) => (
                        <StoryFrame
                            key={i}
                            frame={frame}
                            scrollYProgress={scrollYProgress}
                            index={i}
                            total={numFrames}
                        />
                    ))}

                    {/* Dot nav indicator */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                        {storyFrames.map((f, i) => (
                            <StoryDot
                                key={i}
                                scrollYProgress={scrollYProgress}
                                index={i}
                                total={numFrames}
                                label={f.label}
                            />
                        ))}
                    </div>

                    {/* Scroll progress bar along bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
                        <motion.div
                            className="h-full bg-[#c5a061]/60"
                            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}





const values = [
    {
        icon: "🦐",
        title: "Uncompromising Quality",
        description: "Complete quality control at every stage — from farm to processing to delivery. Our state-of-the-art facility with international accreditation ensures only the finest shrimp reaches you.",
        accent: "from-amber-400 to-orange-500"
    },
    {
        icon: "🌊",
        title: "Sustainable Aquaculture",
        description: "We champion environmental sustainability by certifying our aquaculture shrimp farms through independent bodies like ASC and BAP, promoting responsible farming practices.",
        accent: "from-cyan-400 to-blue-500"
    },
    {
        icon: "🤝",
        title: "Farmer Partnerships",
        description: "Over 40 years of engaging with our farmers — providing financial support, buyback arrangements, and building a supply chain rooted in trust and mutual growth.",
        accent: "from-emerald-400 to-green-500"
    },
    {
        icon: "❄️",
        title: "Modern Processing",
        description: "Our state-of-the-art facility at Rajarhat, Kolkata — within 30 minutes of the airport — features advanced infrastructure with BSCI-approved social compliances and accommodation for 500 workers.",
        accent: "from-sky-400 to-indigo-500"
    },
    {
        icon: "🔍",
        title: "Certified Excellence",
        description: "International accreditations including ASC and BAP certifications ensure our shrimp meets the highest global standards for quality, sustainability, and traceability.",
        accent: "from-violet-400 to-purple-500"
    },
    {
        icon: "💚",
        title: "Serving Kolkata",
        description: "Now bringing Eastern India's finest sustainably sourced shrimp directly to consumers in Kolkata — premium quality from the Bay of Bengal to your doorstep.",
        accent: "from-rose-400 to-pink-500"
    }
];




export default function OurStory() {
    return (
        <div className="relative min-h-screen bg-[#0a1628] text-white">

            {/* ═══════════ STICKY LEFT / PARALLAX RIGHT — full journey ═══════════ */}
            <StoryHero />


            {/* Fixed Background Image (below hero) */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/bg/admin-bg.jpeg"
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={90}
                />
                <div className="absolute inset-0 bg-[#0a1628]/60" />
            </div>



            {/* ═══════════ VALUES SECTION ═══════════ */}
            <div className="relative z-10 bg-white/2 py-24 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-4xl font-fraunces font-black text-white uppercase tracking-widest">Our Guiding Values</h2>
                    <div className="w-16 h-px bg-[#c5a061] mx-auto mt-6" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:border-[#c5a061]/30 transition-all duration-300"
                        >
                            <span className="text-4xl block mb-6">{value.icon}</span>
                            <h3 className="text-xl font-playfair font-bold text-white mb-4 uppercase tracking-wide">{value.title}</h3>
                            <p className="text-[#f5f0e8]/70 font-light leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer space */}
            <div className="py-20" />

        </div>
    );
}
