'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import AIRecipe from '@/components/products/AIRecipe';

const ALL_PRODUCTS = [
    {
        id: 'black-tiger-prawns',
        name: 'King Prawns',
        displayName: 'King Prawns (250g)',
        subtitle: 'Export Freezeount',
        description: 'Succulent, jumbo-sized tiger prawns caught daily from the deep waters of the Bay of Bengal. Known for their firm texture and sweet, oceanic flavor. Premium selection, individually quick-frozen to preserve freshness and taste.',
        weight: '250g',
        price: 1200,
        category: 'Prawns',
        image: '/images/black%20tiger.jpeg',
        rating: 5,
        whatYouReceive: 'Carefully cleaned and frozen at peak freshness.',
        whatYouReceiveDetail: 'Premium export-grade seafood, individually quick-frozen to lock in freshness. Each batch is quality-checked and packed in insulated packaging for safe delivery. Our cold-chain infrastructure ensures the product reaches you in perfect condition.',
        sizes: [
            { id: '250g', label: '250g', price: 680 },
            { id: '350g', label: '350g', price: 950 },
            { id: '500g', label: '500g', price: 1200 },
            { id: '1kg', label: '1 Kg', price: 2200 }
        ]
    },
    {
        id: 'butter-prawns',
        name: 'Butter Prawns',
        displayName: 'Butter Prawns (500g)',
        subtitle: 'Marinated | Ready-to-Cook',
        description: 'Authentic Bengali style marinated prawns, infused with garlic butter and aromatic herbs. Ready to be golden-fried to perfection. A coastal street food delicacy loved by connoisseurs.',
        weight: '500g',
        price: 950,
        category: 'Prawns',
        image: '/images/butter%20prawns%20.jpeg',
        rating: 4,
        whatYouReceive: 'Carefully cleaned and frozen at peak freshness.',
        whatYouReceiveDetail: 'Marinated with signature spice blend, vacuum-sealed for freshness. Ready to cook straight from the pack after thawing.',
        sizes: [
            { id: '250g', label: '250g', price: 500 },
            { id: '350g', label: '350g', price: 700 },
            { id: '500g', label: '500g', price: 950 },
            { id: '1kg', label: '1 Kg', price: 1800 }
        ]
    },
    {
        id: 'prawn-skewers',
        name: 'Prawn Skewers',
        displayName: 'Prawn Skewers (400g)',
        subtitle: 'BBQ Ready | Seasoned',
        description: 'Expertly threaded and seasoned prawns on bamboo skewers for BBQ & grilling. Pre-marinated with our signature spice blend for the perfect char-grilled flavor.',
        weight: '400g',
        price: 850,
        category: 'Ready-to-Cook',
        image: '/images/skewers.jpeg',
        rating: 5,
        whatYouReceive: 'Pre-threaded skewers, ready to grill.',
        whatYouReceiveDetail: 'Six perfectly threaded skewers with premium prawns, seasoned and ready for the grill or pan. Each skewer is individually wrapped.',
        sizes: [
            { id: '200g', label: '200g', price: 450 },
            { id: '400g', label: '400g', price: 850 },
            { id: '800g', label: '800g', price: 1600 }
        ]
    },
    {
        id: 'vannamei-prawns',
        name: 'Vannamei Prawns',
        displayName: 'Vannamei Prawns (500g)',
        subtitle: 'Premium White Prawns',
        description: 'Premium white prawns with delicate, sweet flavor for all cooking methods. Versatile and perfect for curries, stir-fries, and salads.',
        weight: '500g',
        price: 750,
        category: 'Prawns',
        image: '/images/black%20tiger.jpeg',
        rating: 4,
        whatYouReceive: 'Carefully cleaned and frozen at peak freshness.',
        whatYouReceiveDetail: 'Farm-raised premium Vannamei, cleaned and deveined. Individually quick-frozen for maximum freshness.',
        sizes: [
            { id: '250g', label: '250g', price: 400 },
            { id: '500g', label: '500g', price: 750 },
            { id: '1kg', label: '1 Kg', price: 1400 }
        ]
    },
    {
        id: 'headless-peeled-shrimp',
        name: 'Premium Scampi',
        displayName: 'Premium Scampi (500g)',
        subtitle: 'Peeled & Deveined',
        description: 'Cleaned, deveined and ready to cook. Saves prep time with premium freshness. Perfect for pasta, risotto, and quick weeknight meals.',
        weight: '500g',
        price: 800,
        category: 'Prawns',
        image: '/images/butter%20prawns%20.jpeg',
        rating: 4,
        whatYouReceive: 'Carefully cleaned and frozen at peak freshness.',
        whatYouReceiveDetail: 'Headless, peeled, and deveined — zero prep required. Simply thaw and cook. Each piece is individually frozen for easy portioning.',
        sizes: [
            { id: '250g', label: '250g', price: 430 },
            { id: '500g', label: '500g', price: 800 },
            { id: '1kg', label: '1 Kg', price: 1500 }
        ]
    },
    {
        id: 'shrimp-ebi-fry',
        name: 'Shrimp Ebi Fry',
        displayName: 'Shrimp Ebi Fry (400g)',
        subtitle: 'Japanese-Style Breaded',
        description: 'Japanese-style breaded prawns, pre-seasoned and ready to fry to crispy perfection. Golden and crunchy on the outside, juicy on the inside.',
        weight: '400g',
        price: 900,
        category: 'Ready-to-Cook',
        image: '/images/skewers.jpeg',
        rating: 5,
        whatYouReceive: 'Pre-breaded and ready to fry.',
        whatYouReceiveDetail: 'Ten pieces of premium Ebi Fry, coated in authentic panko breadcrumbs. Deep fry from frozen for 3-4 minutes until golden.',
        sizes: [
            { id: '200g', label: '200g', price: 480 },
            { id: '400g', label: '400g', price: 900 },
            { id: '800g', label: '800g', price: 1700 }
        ]
    }
];

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

export default function ProductDetailPage() {
    const params = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedSizeId, setSelectedSizeId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Find product from defaults or localStorage
        let found = ALL_PRODUCTS.find(p => p.id === params.id);

        if (!found) {
            try {
                const stored = localStorage.getItem('wob_products');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    const storedProduct = parsed.find(p => p.id === params.id);
                    if (storedProduct) {
                        const hasSizes = storedProduct.sizes?.length > 0;
                        found = {
                            ...storedProduct,
                            displayName: storedProduct.displayName || `${storedProduct.name} (${storedProduct.weight || '500g'})`,
                            subtitle: storedProduct.subtitle || storedProduct.category || 'Premium Selection',
                            whatYouReceive: storedProduct.whatYouReceive || 'Carefully cleaned and frozen at peak freshness.',
                            whatYouReceiveDetail: storedProduct.whatYouReceiveDetail || 'Premium export-grade seafood, individually quick-frozen to lock in freshness.',
                            image: storedProduct.images?.[0] || storedProduct.image || '/images/black%20tiger.jpeg',
                            sizes: hasSizes ? storedProduct.sizes : [
                                { id: '250g', label: '250g', price: Math.round(storedProduct.price * 0.55) },
                                { id: '500g', label: '500g', price: storedProduct.price },
                                { id: '1kg', label: '1 Kg', price: Math.round(storedProduct.price * 1.8) }
                            ]
                        };
                    }
                }
            } catch (e) { console.error(e); }
        }

        if (found) {
            setProduct(found);
            setSelectedSizeId(found.sizes[0]?.id || '250g');
        }
    }, [params.id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-stone-300 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-stone-500 font-medium">Loading product...</p>
                </div>
            </div>
        );
    }

    const currentPrice = product.sizes.find(s => s.id === selectedSizeId)?.price || product.price;
    const relatedProducts = ALL_PRODUCTS.filter(p => p.id !== product.id).slice(0, 2);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            size: selectedSizeId,
            price: currentPrice,
            image: product.image
        }, quantity);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="min-h-screen relative">
            {/* Background */}
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

            <div className="relative z-10 pt-28">

                {/* ═══════════════════════════════════════════
                    ROW 1: Hero (Image Left, Details Right)
                ═══════════════════════════════════════════ */}
                <div className="w-full mb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-stretch">
                        {/* Left: Large Product Image */}
                        <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-[70vh] rounded-2xl overflow-hidden">
                            {(product.image || '').startsWith('data:') ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
                            ) : (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                />
                            )}
                        </div>

                        {/* Right: Product Details */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 bg-white/40 backdrop-blur-md rounded-2xl">
                            <h1 className="font-fraunces text-4xl lg:text-5xl text-stone-800 font-bold mb-4 tracking-wide">
                                {product.displayName || product.name}
                            </h1>

                            <div className="flex items-center gap-3 mb-6">
                                <StarRating rating={product.rating || 4} />
                                <span className="text-stone-500 text-xs italic">
                                    {product.subtitle}
                                </span>
                            </div>

                            <p className="text-stone-500 text-sm leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* Size Selector */}
                            <div className="mb-8 flex gap-3 flex-wrap items-center">
                                {product.sizes.map(size => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSizeId(size.id)}
                                        className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 border ${selectedSizeId === size.id
                                            ? 'bg-white text-stone-800 border-stone-300 shadow-sm'
                                            : 'bg-transparent text-stone-500 border-stone-200 hover:border-stone-400'
                                            }`}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>

                            {/* Quantity + Add to Cart */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-white border border-stone-200 shadow-sm">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-white bg-[#2A3547] hover:bg-[#1f2836] transition-colors text-lg font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="w-12 h-10 flex items-center justify-center text-stone-800 font-bold text-sm">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-lg font-bold border-l border-stone-200"
                                    >
                                        +
                                    </button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className="bg-linear-to-b from-[#ebd1a7] to-[#d6b075] border border-[#cba365] text-stone-800 px-8 py-2.5 font-bold tracking-wide shadow-sm hover:opacity-90 transition-opacity flex-1 max-w-[200px]"
                                >
                                    Add to Cart
                                </motion.button>

                                <p className="ml-auto text-xl font-bold text-stone-800">
                                    ₹{(currentPrice * quantity).toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════
                    ROW 2: What You Receive (Text Left, Image Right)
                ═══════════════════════════════════════════ */}
                <div className="w-full mb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-stretch">
                        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 order-2 md:order-1 bg-stone-50/80 backdrop-blur-md rounded-2xl">
                            <h2 className="font-fraunces text-3xl md:text-4xl text-stone-800 mb-6">What You Receive</h2>
                            <p className="text-stone-600 font-medium mb-6 text-lg">
                                {product.whatYouReceive}
                            </p>
                            <p className="text-stone-500 text-base leading-relaxed mb-6 max-w-lg">
                                {product.whatYouReceiveDetail}
                            </p>
                        </div>
                        <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-[70vh] rounded-2xl overflow-hidden order-1 md:order-2">
                            <Image
                                src={product.id === 'headless-peeled-shrimp' ? '/images/skewers.jpeg' : '/images/butter prawns .jpeg'}
                                alt="What you receive"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>


                {/* ═══════════════════════════════════════════
                    ROW 3: AI Recipe Section
                ═══════════════════════════════════════════ */}
                <div className="w-full mb-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="w-full bg-white/60 backdrop-blur-md rounded-2xl px-10 py-12">
                        <AIRecipe product={product} />
                    </div>
                </div>


                {/* Go Back to Products */}
                <div className="text-center pb-8 border-t border-stone-200/60 pt-12 max-w-6xl mx-auto">
                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-3 text-stone-600 hover:text-stone-900 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 border border-stone-300 hover:border-stone-500 bg-white/50"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Go Back to Products
                    </Link>
                </div>

                {/* Footer Image */}
                <div className="relative w-full">
                    <Image
                        src="/images/footer image.png"
                        alt="Wave of Bengal Footer"
                        width={1920}
                        height={400}
                        className="w-full object-cover"
                    />
                </div>
            </div>

            {/* Toast */}
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-8 right-8 bg-stone-800 text-white px-6 py-4 rounded-2xl flex items-center gap-3 z-50 shadow-2xl border border-stone-600"
                >
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="font-medium text-sm tracking-wide">{product.name} added to cart!</span>
                </motion.div>
            )}
        </div>
    );
}
