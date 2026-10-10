'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

import fssaiImg from '@/fssai.jpg';
import fdaImg from '@/fda.jpg';
import haccpImg from '@/haccp.jpg';
import mpedaImg from '@/mpeda.jpg';
import eiaImg from '@/eia.jpg';
import aeoImg from '@/aeo.jpg';

const certifications = [
    {
        category: "Certifications",
        items: [
            {
                name: "FSSAI",
                subtitle: "Food Safety & Standards Authority of India",
                desc: "FSSAI certification ensures that all our products meet the food safety and hygiene standards mandated by the Government of India. Every product we deliver is safe, properly labelled, and regularly audited.",
                image: fssaiImg,
                features: ["Safe for human consumption", "No harmful contaminants", "Proper labeling standards", "Regular quality audits"]
            },
            {
                name: "FDA",
                subtitle: "U.S. Food & Drug Administration",
                desc: "FDA registration and compliance enables Wave of Bengal to meet the stringent food safety requirements of the United States market, ensuring our seafood is globally trusted.",
                image: fdaImg,
                features: ["Meets U.S. food safety standards", "Proper hazard controls", "International market compliance", "Rigorous inspection protocols"]
            },
            {
                name: "HACCP",
                subtitle: "Hazard Analysis Critical Control Points",
                desc: "HACCP certification demonstrates our commitment to identifying and preventing hazards throughout the food production process, from catch to delivery.",
                image: haccpImg,
                features: ["Systematic hazard prevention", "Critical control point monitoring", "Documentation & verification", "Continuous improvement"]
            },
            {
                name: "MPEDA",
                subtitle: "Marine Products Export Development Authority",
                desc: "MPEDA registration certifies Wave of Bengal as an approved seafood processor and exporter under the Government of India, enabling us to serve international markets with confidence.",
                image: mpedaImg,
                features: ["Government-approved exporter", "Marine product quality standards", "Export facilitation support", "Regular compliance audits"]
            },
            {
                name: "EIA / EIC",
                subtitle: "Export Inspection Agency / Council, Govt. of India",
                desc: "EIC approval including our competent in-house lab ensures that every batch of seafood processed by Wave of Bengal meets international export quality and safety standards mandated by the Government of India.",
                image: eiaImg,
                features: ["Approved in-house laboratory", "Export quality assurance", "Government of India certified", "Batch-level quality testing"]
            },
            {
                name: "AEO",
                subtitle: "Authorized Economic Operator",
                desc: "AEO certification by Indian Customs recognises Wave of Bengal as a trusted, compliant, and secure trade partner — enabling faster clearances and streamlined export operations.",
                image: aeoImg,
                features: ["Customs-trusted operator", "Faster export clearances", "Secure supply chain", "Trade compliance excellence"]
            }
        ]
    }
];

const qualityNumbers = [
    { number: "98%", label: "Freshness Score", text: "Average freshness rating based on lab tests" },
    { number: "0-4°C", label: "Cold Chain", text: "Temperature maintained from catch to delivery" },
    { number: "24hr", label: "Catch to Table", text: "Maximum time from ocean to your doorstep" },
    { number: "100%", label: "Traceable", text: "Every product tracked from source" }
];

const traceSteps = [
    { icon: "📅", title: "Catch Date & Time", desc: "Know exactly when your seafood was caught — often the same morning it reaches you." },
    { icon: "📍", title: "Catch Location", desc: "GPS coordinates of the fishing zone, including the specific waters of the Bay of Bengal." },
    { icon: "🎣", title: "Fishing Method", desc: "Details on whether it was line-caught, net-caught, or harvested — and always sustainable." },
    { icon: "🚢", title: "Vessel Information", desc: "Licensed boat details and crew information for complete transparency." },
    { icon: "🧊", title: "Storage Conditions", desc: "Temperature logs throughout the journey ensuring cold chain integrity." },
    { icon: "🔬", title: "Lab Test Results", desc: "Bacterial counts, freshness scores, and safety verification for every batch." }
];

const labTests = [
    { icon: "🦠", title: "Bacterial Count", desc: "Testing for harmful bacteria levels" },
    { icon: "⚗️", title: "Heavy Metals", desc: "Mercury, lead, and cadmium screening" },
    { icon: "💊", title: "Antibiotics", desc: "Zero antibiotic residue guaranteed" },
    { icon: "🧪", title: "Freshness Index", desc: "TVB-N and other freshness markers" },
    { icon: "🌡️", title: "Temperature Log", desc: "Continuous cold chain verification" },
    { icon: "✅", title: "Final QC Check", desc: "Visual & sensory quality approval" }
];

export default function Certifications() {
    return (
        <div className="relative min-h-screen bg-[#0a1628] pt-24 pb-20 text-white">

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
            <div className="relative z-10">

                {/* ═══════════ HERO HEADER ═══════════ */}
                <div className="relative py-28 overflow-hidden mb-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {/* Decorative accent */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="w-32 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-10"
                        />
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block text-[#FFFDD0] uppercase tracking-[0.3em] text-sm font-bold mb-6"
                        >
                            Standards & Compliance
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15 }}
                            className="text-6xl md:text-7xl lg:text-8xl font-cinzel font-black text-white mb-8 drop-shadow-lg leading-[0.95]"
                        >
                            Uncompromised <span className="text-[#FFFDD0] italic">Quality</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium drop-shadow-md italic leading-relaxed"
                        >
                            Industry-leading standards that guarantee quality, safety, and sustainability in every product.
                            <span className="block mt-4 text-lg text-white/70 italic">At Wave of Bengal, we don't just promise quality — we prove it. Every product we deliver meets rigorous international standards, verified by independent certification bodies.</span>
                        </motion.p>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                            className="w-32 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent mx-auto mt-10"
                        />
                    </div>
                </div>

                {/* ═══════════ CERTIFICATIONS ═══════════ */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {certifications.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="relative">

                                {/* Category Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 mb-12"
                                >
                                    <h2 className="text-3xl md:text-4xl font-fraunces font-black text-[#FFFDD0] whitespace-nowrap drop-shadow-lg">{section.category}</h2>
                                    <div className="w-full h-[2px] bg-linear-to-r from-white/30 to-transparent"></div>
                                </motion.div>

                                {/* Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {section.items.map((item, itemIdx) => (
                                        <motion.div
                                            key={itemIdx}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.7, delay: itemIdx * 0.15 }}
                                            className="flex flex-col sm:flex-row gap-8 glass-card p-10 hover:border-gold/25 hover:-translate-y-2 transition-all duration-500 group"
                                        >
                                            <div className="shrink-0">
                                                <div className="w-32 h-32 rounded-2xl bg-white/90 border border-white/15 flex items-center justify-center group-hover:border-gold/30 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-500 overflow-hidden p-2">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={112}
                                                        height={112}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-playfair font-bold text-[#FFFDD0] mb-1 group-hover:text-[#FFFDD0]/80 transition-colors">{item.name}</h3>
                                                {item.subtitle && <p className="text-sm text-white italic mb-3">{item.subtitle}</p>}
                                                <p className="text-white/60 text-base leading-relaxed group-hover:text-white/75 transition-colors mb-4">{item.desc}</p>

                                                {item.features && item.features.length > 0 && (
                                                    <ul className="space-y-2">
                                                        {item.features.map((feature, fIdx) => (
                                                            <li key={fIdx} className="flex items-start gap-2 text-sm text-white/60 group-hover:text-white/75 transition-colors">
                                                                <span className="text-white shrink-0 mt-0.5">✓</span>
                                                                <span>{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ═══════════ QUALITY BY NUMBERS ═══════════ */}
                    <div className="relative py-20 mt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-fraunces font-black text-[#FFFDD0] whitespace-nowrap drop-shadow-lg">Quality by Numbers</h2>
                            <div className="w-full h-[2px] bg-linear-to-r from-white/30 to-transparent"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {qualityNumbers.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="glass-card p-8 text-center"
                                >
                                    <h4 className="text-5xl font-heading font-black text-white mb-3">{stat.number}</h4>
                                    <p className="text-lg font-bold text-[#FFFDD0] mb-2">{stat.label}</p>
                                    <p className="text-sm text-white/60">{stat.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ═══════════ FULL TRACEABILITY ═══════════ */}
                    <div className="relative py-20 mt-10">
                        <div className="mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-6 mb-4"
                            >
                                <h2 className="text-3xl md:text-4xl font-fraunces font-black text-[#FFFDD0] whitespace-nowrap drop-shadow-lg">Full Traceability</h2>
                                <div className="w-full h-[2px] bg-linear-to-r from-white/30 to-transparent"></div>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-white/70 italic"
                            >
                                Every product comes with complete traceability information. Know exactly where your seafood comes from.
                            </motion.p>
                        </div>

                        <div className="space-y-6 max-w-4xl mx-auto">
                            {traceSteps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="flex flex-col sm:flex-row gap-6 glass-card p-6 md:p-8 items-start sm:items-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-3xl">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                        <p className="text-white/70">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ═══════════ LAB TESTING STANDARDS ═══════════ */}
                    <div className="relative py-24 mt-16">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 mb-4"
                                >
                                    <h2 className="text-3xl md:text-4xl font-fraunces font-black text-[#FFFDD0] whitespace-nowrap drop-shadow-lg">Lab Testing Standards</h2>
                                    <div className="w-full h-[2px] bg-linear-to-r from-white/30 to-transparent"></div>
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg text-white/70 italic"
                                >
                                    Every batch undergoes rigorous laboratory testing before it reaches you.
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                {labTests.map((test, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="glass-card p-6 text-center hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="text-4xl mb-4">{test.icon}</div>
                                        <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">{test.title}</h4>
                                        <p className="text-xs text-white/60 leading-relaxed">{test.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ═══════════ GUARANTEE SECTION ═══════════ */}
                    <div className="relative py-24 mt-10 overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-y border-gold/15 rounded-2xl-3xl" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] rounded-2xl-3xl" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 text-center px-8"
                        >
                            <span className="text-[#FFFDD0] uppercase tracking-[0.25em] text-sm font-bold mb-6 block">Our Promise</span>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-black text-white mb-6 drop-shadow-lg">
                                Quality You Can <span className="text-[#FFFDD0] italic">Trust</span>
                            </h3>
                            <div className="w-20 h-[3px] bg-linear-to-r from-gold via-gold-light to-gold mx-auto rounded-full mb-8" />
                            <p className="text-white/65 text-xl max-w-3xl mx-auto leading-relaxed">
                                Experience the difference that certified quality makes. Taste the freshness, feel the assurance.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}