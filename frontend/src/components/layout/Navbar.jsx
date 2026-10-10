'use client'

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, profile, isAdmin, logout } = useAuth();
    const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
    const router = useRouter();

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const navLinks = [
        { name: 'Home', href: '/home', className: 'text-ocean-deep hover:text-oceanic-blue px-3 py-2 rounded-2xl text-base font-bold transition-colors' },
        { name: 'Products', href: '/products', className: 'text-ocean-deep hover:text-oceanic-blue px-3 py-2 rounded-2xl text-base font-bold transition-colors' },
        { name: 'Our Story', href: '/our-story', className: 'text-ocean-muted hover:text-oceanic-blue px-3 py-2 rounded-2xl text-base font-semibold transition-colors' },
        { name: 'Sustainability', href: '/sustainability', className: 'text-ocean-muted hover:text-oceanic-blue px-3 py-2 rounded-2xl text-base font-semibold transition-colors' },
        { name: 'Certifications', href: '/certifications', className: 'text-ocean-muted hover:text-oceanic-blue px-3 py-2 rounded-2xl text-base font-semibold transition-colors' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-sky-light/80 backdrop-blur-md border-b border-oceanic-blue/20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <div className="shrink-0 flex items-center py-2">
                        <Link href="/" className="flex items-center transition-transform hover:scale-105 duration-300">
                            <img
                                src="/images/WOB-black-4.png"
                                alt="Wave of Bengal Logo"
                                className="object-contain h-10 md:h-12"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="flex items-baseline space-x-8"
                        >
                            {navLinks.map((link) => (
                                <motion.div key={link.name} variants={itemVariants}>
                                    <Link href={link.href} className={link.className}>
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={toggleCart}
                                className="text-ocean-deep hover:text-oceanic-blue relative p-2 transition-colors flex items-center gap-1 focus:outline-none"
                                aria-label="Open Cart"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-sky-light transform translate-x-1/4 -translate-y-1/4 bg-oceanic-blue rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/account" className="text-base font-bold text-ocean-deep hover:text-oceanic-blue transition-colors hidden sm:block">
                                    {profile?.name || user.displayName || user.email.split('@')[0]}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-base border border-ocean-muted/40 text-ocean-deep font-semibold hover:bg-oceanic-blue/10 px-4 py-2 rounded-2xl transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="text-base bg-ocean-deep text-sky-light hover:bg-oceanic-blue font-bold px-5 py-2.5 rounded-2xl transition-all hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:-translate-y-0.5"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}
