'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const pillars = [
    {
        title: "Quota-Based Sourcing",
        description: "We work strictly within government and ecological quotas. When a species needs time to replenish, we remove it from our catalog. No exceptions.",
        icon: (
            <svg className="w-10 h-10 text-[#c5a061] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        )
    },
    {
        title: "Zero Bycatch Policy",
        description: "Our fishers utilize selective gear designed to target specific species, drastically reducing the unintended capture of marine life.",
        icon: (
            <svg className="w-10 h-10 text-[#c5a061] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
        )
    },
    {
        title: "Fair Trade Communities",
        description: "Sustainability applies to people, too. We guarantee fair wages and direct trade with local fishing communities, removing exploitative middlemen.",
        icon: (
            <svg className="w-10 h-10 text-[#c5a061] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        )
    }
];

const commitments = [
    {
        year: "2018",
        title: "Sustainable Sourcing Pledge",
        description: "We committed to sourcing 100% of our seafood from verified sustainable fisheries, working directly with local fishermen who share our values.",
        highlight: "The promise"
    },
    {
        year: "2020",
        title: "Zero-Waste Processing",
        description: "Our processing facilities achieved zero-waste certification, ensuring every part of the catch is utilized — nothing goes to waste.",
        highlight: "Full circle"
    },
    {
        year: "2023",
        title: "Carbon-Neutral Delivery",
        description: "We offset 100% of our delivery emissions through ocean conservation partnerships, making every order carbon neutral from boat to doorstep.",
        highlight: "Green logistics"
    },
    {
        year: "Today",
        title: "Protecting Marine Habitats",
        description: "A portion of every sale funds the restoration and protection of Bay of Bengal marine habitats, ensuring thriving oceans for generations to come.",
        highlight: "Giving back"
    }
];

export default function Sustainability() {
    return (
        <div className="relative min-h-screen bg-[#0a1628] text-white">

            {/* Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/bg/admin-bg.jpeg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-[#0a1628]/60" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 pt-24 pb-20">

                {/* ═══════════ HERO HEADER ═══════════ */}
                <div className="relative py-28 overflow-hidden mb-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {/* Decorative accent */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="w-32 h-[2px] bg-linear-to-r from-transparent via-[#c5a061] to-transparent mx-auto mb-10"
                        />
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block text-[#c5a061] uppercase tracking-[0.3em] text-sm font-bold mb-6"
                        >
                            Ocean Stewardship
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15 }}
                            className="text-6xl md:text-7xl lg:text-8xl font-cinzel font-black text-white mb-8 drop-shadow-lg leading-[0.95]"
                        >
                            Protecting Our <span className="text-[#FFFDD0] italic">Oceans</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium drop-shadow-md italic leading-relaxed"
                        >
                            We take only what nature can replenish. Our commitment to sustainability
                            isn't just a label — it's the core operational principle of Wave of Bengal.
                        </motion.p>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                            className="w-32 h-[2px] bg-linear-to-r from-transparent via-[#c5a061] to-transparent mx-auto mt-10"
                        />
                    </div>
                </div>

                {/* ═══════════ THREE PILLARS ═══════════ */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-6 mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-fraunces font-black text-[#FFFDD0] whitespace-nowrap drop-shadow-lg">The Three Pillars</h2>
                        <div className="w-full h-[2px] bg-linear-to-r from-white/30 to-transparent"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 hover:border-[#c5a061]/30 hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <div className="flex justify-center transform group-hover:-translate-y-2 transition-transform duration-300">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-playfair font-bold text-white mb-4 uppercase tracking-wide">{pillar.title}</h3>
                                <p className="text-white/70 text-sm leading-relaxed font-medium">{pillar.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══════════ OUR COMMITMENT TIMELINE ═══════════ */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <span className="text-[#c5a061] uppercase tracking-[0.25em] text-sm font-bold mb-4 block">Our Journey</span>
                        <h2 className="text-4xl md:text-5xl font-fraunces font-black text-white drop-shadow-lg leading-tight uppercase tracking-widest">
                            Commitment Timeline
                        </h2>
                        <div className="w-24 h-px bg-[#c5a061] mx-auto mt-8" />
                    </motion.div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[20px] md:left-1/2 h-full w-px bg-white/10 -translate-x-px"></div>

                        <div className="space-y-32">
                            {commitments.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Year Marker */}
                                    <div className="absolute left-[10px] md:left-1/2 w-5 h-5 bg-[#c5a061] rounded-full -translate-x-px border-4 border-[#0a1628] z-10 shadow-[0_0_15px_rgba(197,160,97,0.4)]"></div>

                                    {/* Year Display */}
                                    <div className="hidden md:block w-5/12 text-center md:text-left">
                                        <span className="text-6xl lg:text-8xl font-heading font-black text-white/5 opacity-40 select-none">{item.year}</span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-full pl-12 md:pl-0 md:w-5/12 mt-4 md:mt-0">
                                        <div className="p-8 border-l border-white/10 bg-white/5 backdrop-blur-md rounded-r- md:rounded-2xl md:border-l-0 hover:bg-white/10 transition-colors">
                                            <h3 className="text-2xl font-playfair font-bold text-[#c5a061] mb-2">{item.title}</h3>
                                            <p className="text-[#f5f0e8]/70 leading-relaxed italic mb-4 text-sm uppercase tracking-widest">{item.highlight}</p>
                                            <p className="text-[#f5f0e8]/90 leading-relaxed font-light">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ═══════════ IMPACT BY NUMBERS ═══════════ */}
                <div className="bg-white/5 backdrop-blur-lg border-y border-white/10 py-16 mt-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <span className="text-[#c5a061] uppercase tracking-[0.25em] text-sm font-bold mb-4 block">Measurable Impact</span>
                            <h2 className="text-3xl md:text-4xl font-fraunces font-black text-white drop-shadow-lg uppercase tracking-widest">Impact by Numbers</h2>
                            <div className="w-16 h-px bg-[#c5a061] mx-auto mt-6" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0 }}
                                className="p-8"
                            >
                                <p className="text-5xl md:text-6xl font-heading font-black text-[#c5a061] mb-3 drop-shadow-lg">100%</p>
                                <p className="text-white/80 font-bold uppercase tracking-wider text-sm">Traceable Catch</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-8"
                            >
                                <p className="text-5xl md:text-6xl font-heading font-black text-[#c5a061] mb-3 drop-shadow-lg">0</p>
                                <p className="text-white/80 font-bold uppercase tracking-wider text-sm">Protected Species Harvested</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-8"
                            >
                                <p className="text-5xl md:text-6xl font-heading font-black text-[#c5a061] mb-3 drop-shadow-lg">45+</p>
                                <p className="text-white/80 font-bold uppercase tracking-wider text-sm">Local Families Supported</p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* ═══════════ OCEAN PROMISE CTA ═══════════ */}
                <div className="relative py-24 mt-16 overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-y border-[#c5a061]/15 rounded-2xl-3xl mx-4 sm:mx-6 lg:mx-8" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,97,0.08)_0%,transparent_70%)] rounded-2xl-3xl mx-4 sm:mx-6 lg:mx-8" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 text-center px-8"
                    >
                        <span className="text-[#c5a061] uppercase tracking-[0.25em] text-sm font-bold mb-6 block">Our Promise</span>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-black text-white mb-6 drop-shadow-lg">
                            Our Promise to the <span className="text-[#FFFDD0] italic">Sea</span>
                        </h3>
                        <div className="w-20 h-[3px] bg-linear-to-r from-[#c5a061] via-[#d4b070] to-[#c5a061] mx-auto rounded-full mb-8" />
                        <p className="text-white/65 text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                            Every purchase supports sustainable fishing practices and the communities that depend on the ocean. Together, we can protect what nourishes us.
                        </p>
                        <Link
                            href="/products"
                            className="btn-gold inline-block px-10 py-4 text-sm rounded-2xl text-center"
                        >
                            Shop Sustainable Seafood
                        </Link>
                    </motion.div>
                </div>

                {/* Footer space */}
                <div className="py-20" />
            </div>
        </div>
    );
}
