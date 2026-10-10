'use client'

import { useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export default function Login() {
    const [authMode, setAuthMode] = useState('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const { loginWithEmail, loginWithGoogle, sendPhoneOtp, verifyPhoneOtp } = useAuth();
    const router = useRouter();
    const recaptchaRef = useRef(null);

    const handleRedirect = () => {
        router.push('/home');
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError(''); setSuccess(''); setLoading(true);
        try {
            const { role } = await loginWithEmail(email, password);
            handleRedirect(role);
        } catch (err) {
            setError(err.message || 'Failed to login');
        } finally { setLoading(false); }
    };

    const handleGoogleLogin = async () => {
        setError(''); setSuccess(''); setLoading(true);
        try {
            const { role } = await loginWithGoogle();
            handleRedirect(role);
        } catch (err) {
            if (err.code === 'auth/popup-closed-by-user') return;
            setError(err.message || 'Failed to login with Google');
        } finally { setLoading(false); }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError(''); setSuccess(''); setLoading(true);
        try {
            let formattedPhone = phone.trim();
            if (!formattedPhone.startsWith('+')) formattedPhone = '+91' + formattedPhone;
            await sendPhoneOtp(formattedPhone, 'user-recaptcha-container');
            setOtpSent(true);
            setSuccess('OTP sent! Check your phone.');
        } catch (err) {
            setError(err.message || 'Failed to send OTP');
        } finally { setLoading(false); }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(''); setSuccess(''); setLoading(true);
        try {
            const { role } = await verifyPhoneOtp(otp);
            handleRedirect(role);
        } catch (err) {
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#0a1628] font-body text-white absolute inset-0 z-50">

            {/* Left Pane — Form */}
            <div className="w-full lg:w-[45%] flex flex-col p-8 lg:p-12 xl:p-16 h-full overflow-y-auto relative">

                {/* Subtle background texture */}
                <div className="absolute inset-0 bg-linear-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]" />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Back Button + Logo */}
                    <div className="w-fit mb-12 lg:mb-16 flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-[#c5a061] hover:border-[#c5a061]/40 transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <Image
                            src="/images/WOB-black-4.png"
                            alt="Wave of Bengal Logo"
                            width={280} height={80} quality={100} unoptimized
                            className="object-contain h-12 w-auto invert opacity-90 hover:opacity-100 transition-opacity"
                            priority
                        />
                    </div>

                    {/* Form Container */}
                    <div className="w-full max-w-md mx-auto grow flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl text-white font-cinzel font-bold mb-3 tracking-wide">
                            Welcome Back
                        </h1>
                        <p className="text-white/50 text-base lg:text-lg mb-8">Sign in to your account</p>

                        {/* Auth Mode Toggle */}
                        <div className="flex gap-1 mb-6 bg-white/5 border border-white/10 rounded-full p-1">
                            <button
                                onClick={() => { setAuthMode('email'); setError(''); setSuccess(''); }}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${authMode === 'email'
                                    ? 'bg-[#c5a061] text-[#0a1628] shadow-lg shadow-[#c5a061]/20'
                                    : 'text-white/40 hover:text-white/70'
                                    }`}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </button>
                            <button
                                onClick={() => { setAuthMode('phone'); setError(''); setSuccess(''); }}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${authMode === 'phone'
                                    ? 'bg-[#c5a061] text-[#0a1628] shadow-lg shadow-[#c5a061]/20'
                                    : 'text-white/40 hover:text-white/70'
                                    }`}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Phone
                            </button>
                        </div>

                        {/* Messages */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="bg-red-500/10 text-red-400 text-sm p-3 rounded-2xl mb-6 text-center border border-red-500/20 font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="bg-emerald-500/10 text-emerald-400 text-sm p-3 rounded-2xl mb-6 text-center border border-emerald-500/20 font-medium"
                                >
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Auth Forms */}
                        <AnimatePresence mode="wait">
                            {/* ─── Email Form ─── */}
                            {authMode === 'email' && (
                                <motion.div
                                    key="email-form"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <form onSubmit={handleEmailLogin} className="space-y-6">
                                        <div>
                                            <label className="block text-[#c5a061]/70 text-[11px] uppercase tracking-[0.2em] font-bold mb-2.5 pl-4">Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white placeholder-white/25 focus:ring-2 focus:ring-[#c5a061]/40 focus:border-[#c5a061]/50 outline-none transition-all duration-300 text-base font-medium backdrop-blur-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[#c5a061]/70 text-[11px] uppercase tracking-[0.2em] font-bold mb-2.5 pl-4">Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••••••••••"
                                                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder-white/25 focus:ring-2 focus:ring-[#c5a061]/40 focus:border-[#c5a061]/50 outline-none transition-all duration-300 text-base tracking-[0.2em] font-medium backdrop-blur-sm"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-5 flex items-center text-white/30 hover:text-[#c5a061] transition-colors duration-300"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={showPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="btn-gold w-full font-bold text-lg py-4 rounded-full flex justify-center items-center gap-2"
                                            >
                                                {loading ? (
                                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                ) : 'Log in'}
                                            </button>
                                        </div>
                                    </form>

                                    {/* Social Auth */}
                                    <div className="flex gap-4 mt-8">
                                        <button className="flex-1 flex items-center justify-center gap-2 border border-white/10 hover:border-[#c5a061]/40 bg-white/5 hover:bg-white/10 py-3.5 rounded-full text-base font-semibold text-white/80 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5">
                                            <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                                            Apple
                                        </button>
                                        <button onClick={handleGoogleLogin} className="flex-1 flex items-center justify-center gap-2 border border-white/10 hover:border-[#c5a061]/40 bg-white/5 hover:bg-white/10 py-3.5 rounded-full text-base font-semibold text-white/80 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                            Google
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ─── Phone Form ─── */}
                            {authMode === 'phone' && (
                                <motion.div
                                    key="phone-form"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {!otpSent ? (
                                        <form onSubmit={handleSendOtp} className="space-y-6">
                                            <div>
                                                <label className="block text-[#c5a061]/70 text-[11px] uppercase tracking-[0.2em] font-bold mb-2.5 pl-4">Phone Number</label>
                                                <div className="relative">
                                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 text-base font-medium">+91</span>
                                                    <input
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                                                        placeholder="9876543210"
                                                        maxLength={10}
                                                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-16 pr-6 text-white placeholder-white/25 focus:ring-2 focus:ring-[#c5a061]/40 focus:border-[#c5a061]/50 outline-none transition-all duration-300 text-base font-medium tracking-widest backdrop-blur-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-white/30 text-xs px-4 leading-relaxed">
                                                We&apos;ll send a one-time verification code to this number.
                                            </p>
                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={loading || phone.length < 10}
                                                    className="btn-gold w-full font-bold text-lg py-4 rounded-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                                                >
                                                    {loading ? (
                                                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    ) : 'Send OTP'}
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                                            <div>
                                                <label className="block text-[#c5a061]/70 text-[11px] uppercase tracking-[0.2em] font-bold mb-2.5 pl-4">Verification Code</label>
                                                <input
                                                    type="text"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/[^\d]/g, ''))}
                                                    placeholder="123456"
                                                    maxLength={6}
                                                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white placeholder-white/25 focus:ring-2 focus:ring-[#c5a061]/40 focus:border-[#c5a061]/50 outline-none transition-all duration-300 text-2xl tracking-[0.5em] text-center font-mono font-medium backdrop-blur-sm"
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                            <p className="text-white/30 text-xs px-4 text-center">
                                                Enter the 6-digit code sent to +91 {phone}
                                            </p>
                                            <div className="pt-2 space-y-3">
                                                <button
                                                    type="submit"
                                                    disabled={loading || otp.length < 6}
                                                    className="btn-gold w-full font-bold text-lg py-4 rounded-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                                                >
                                                    {loading ? (
                                                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    ) : 'Verify & Log in'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => { setOtpSent(false); setOtp(''); setError(''); setSuccess(''); }}
                                                    className="w-full text-white/40 hover:text-[#c5a061] text-xs tracking-wider uppercase font-bold transition-colors py-2"
                                                >
                                                    Change Number
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    <div className="flex gap-4 mt-8">
                                        <button onClick={handleGoogleLogin} className="flex-1 flex items-center justify-center gap-2 border border-white/10 hover:border-[#c5a061]/40 bg-white/5 hover:bg-white/10 py-3.5 rounded-full text-base font-semibold text-white/80 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                            Google
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div id="user-recaptcha-container" ref={recaptchaRef}></div>

                        <p className="mt-10 text-center text-white/40 font-medium text-base">
                            New to Wave of Bengal? <Link href="/register" className="text-[#c5a061] font-bold hover:underline">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Pane — Background Image */}
            <div className="hidden lg:flex lg:w-[55%] h-full p-4 lg:p-6 pl-0">
                <div className="w-full h-full relative overflow-hidden rounded-2xl-4xl">
                    <Image
                        src="/images/bg/admin-bg.jpeg"
                        alt="Wave of Bengal Premium Seafood"
                        fill
                        unoptimized
                        className="object-cover object-center"
                        quality={100}
                        priority
                    />
                    <div className="absolute inset-0 bg-[#0a1628]/30" />

                    {/* Decorative overlay content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-center"
                        >
                            <Image
                                src="/images/WOB-black-4.png"
                                alt="Wave of Bengal Logo"
                                width={300} height={80} quality={100} unoptimized
                                className="object-contain h-24 w-auto mx-auto mb-6 invert drop-shadow-lg"
                            />
                            <div className="w-16 h-px bg-[#c5a061] mx-auto mb-5" />
                            <p className="text-white/80 text-lg font-light max-w-md leading-relaxed mb-2">
                                East India&apos;s finest premium seafood marketplace — delivering
                                ocean-fresh catches from the Bay of Bengal straight to your doorstep.
                            </p>
                            <p className="text-white/50 text-sm font-light">
                                Sustainably sourced · Premium quality · Three generations of trust
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
