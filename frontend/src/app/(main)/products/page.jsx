'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import lighthouseImg from '@/lighthouse.png';
import waveImg from '@/wave.png';

// Product Data
const DEFAULT_PRODUCTS = [
    {
        id: 'black-tiger-prawns',
        name: 'Black Tiger Prawns',
        description: 'Our flagship variety - large, succulent prawns with distinctive black stripes.',
        weight: '500g',
        price: 1200,
        category: 'Prawns',
        stock: 100,
        status: 'active',
        image: '/images/black%20tiger.jpeg',
        rating: 5
    },
    {
        id: 'butter-prawns',
        name: 'Butter Prawns',
        description: 'Marinated in rich garlic butter and aromatic herbs. Ready to sauté or grill.',
        weight: '500g',
        price: 950,
        category: 'Prawns',
        stock: 80,
        status: 'active',
        image: '/images/butter%20prawns%20.jpeg',
        rating: 4
    },
    {
        id: 'prawn-skewers',
        name: 'Prawn Skewers',
        description: 'Expertly threaded and seasoned prawns on bamboo skewers for BBQ & grilling.',
        weight: '400g (6 skewers)',
        price: 850,
        category: 'Ready-to-Cook',
        stock: 60,
        status: 'active',
        image: '/images/skewers.jpeg',
        rating: 5
    },
    {
        id: 'vannamei-prawns',
        name: 'Vannamei Prawns',
        description: 'Premium white prawns with delicate, sweet flavor for all cooking methods.',
        weight: '500g',
        price: 750,
        category: 'Prawns',
        stock: 120,
        status: 'active',
        image: '/images/black%20tiger.jpeg',
        rating: 4
    },
    {
        id: 'headless-peeled-shrimp',
        name: 'Headless Peeled Shrimp',
        description: 'Cleaned, deveined and ready to cook. Saves prep time with premium freshness.',
        weight: '500g',
        price: 800,
        category: 'Prawns',
        stock: 90,
        status: 'active',
        image: '/images/butter%20prawns%20.jpeg',
        rating: 3
    },
    {
        id: 'shrimp-ebi-fry',
        name: 'Shrimp Ebi Fry',
        description: 'Japanese-style breaded prawns, pre-seasoned and ready to fry to crispy perfection.',
        weight: '400g (10 pieces)',
        price: 900,
        category: 'Ready-to-Cook',
        stock: 70,
        status: 'active',
        image: '/images/skewers.jpeg',
        rating: 5
    },
    {
        id: 'connoisseurs-collection',
        name: "Connoisseur's Collection",
        description: 'Experience our signature trio: Black Tiger (250g), Vannamei (250g), Butter Prawns (250g).',
        weight: '750g Total',
        price: 1350,
        category: 'Signature Dishes',
        stock: 50,
        status: 'active',
        image: '/images/black%20tiger.jpeg',
        rating: 5
    },
    {
        id: 'chefs-starter-pack',
        name: "Chef's Starter Pack",
        description: 'Ready-to-cook premium selections: Butterfly Cut (250g), Marinated Shrimp (250g), Skewers (200g).',
        weight: '700g Total',
        price: 1250,
        category: "Chef's Special",
        stock: 40,
        status: 'active',
        image: '/images/butter%20prawns%20.jpeg',
        rating: 4
    },
    {
        id: 'trial-prawn-sampler',
        name: 'Trial Prawn Sampler',
        description: 'Try our best-sellers: Black Tiger (100g), Vannamei (100g), Butter Prawns (100g). Perfect for first-time buyers.',
        weight: '300g Total',
        price: 499,
        category: 'Trial Packs',
        stock: 100,
        status: 'active',
        image: '/images/black%20tiger.jpeg',
        rating: 5
    },
    {
        id: 'trial-ready-to-cook',
        name: 'Trial Ready-to-Cook Box',
        description: 'Mini portions of Ebi Fry (150g) and Prawn Skewers (150g). Taste before you commit!',
        weight: '300g Total',
        price: 449,
        category: 'Trial Packs',
        stock: 80,
        status: 'active',
        image: '/images/skewers.jpeg',
        rating: 4
    },
    {
        id: 'chefs-bengali-special',
        name: "Chef's Bengali Special",
        description: 'Authentic Bengali-style marinated prawns with mustard, turmeric & green chili. A true Kolkata delicacy.',
        weight: '500g',
        price: 1100,
        category: "Chef's Special",
        stock: 35,
        status: 'active',
        image: '/images/butter%20prawns%20.jpeg',
        rating: 5
    },
    {
        id: 'signature-bay-platter',
        name: 'Bay of Bengal Platter',
        description: 'Our crown jewel — hand-picked jumbo Black Tiger, Vannamei, and seasoned Scampi in one premium box.',
        weight: '1 Kg Total',
        price: 2200,
        category: 'Signature Dishes',
        stock: 25,
        status: 'active',
        image: '/images/black%20tiger.jpeg',
        rating: 5
    }
];

const CATEGORIES = ['All', 'Prawns', 'Ready-to-Cook', 'Trial Packs', 'Signature Dishes', "Chef's Special"];

// Star rating component
function StarRating({ rating }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-amber-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function ProductsPage() {
    const { addToCart } = useCart();
    const [activeCategory, setActiveCategory] = useState('All');
    const [products, setProducts] = useState(DEFAULT_PRODUCTS);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        const storedProducts = localStorage.getItem('wob_products');
        if (storedProducts) {
            try {
                const parsed = JSON.parse(storedProducts);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setProducts(parsed.map(p => ({
                        ...p,
                        image: p.image || '/images/black%20tiger.jpeg',
                        rating: p.rating || 4
                    })));
                }
            } catch (e) {
                console.error("Failed to parse wob_products", e);
            }
        }
    }, []);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleAddToCart = (product) => {
        const firstSize = product.sizes?.[0]
        addToCart({
            id: product.id,
            name: product.name,
            size: firstSize?.label || product.weight,
            price: firstSize?.price || product.price
        }, 1);
        triggerToast(`${product.name} added to cart!`);
    };

    const activeProducts = products.filter(p => p.status === 'active');
    const filteredProducts = activeProducts.filter(p =>
        activeCategory === 'All' || p.category === activeCategory
    );

    return (
        <div className="min-h-screen relative">
            {/* Ocean Wave Background */}
            <div className="fixed inset-0 z-0">
                <Image
                    src={waveImg}
                    alt=""
                    fill
                    className="object-cover"
                    placeholder="blur"
                    priority
                />
                {/* Centered Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Image
                        src="/images/WOB-black-4.png"
                        alt=""
                        width={500}
                        height={500}
                        className="w-[60vw] md:w-[35vw] lg:w-[25vw] max-w-[500px] object-contain opacity-15"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">

                {/* Cinematic Lighthouse Hero */}
                <section className="hero-lighthouse relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] max-h-[900px] overflow-hidden">
                    {/* Hero Image */}
                    <Image
                        src={lighthouseImg}
                        alt="Cinematic ocean with lighthouse"
                        fill
                        className="object-contain md:object-cover md:object-[center_35%] hero-lighthouse-img"
                        priority
                        placeholder="blur"
                    />

                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/50 z-10" />

                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
                    >
                        {/* Decorative line */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 md:w-20 h-px bg-[#C8A96A]/60" />
                            <span className="text-[#C8A96A] text-xs md:text-sm font-bold tracking-[0.3em] uppercase">Savour the Finest</span>
                            <div className="w-12 md:w-20 h-px bg-[#C8A96A]/60" />
                        </div>

                        <h1 className="font-playfair text-4xl md:text-[52px] lg:text-6xl text-white font-bold tracking-[2px] uppercase leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                            Our Signature Selection
                        </h1>

                        <p className="mt-4 text-white/90 text-base md:text-lg max-w-xl font-light tracking-wide">
                            Explore our finest selection of export-grade seafood, instantly frozen to lock in time.
                        </p>

                        {/* Scroll indicator */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="mt-10"
                        >
                            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </section>

                <div className="pt-12">

                {/* Category Filter Pills */}
                <div className="flex justify-center gap-3 mb-14 px-4 flex-wrap">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${activeCategory === category
                                ? 'btn-gold border-[#c5a061] shadow-md'
                                : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.4 }}
                                        className="group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/15 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-400 overflow-hidden"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-64 overflow-hidden bg-white/5">
                                            {(product.image || '').startsWith('data:') ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            ) : (
                                                <Image
                                                    src={product.image || '/images/black%20tiger.jpeg'}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    unoptimized
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-white mb-1">
                                                {product.name}
                                            </h3>

                                            <p className="text-white/60 text-xs mb-3 font-medium">
                                                Starting at <span className="text-[#C8A96A] font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                                            </p>

                                            {/* Star Rating */}
                                            {product.rating && (
                                                <div className="mb-4">
                                                    <StarRating rating={product.rating} />
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    className="btn-gold flex-1 py-2.5 text-center text-sm rounded-full"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="btn-gold w-11 h-11 flex items-center justify-center rounded-full"
                                                    title="Add to Cart"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/15"
                        >
                            <svg className="w-16 h-16 text-white/30 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <h3 className="text-2xl text-white mb-3 font-bold">No products found</h3>
                            <p className="text-white/50 mb-8">Try selecting a different category.</p>
                            <button
                                onClick={() => setActiveCategory('All')}
                                className="btn-gold px-8 py-3 rounded-full"
                            >
                                View All
                            </button>
                        </motion.div>
                    )}
                </div>

                </div>

                {/* Trust Badges - Inline Bar */}
                <div className="max-w-5xl mx-auto mt-20 px-4">
                    <div className="flex items-center justify-center flex-wrap divide-x divide-white/20">

                        {/* IQF */}
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-[#C8A96A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            <div>
                                <span className="text-sm font-bold text-white tracking-wide">IQF</span>
                                <p className="text-[11px] text-white/50 italic">Individually Quick Frozen</p>
                            </div>
                        </div>

                        {/* Export Quality */}
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-[#C8A96A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div>
                                <span className="text-sm font-bold text-white tracking-wide">Export Quality</span>
                                <p className="text-[11px] text-white/50 italic">Only the best export-grade seafood</p>
                            </div>
                        </div>

                        {/* Cold Chain */}
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-[#C8A96A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                            <div>
                                <span className="text-sm font-bold text-white tracking-wide">Cold Chain</span>
                                <p className="text-[11px] text-white/50 italic">Maintained at optimal temperatures</p>
                            </div>
                        </div>

                    </div>
                </div>


            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 right-8 bg-stone-800 text-white px-6 py-4 rounded-2xl flex items-center gap-3 z-50 shadow-2xl border border-stone-600"
                    >
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="font-medium text-sm tracking-wide">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
