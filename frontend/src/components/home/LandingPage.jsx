'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LandingPage({ onEnter }) {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <section className="fixed inset-0 z-100 w-full min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-4 overflow-hidden font-landing-heading text-white">

            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay loop muted playsInline
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        minWidth: '100vw',
                        minHeight: '100vh',
                        width: 'auto',
                        height: 'auto',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <source src="/videos/Background.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Central Content — glassmorphic card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-20 flex flex-col items-center"
            >
                {/* Glass Card */}
                <div className="flex flex-col items-center">

                    {/* Logo */}
                    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg px-2 flex justify-center">
                        <Image
                            src="/images/Wave of Bengal Logo.png"
                            alt="Wave of Bengal Logo"
                            width={1920} height={1080} quality={100} unoptimized
                            className="object-contain w-full h-auto max-h-[48vh] mix-blend-screen"
                            priority
                        />
                    </div>

                    {/* Buttons — snug under logo */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-0 w-full justify-center">
                        <button
                            onClick={onEnter}
                            className="w-full sm:w-auto font-body font-semibold py-3.5 px-12 rounded-full uppercase tracking-widest text-sm text-white bg-[#d97736] hover:bg-[#c0612a] transition-all duration-300 hover:scale-105 shadow-[0_0_24px_rgba(217,119,54,0.45)] hover:shadow-[0_0_36px_rgba(217,119,54,0.7)]"
                        >
                            Dive In
                        </button>
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="w-full sm:w-auto font-body font-semibold py-3.5 px-12 rounded-full uppercase tracking-widest text-sm text-white/80 hover:text-white border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            Login
                        </button>
                    </div>

                </div>
            </motion.div>

            {/* Login Demarcation Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.92, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.92, y: 30, opacity: 0 }}
                            transition={{ type: "spring", damping: 22, stiffness: 260 }}
                            className="bg-black/25 backdrop-blur-xl border border-white/12 p-8 sm:p-10 rounded-4xl shadow-[0_8px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] w-full max-w-md relative flex flex-col items-center overflow-hidden"
                        >
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="absolute top-5 right-5 p-2 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Header */}
                            <div className="flex flex-col items-center mb-8 mt-2">
                                <div className="p-3 rounded-2xl bg-white/4 border border-white/6 mb-5">
                                    <svg className="w-7 h-7 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-heading font-semibold tracking-wide text-white mb-2">Select Portal</h3>
                                <p className="text-white/40 text-sm font-heading tracking-wider text-center">Secure access to your dashboard</p>
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                {/* User Portal Card */}
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full flex items-center gap-4 p-5 bg-white/6 hover:bg-white/10 border border-white/8 hover:border-white/20 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:shadow-[0_0_35px_rgba(255,255,255,0.14)]"
                                >
                                    <div className="p-3.5 rounded-xl bg-white/6 group-hover:bg-white/12 transition-all duration-300 shrink-0">
                                        <svg className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col items-start text-left flex-1">
                                        <span className="font-heading text-[17px] font-semibold tracking-wide text-white group-hover:text-white transition-colors">User Portal</span>
                                        <span className="text-white/35 text-[11px] tracking-wider mt-0.5 group-hover:text-white/50 transition-colors">Browse products, place orders & track deliveries</span>
                                    </div>
                                    <svg className="w-5 h-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Divider */}
                                <div className="flex items-center gap-3 px-4 my-1">
                                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                    <span className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-semibold">or</span>
                                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                </div>

                                {/* Admin Portal Card */}
                                <button
                                    onClick={() => router.push('/admin-login')}
                                    className="w-full flex items-center gap-4 p-5 bg-[#d97736]/8 hover:bg-[#d97736]/14 border border-[#d97736]/12 hover:border-[#d97736]/35 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group shadow-[0_0_25px_rgba(217,119,54,0.10)] hover:shadow-[0_0_35px_rgba(217,119,54,0.18)]"
                                >
                                    <div className="p-3.5 rounded-xl bg-[#d97736]/10 group-hover:bg-[#d97736]/20 transition-all duration-300 shrink-0">
                                        <svg className="w-6 h-6 text-[#d97736]/70 group-hover:text-[#d97736] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col items-start text-left flex-1">
                                        <span className="font-heading text-[17px] font-semibold tracking-wide text-[#d97736]/90 group-hover:text-[#d97736] transition-colors">Admin Portal</span>
                                        <span className="text-white/30 text-[11px] tracking-wider mt-0.5 group-hover:text-white/50 transition-colors">Manage inventory, orders & system analytics</span>
                                    </div>
                                    <svg className="w-5 h-5 text-[#d97736]/25 group-hover:text-[#d97736]/60 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Bottom decorative glow */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
