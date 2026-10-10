'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartSlideOut() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
                    />

                    {/* Cart Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#fdfbf6] shadow-2xl z-50 flex flex-col border-l border-stone-200"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-stone-200/60 bg-white/50 backdrop-blur-md">
                            <h2 className="text-2xl font-fraunces font-bold tracking-wide text-stone-800">Your Catch</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-stone-400 hover:text-stone-800 hover:bg-stone-100 p-2 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 mb-2">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                    </div>
                                    <p className="text-xl font-fraunces font-bold text-stone-700">Your net is empty</p>
                                    <p className="text-stone-500 font-medium text-sm">Looks like you haven't added any fresh catches yet.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-6 text-amber-600 font-bold hover:text-amber-700 underline underline-offset-4 tracking-wide text-sm"
                                    >
                                        Continue Exploring
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex gap-5 p-4 bg-white rounded-3xl border border-stone-100 shadow-sm relative group hover:shadow-md transition-shadow"
                                    >
                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-stone-100 bg-stone-50">
                                            <Image
                                                src={item.image || "/images/placeholder.png"}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105 duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="pr-6">
                                                <h3 className="font-fraunces font-bold text-stone-800 line-clamp-2 leading-snug">{item.name}</h3>
                                                <p className="text-amber-600 font-bold text-[11px] mt-1 tracking-wider uppercase">{item.weight}</p>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="absolute top-4 right-4 text-stone-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                                                title="Remove Item"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>

                                            <div className="flex items-center justify-between mt-3">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center bg-stone-50 border border-stone-200 rounded-full overflow-hidden shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors font-bold"
                                                    >-</button>
                                                    <span className="w-8 flex items-center justify-center font-bold text-stone-700 text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors font-bold"
                                                    >+</button>
                                                </div>
                                                <p className="font-bold text-stone-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer & Checkout */}
                        {cart.length > 0 && (
                            <div className="p-6 md:p-8 bg-white border-t border-stone-200/60 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] relative z-10 space-y-5">
                                <div className="flex justify-between items-center text-lg mb-2">
                                    <span className="font-fraunces font-bold text-stone-800">Subtotal</span>
                                    <span className="font-bold text-xl text-stone-800">₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-stone-500 text-xs font-medium bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Shipping & taxes calculated at checkout.
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="flex w-full items-center justify-center gap-2 py-4 bg-linear-to-b from-[#ebd1a7] to-[#d6b075] border border-[#cba365] text-stone-800 hover:opacity-90 font-bold rounded-[1.25rem] text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                                >
                                    Proceed to Checkout
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
