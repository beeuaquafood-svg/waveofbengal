'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const PRODUCTS = {
    'black-tiger-prawns': {
        id: 'black-tiger-prawns',
        name: 'King Prawns',
        displayName: 'King Prawns (250g)',
        subtitle: 'Large Premium Size | Bay of Bengal | Super Quality',
        description: 'Succulent, jumbo-sized tiger prawns caught daily from the deep waters of the Bay of Bengal. Known for their firm texture and sweet, oceanic flavor. Perfect for grilling, curries, or pan-searing.',
        weight: '250g',
        price: 1200,
        image: '/images/black%20tiger.jpeg',
        rating: 5,
        badges: ['IQF', 'Export Quality', 'Cold Chain'],
        whatYouReceive: 'Carefully cleaned and frozen at peak freshness.',
        preparation: 'Ready-to-Cook. Thaw before use.',
        sizes: [
            { id: '200g', label: '200g', price: 980 },
            { id: '250g', label: '250g', price: 1200 },
            { id: '500g', label: '500g', price: 2200 },
            { id: '1kg', label: '1 Kg', price: 4200 }
        ]
    },
    'butter-prawns': {
        id: 'butter-prawns',
        name: 'Butter Prawns',
        displayName: 'Butter Prawns (500g)',
        subtitle: 'Marinated | Ready-to-Cook | Premium Selection',
        description: 'Authentic Bengali style marinated prawns, infused with garlic butter and aromatic herbs. Ready to be golden-fried to perfection. A coastal street food delicacy.',
        weight: '500g',
        price: 950,
        image: '/images/butter%20prawns%20.jpeg',
        rating: 4,
        badges: ['IQF', 'Export Quality', 'Cold Chain'],
        whatYouReceive: 'Tenderfully cleaned and ready to peak freshness.',
        preparation: 'Ready-to-Cook. Thaw before use.',
        sizes: [
            { id: '200g', label: '200g', price: 420 },
            { id: '250g', label: '250g', price: 500 },
            { id: '500g', label: '500g', price: 950 },
            { id: '1kg', label: '1 Kg', price: 1800 }
        ]
    },
    'prawn-skewers': {
        id: 'prawn-skewers',
        name: 'Prawn Skewers',
        displayName: 'Prawn Skewers (400g)',
        subtitle: 'BBQ Ready | 6 Skewers | Seasoned',
        description: 'Expertly threaded and seasoned prawns on bamboo skewers for BBQ & grilling. Pre-marinated with signature spice blend.',
        weight: '400g',
        price: 850,
        image: '/images/skewers.jpeg',
        rating: 5,
        badges: ['IQF', 'Export Quality', 'Cold Chain'],
        whatYouReceive: 'Pre-threaded skewers, ready to grill.',
        preparation: 'Grill or pan-fry for 3-4 minutes each side.',
        sizes: [
            { id: '200g', label: '200g', price: 450 },
            { id: '400g', label: '400g', price: 850 },
            { id: '800g', label: '800g', price: 1600 }
        ]
    }
};

function StarRating({ rating }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-amber-500' : 'text-stone-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function CartPage() {
    const { addToCart } = useCart();
    const [productsDict, setProductsDict] = useState(PRODUCTS);
    const [selectedProductId, setSelectedProductId] = useState('black-tiger-prawns');
    const [selectedSizeId, setSelectedSizeId] = useState('250g');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('wob_products');
            if (stored) {
                const parsed = JSON.parse(stored);
                const updatedDict = { ...PRODUCTS };
                parsed.forEach(p => {
                    if (!updatedDict[p.id]) {
                        updatedDict[p.id] = {
                            ...p,
                            displayName: `${p.name} (${p.weight || '500g'})`,
                            subtitle: 'Premium Selection',
                            whatYouReceive: 'Carefully cleaned and frozen at peak freshness.',
                            preparation: 'Ready-to-Cook. Thaw before use.',
                            badges: ['IQF', 'Export Quality', 'Cold Chain'],
                            sizes: [
                                { id: '250g', label: '250g', price: p.price * 0.55 },
                                { id: '500g', label: '500g', price: p.price },
                                { id: '1kg', label: '1 Kg', price: p.price * 1.8 }
                            ]
                        };
                    }
                });
                setProductsDict(updatedDict);
            }
        } catch (e) { console.error(e); }

        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const productId = params.get('product');
            if (productId) {
                setSelectedProductId(productId);
                // Set default size for the product
                const product = PRODUCTS[productId];
                if (product && product.sizes.length > 0) {
                    setSelectedSizeId(product.sizes[0].id);
                }
            }
        }
    }, []);

    const currentProduct = productsDict[selectedProductId] || productsDict['black-tiger-prawns'];
    const currentPrice = currentProduct.sizes?.find(s => s.id === selectedSizeId)?.price || currentProduct.price;
    const otherProducts = Object.values(productsDict).filter(p => p.id !== selectedProductId);

    const handleAddToCart = () => {
        addToCart({
            id: currentProduct.id,
            name: currentProduct.name,
            size: selectedSizeId,
            price: currentPrice,
            image: currentProduct.image
        }, 1);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="min-h-screen relative">
            {/* Paper Texture Background — same as products page */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: "url('/bg/overall-background.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }}
            />
            <div className="fixed inset-0 bg-amber-50/20 z-0" />

            {/* Content */}
            <div className="relative z-10 pt-28 pb-20">

                {/* Header */}
                <div className="text-center mb-12 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-16 h-px bg-amber-800/30" />
                            <svg className="w-6 h-6 text-amber-700/60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <div className="w-16 h-px bg-amber-800/30" />
                        </div>
                        <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-4 uppercase tracking-widest font-bold">
                            Our Signature Selection
                        </h1>
                    </motion.div>
                </div>

                {/* ═══════════ MAIN PRODUCT DETAIL ═══════════ */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/90 backdrop-blur-md rounded-2xl-3xl border border-stone-200 shadow-xl overflow-hidden"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                            {/* Left: Product Image */}
                            <div className="relative h-[400px] lg:h-[550px] overflow-hidden">
                                <Image
                                    src={currentProduct.image}
                                    alt={currentProduct.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Badges overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 to-transparent">
                                    <div className="flex gap-3">
                                        {(currentProduct.badges || ['IQF', 'Export Quality', 'Cold Chain']).map(badge => (
                                            <span key={badge} className="flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                                                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Product Details */}
                            <div className="p-8 lg:p-10 flex flex-col justify-between">
                                <div>
                                    <h2 className="font-cinzel text-3xl lg:text-4xl text-stone-800 font-bold mb-2 tracking-wide">
                                        {currentProduct.displayName || currentProduct.name}
                                    </h2>
                                    <p className="text-amber-700/80 text-sm font-medium italic mb-5 uppercase tracking-widest">
                                        {currentProduct.subtitle}
                                    </p>
                                    <p className="text-stone-500 text-base leading-relaxed mb-8">
                                        {currentProduct.description}
                                    </p>

                                    {/* Size Selector */}
                                    <div className="mb-8">
                                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Select Weight</h3>
                                        <div className="flex gap-3 flex-wrap">
                                            {currentProduct.sizes?.map(size => (
                                                <button
                                                    key={size.id}
                                                    onClick={() => setSelectedSizeId(size.id)}
                                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${selectedSizeId === size.id
                                                        ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                                                        : 'bg-white text-stone-600 border-stone-300 hover:border-stone-500'
                                                        }`}
                                                >
                                                    {size.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Price + Add to Cart */}
                                <div className="flex items-center gap-4">
                                    <div className="grow">
                                        <p className="text-xs text-stone-400 font-medium uppercase tracking-widest mb-1">Price</p>
                                        <p className="text-3xl font-bold text-stone-800">₹{currentPrice?.toLocaleString('en-IN')}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleAddToCart}
                                        className="btn-gold px-8 py-4 rounded-full text-base font-bold tracking-wider flex items-center gap-3"
                                    >
                                        Add to Cart
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ═══════════ CART DETAILS — RELATED PRODUCTS ═══════════ */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="font-fraunces text-2xl md:text-3xl text-stone-800 font-bold italic">Cart details</h2>
                        <div className="grow h-px bg-stone-300" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="group bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden bg-stone-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-stone-800 mb-1">{product.name}</h3>
                                    <p className="text-stone-400 text-xs italic mb-2 line-clamp-2">{product.whatYouReceive || product.subtitle}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <StarRating rating={product.rating || 4} />
                                            <span className="text-stone-400 text-xs font-medium">₹{product.price?.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/cart?product=${product.id}`}
                                        onClick={() => {
                                            setSelectedProductId(product.id);
                                            setSelectedSizeId(product.sizes?.[0]?.id || '250g');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="btn-gold w-full py-2.5 text-center text-sm rounded-full block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══════════ INFO SECTIONS ═══════════ */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* What You Receive */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 p-6">
                            <h3 className="font-fraunces text-xl text-stone-800 font-bold italic mb-3">What You Receive</h3>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {currentProduct.whatYouReceive || 'Carefully cleaned and frozen at peak freshness.'}
                            </p>
                            <p className="text-stone-400 text-xs mt-3 leading-relaxed">
                                Premium export-grade seafood, individually quick-frozen to lock in freshness. Each batch is quality-checked and packed in insulated packaging.
                            </p>
                        </div>

                        {/* Preparation */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 p-6">
                            <h3 className="font-fraunces text-xl text-stone-800 font-bold italic mb-3">Preparation & Cleaning</h3>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {currentProduct.preparation || 'Ready-to-Cook. Thaw before use.'}
                            </p>
                            <p className="text-stone-400 text-xs mt-3 leading-relaxed">
                                Simply thaw under cold running water for 10-15 minutes. Pat dry and use in your favorite recipe.
                            </p>
                        </div>

                        {/* Storage */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 p-6">
                            <h3 className="font-fraunces text-xl text-stone-800 font-bold italic mb-3">Storage Guidelines</h3>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                Store at -18°C or below. Once thawed, consume within 24 hours.
                            </p>
                            <p className="text-stone-400 text-xs mt-3 leading-relaxed">
                                Do not refreeze after thawing. Best consumed within 3 months from date of packaging.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex items-center justify-center flex-wrap divide-x divide-stone-300">
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            <div>
                                <span className="text-sm font-bold text-stone-700 tracking-wide">IQF</span>
                                <p className="text-[11px] text-stone-400 italic">Individually Quick Frozen</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            <div>
                                <span className="text-sm font-bold text-stone-700 tracking-wide">Export Quality</span>
                                <p className="text-[11px] text-stone-400 italic">Only the best export-grade seafood</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                            <div>
                                <span className="text-sm font-bold text-stone-700 tracking-wide">Cold Chain</span>
                                <p className="text-[11px] text-stone-400 italic">Maintained at optimal temperatures</p>
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
                        <span className="font-medium text-sm tracking-wide">{currentProduct.name} added to cart!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
