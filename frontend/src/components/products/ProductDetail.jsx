'use client'

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import AIRecipe from './AIRecipe';

function StarRating({ rating }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} className={`w-4 h-4 ${star <= rating ? 'text-amber-500' : 'text-stone-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

// Default size options for products that don't have them
function getSizes(product) {
    if (product.sizes) return product.sizes;
    return [
        { id: '200g', label: '200g', price: Math.round(product.price * 0.45) },
        { id: '250g', label: '250g', price: Math.round(product.price * 0.55) },
        { id: '500g', label: '500g', price: product.price },
        { id: '1kg', label: '1 Kg', price: Math.round(product.price * 1.8) }
    ];
}

export default function ProductDetail({ product, allProducts, onViewProduct, onClose }) {
    const { addToCart } = useCart();
    const sizes = getSizes(product);
    const [selectedSizeId, setSelectedSizeId] = useState(sizes[1]?.id || sizes[0]?.id);
    const [showToast, setShowToast] = useState(false);

    const currentPrice = sizes.find(s => s.id === selectedSizeId)?.price || product.price;
    const sidebarProducts = allProducts.filter(p => p.id !== product.id).slice(0, 2);
    const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 3);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            size: selectedSizeId,
            price: currentPrice,
            image: product.image
        }, 1);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            {/* Back button */}
            <button
                onClick={onClose}
                className="flex items-center gap-2 text-stone-500 hover:text-stone-800 mb-6 transition-colors group"
            >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                <span className="text-sm font-semibold uppercase tracking-wider">Back to Products</span>
            </button>

            {/* ═══════ MAIN HERO SECTION ═══════ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

                {/* Left: Large Product Image */}
                <div className="lg:col-span-5">
                    <div className="relative h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl bg-stone-100">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Bottom badge overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/70 via-black/30 to-transparent">
                            <div className="flex gap-3 flex-wrap">
                                {['IQF', 'Export Quality', 'Cold Chain'].map(badge => (
                                    <span key={badge} className="flex items-center gap-1.5 text-white text-[11px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                                        <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Product Details */}
                <div className="lg:col-span-4 flex flex-col justify-center py-2">
                    <h2 className="font-cinzel text-3xl lg:text-4xl text-stone-800 font-bold mb-2 tracking-wide leading-tight">
                        {product.name} ({product.weight || '250g'})
                    </h2>
                    <p className="text-amber-700/70 text-xs font-medium italic mb-4 uppercase tracking-[0.15em]">
                        {product.category} | Premium Selection | Bay of Bengal
                    </p>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6">
                        {product.description}
                    </p>

                    {/* Size text labels */}
                    <div className="flex items-center gap-4 mb-4">
                        {sizes.map(size => (
                            <span
                                key={size.id}
                                className={`text-sm cursor-pointer transition-colors ${selectedSizeId === size.id ? 'text-stone-800 font-bold underline underline-offset-4 decoration-2' : 'text-stone-400 hover:text-stone-600'}`}
                                onClick={() => setSelectedSizeId(size.id)}
                            >
                                {size.label}
                            </span>
                        ))}
                    </div>

                    {/* Weight pill buttons */}
                    <div className="flex items-center gap-3 mb-6">
                        {sizes.map(size => (
                            <button
                                key={size.id}
                                onClick={() => setSelectedSizeId(size.id)}
                                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 border ${selectedSizeId === size.id
                                    ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                                    : 'bg-white text-stone-600 border-stone-300 hover:border-stone-500'
                                    }`}
                            >
                                {size.label}
                            </button>
                        ))}

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleAddToCart}
                            className="btn-gold ml-auto px-6 py-2 rounded-full text-sm font-bold tracking-wider flex items-center gap-2"
                        >
                            Add to Cart
                        </motion.button>
                    </div>
                </div>

                {/* Right: Sidebar — Related Product Cards */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    {sidebarProducts.map(sp => (
                        <div key={sp.id} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-28 overflow-hidden bg-stone-100">
                                <Image
                                    src={sp.image}
                                    alt={sp.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-3">
                                <h4 className="text-sm font-bold text-stone-800 mb-0.5">{sp.name}</h4>
                                <p className="text-[11px] text-stone-400 italic mb-2">{sp.category || 'Premium'}</p>
                                <div className="flex items-center justify-between">
                                    <StarRating rating={sp.rating || 4} />
                                    <button
                                        onClick={() => onViewProduct(sp)}
                                        className="text-[11px] font-bold text-stone-500 border border-stone-300 hover:border-stone-500 px-3 py-1 rounded-2xl hover:text-stone-800 transition-all"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════ CART DETAILS — MORE PRODUCTS ═══════ */}
            <div className="mb-14">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-fraunces text-2xl text-stone-800 font-bold italic whitespace-nowrap">Cart details</h2>
                    <div className="grow h-px bg-stone-300" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedProducts.map(rp => (
                        <div key={rp.id} className="group bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 overflow-hidden">
                            <div className="relative h-48 overflow-hidden bg-stone-100">
                                <Image src={rp.image} alt={rp.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <div className="p-5">
                                <h3 className="font-fraunces text-lg font-bold text-stone-800 italic mb-1">{rp.name}</h3>
                                <p className="text-stone-400 text-xs mb-3 line-clamp-2">
                                    {rp.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <StarRating rating={rp.rating || 4} />
                                        <span className="text-stone-500 text-xs font-semibold">₹{rp.price?.toLocaleString('en-IN')}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            onViewProduct(rp);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="text-xs font-bold text-stone-500 border border-stone-300 hover:border-stone-500 px-3 py-1.5 rounded-2xl hover:text-stone-800 transition-all"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════ INFO SECTIONS ═══════ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 p-6">
                    <h3 className="font-fraunces text-xl text-stone-800 font-bold italic mb-3">What You Receive</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-3">
                        Tenderfully cleaned and ready to peak freshness.
                    </p>
                    <p className="text-stone-400 text-xs leading-relaxed">
                        Premium export-grade seafood, individually quick-frozen to lock in freshness. Each batch is quality-checked and packed in insulated packaging for safe delivery.
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 p-6">
                    <h3 className="font-fraunces text-xl text-stone-800 font-bold italic mb-3">Preparation & Cleaning</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-3">
                        Ready-to-Cook. Thaw before use.
                    </p>
                    <p className="text-stone-400 text-xs leading-relaxed">
                        Simply thaw under cold running water for 10-15 minutes. Pat dry and use in your favorite recipe. Do not microwave to thaw.
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 p-6">
                    <h3 className="font-fraunces text-xl text-stone-800 font-bold italic mb-3">Storage Guidelines</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-3">
                        Store at -18°C or below. Once thawed, consume within 24 hours.
                    </p>
                    <p className="text-stone-400 text-xs leading-relaxed">
                        Do not refreeze after thawing. Best consumed within 3 months from date of packaging.
                    </p>
                </div>
            </div>

            {/* ═══════ AI RECIPE SECTION ═══════ */}
            <AIRecipe product={product} />

            {/* Trust Badges */}
            <div className="flex items-center justify-center flex-wrap divide-x divide-stone-300 mb-12">
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

            {/* ═══════ GO BACK TO PRODUCTS ═══════ */}
            <div className="text-center pt-4 pb-8">
                <button
                    onClick={() => {
                        onClose();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group inline-flex items-center gap-3 bg-stone-800 hover:bg-stone-900 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Go Back to Products
                </button>
            </div>

            {/* Toast */}
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 right-8 bg-stone-800 text-white px-6 py-4 rounded-2xl flex items-center gap-3 z-50 shadow-2xl border border-stone-600"
                >
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="font-medium text-sm tracking-wide">{product.name} added to cart!</span>
                </motion.div>
            )}
        </motion.div>
    );
}

