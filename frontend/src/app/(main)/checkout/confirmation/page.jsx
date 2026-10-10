'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ConfirmationPage() {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // Load order details from localStorage
        const stored = localStorage.getItem('waveOfBengal_lastOrder');
        if (stored) {
            try {
                setOrderDetails(JSON.parse(stored));
                // Optionally clear the cart since the order is placed
                localStorage.setItem('waveOfBengal_cart', '[]');

                // Dispatch event to update navbar cart count immediately without reload
                window.dispatchEvent(new Event('storage'));
            } catch (e) {
                console.error("Failed to parse order details", e);
            }
        }
    }, []);

    const [resendingEmail, setResendingEmail] = useState(false);
    const [emailNotice, setEmailNotice] = useState('');

    const handleDownloadInvoice = () => {
        const orderNum = encodeURIComponent(orderDetails?.orderNumber || '#WOB-ORDER');
        const emailParam = encodeURIComponent(orderDetails?.email || '');
        const totalParam = encodeURIComponent(orderDetails?.total?.toLocaleString('en-IN') || '0');
        window.open(`/api/invoice?orderNumber=${orderNum}&email=${emailParam}&total=${totalParam}`, '_blank');
    };

    const handleResendEmail = async () => {
        if (!orderDetails?.email) return;
        setResendingEmail(true);
        setEmailNotice('');
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails)
            });
            const data = await res.json();
            if (data.success) {
                setEmailNotice('✓ Confirmation email sent to ' + orderDetails.email);
            } else {
                setEmailNotice('Could not send email: ' + (data.error || 'Server error'));
            }
        } catch {
            setEmailNotice('Failed to connect to email service');
        } finally {
            setResendingEmail(false);
            setTimeout(() => setEmailNotice(''), 5000);
        }
    };

    // Helper for delivery time formatting
    const getDeliveryTime = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayName = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });

        const timeSlot = orderDetails?.timeSlot || 'morning';
        let timeRange = '6-10 AM';
        if (timeSlot === 'afternoon') timeRange = '12-4 PM';
        if (timeSlot === 'evening') timeRange = '4-8 PM';

        return `${dayName}, ${timeRange}`;
    };

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-sky-light text-ocean-deep font-body py-20 flex flex-col items-center justify-center">
                <div className="glass-card p-12 text-center max-w-md w-full">
                    <h1 className="text-2xl font-cinzel font-bold mb-4">No Recent Orders</h1>
                    <p className="text-ocean-muted mb-8">We couldn't find details for a recent order.</p>
                    <Link href="/products" className="inline-block bg-ocean-deep text-sky-light px-6 py-3 rounded-2xl font-bold hover:bg-oceanic-blue transition-colors">
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-light text-ocean-deep font-body py-12 md:py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-oceanic-blue/10 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-blue/30 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Success Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-24 h-24 mx-auto bg-linear-to-br from-wob-green to-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-wob-green/20"
                    >
                        <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </motion.svg>
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl font-cinzel font-black tracking-tight uppercase text-ocean-deep mb-4">
                        Order Confirmed!
                    </h1>
                    <p className="text-lg text-ocean-muted italic font-medium">
                        Thank you for your order. We're getting your fresh seafood ready!
                    </p>
                </div>

                {/* Order Number Box */}
                <div className="glass-card bg-ocean-deep/60 backdrop-blur-3xl border border-white/20 text-sky-light p-8 rounded-2xl text-center mb-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    {/* Subtle bg decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>

                    <div className="text-xs tracking-widest uppercase text-oceanic-blue mb-2 font-bold relative z-10">
                        Order Number
                    </div>
                    <div className="text-3xl md:text-4xl font-bold tracking-widest text-gold relative z-10">
                        {orderDetails.orderNumber}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="glass-card p-6 bg-white/20 backdrop-blur-xl text-center flex flex-col items-center">
                        <div className="text-3xl mb-3">🕐</div>
                        <div className="text-xs tracking-widest uppercase text-ocean-muted mb-1 font-bold">Estimated Delivery</div>
                        <div className="text-lg font-bold text-ocean-deep">{getDeliveryTime()}</div>
                    </div>
                    <div className="glass-card p-6 bg-white/20 backdrop-blur-xl text-center flex flex-col items-center">
                        <div className="text-3xl mb-3">📦</div>
                        <div className="text-xs tracking-widest uppercase text-ocean-muted mb-1 font-bold">Total Amount</div>
                        <div className="text-lg font-bold text-ocean-deep">₹{orderDetails.total?.toLocaleString('en-IN') || 0}</div>
                    </div>
                </div>

                {/* Notifications Box */}
                <div className="glass-card bg-emerald-50/40 backdrop-blur-xl border-l-4 border-wob-green p-6 rounded-r- mb-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-3 text-ocean-deep font-medium">
                        <span className="text-wob-green text-xl">✅</span> Order confirmation sent to <span className="font-bold">{orderDetails.email}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3 text-ocean-deep font-medium">
                        <span className="text-wob-green text-xl">📱</span> We'll call 2 hours before delivery
                    </div>
                    <div className="flex items-start gap-3 text-ocean-deep font-medium">
                        <span className="text-wob-green text-xl">📍</span>
                        <div>
                            <span className="block mb-1">Delivery to:</span>
                            <span className="font-bold text-sm text-ocean-muted">{orderDetails.address}</span>
                        </div>
                    </div>
                </div>

                {/* What Happens Next Timeline */}
                <div className="mb-10">
                    <h2 className="text-xl font-fraunces font-black uppercase tracking-widest text-ocean-deep mb-6">What Happens Next?</h2>

                    <div className="glass-card p-6 md:p-8 bg-white/20 backdrop-blur-xl">
                        <div className="space-y-6">

                            <div className="flex gap-4 items-start relative pb-6 border-b border-oceanic-blue/10 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-wob-green text-white flex items-center justify-center font-bold shrink-0 z-10 relative shadow-md">✓</div>
                                <div>
                                    <h3 className="font-bold text-ocean-deep mb-1">Your order is confirmed</h3>
                                    <p className="text-sm text-ocean-muted">Payment received successfully</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start relative pb-6 border-b border-oceanic-blue/10 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-oceanic-blue/20 text-ocean-deep flex items-center justify-center font-bold shrink-0 z-10 relative">2</div>
                                <div>
                                    <h3 className="font-bold text-ocean-deep mb-1">Selecting the freshest catch</h3>
                                    <p className="text-sm text-ocean-muted">Handpicked from today's best quality seafood</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start relative pb-6 border-b border-oceanic-blue/10 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-oceanic-blue/20 text-ocean-deep flex items-center justify-center font-bold shrink-0 z-10 relative">3</div>
                                <div>
                                    <h3 className="font-bold text-ocean-deep mb-1">Careful packaging with ice packs</h3>
                                    <p className="text-sm text-ocean-muted">Temperature maintained at 0-4°C</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start relative pb-6 border-b border-oceanic-blue/10 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-oceanic-blue/20 text-ocean-deep flex items-center justify-center font-bold shrink-0 z-10 relative">4</div>
                                <div>
                                    <h3 className="font-bold text-ocean-deep mb-1">Quality check before dispatch</h3>
                                    <p className="text-sm text-ocean-muted">Final freshness verification</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start relative last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-oceanic-blue/20 text-ocean-deep flex items-center justify-center font-bold shrink-0 z-10 relative">5</div>
                                <div>
                                    <h3 className="font-bold text-ocean-deep mb-1">Delivered to your doorstep</h3>
                                    <p className="text-sm text-ocean-muted">Fresh and ready to cook!</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <Link
                        href="/products"
                        className="btn-gold py-4 px-6 text-center rounded-2xl"
                    >
                        Continue Shopping
                    </Link>
                    <button
                        onClick={() => alert("Tracking details will be sent via SMS shortly.")}
                        className="py-4 px-6 text-center border-2 border-ocean-deep text-ocean-deep hover:bg-ocean-deep hover:text-sky-light font-bold uppercase tracking-widest rounded-2xl transition-all"
                    >
                        Track Order
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6 bg-white/20 backdrop-blur-xl border border-oceanic-blue/20">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-ocean-muted mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <button onClick={handleDownloadInvoice} className="text-sm font-bold text-oceanic-blue hover:text-ocean-deep transition-colors flex items-center gap-1.5">
                            <span>📄</span> Download Invoice (PDF)
                        </button>
                        <button onClick={handleResendEmail} disabled={resendingEmail} className="text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1.5 disabled:opacity-60">
                            <span>✉️</span> {resendingEmail ? 'Sending Email...' : 'Resend Order Receipt Email'}
                        </button>
                        <button onClick={() => {
                            if (navigator.clipboard) {
                                navigator.clipboard.writeText(`Order ${orderDetails?.orderNumber} placed on Wave of Bengal! Total: ₹${orderDetails?.total}`);
                                alert("Order summary copied to clipboard!");
                            }
                        }} className="text-sm font-bold text-ocean-deep hover:text-oceanic-blue transition-colors">
                            &bull; Share Order Details
                        </button>
                    </div>
                    {emailNotice && (
                        <div className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-3 py-2 rounded-lg border border-emerald-200">
                            {emailNotice}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
