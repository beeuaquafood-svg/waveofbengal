'use client'

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { registerWithEmail, loginWithGoogle } = useAuth();
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await registerWithEmail(name, email, password);
            router.push('/home');
        } catch (err) {
            setError(err.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
            router.push('/home');
        } catch (err) {
            if (err.code === 'auth/popup-closed-by-user') return;
            setError(err.message || 'Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-linear-to-b from-sky-light to-sky-blue font-body text-ocean-deep absolute inset-0 z-50">
            {/* Left Pane (Form) */}
            <div className="w-full lg:w-[45%] flex flex-col p-8 lg:p-12 xl:p-16 h-full overflow-y-auto">

                {/* Logo Area */}
                <div className="w-fit px-6 py-2 rounded-full border border-oceanic-blue/30 text-oceanic-blue font-bold tracking-wider text-sm mb-16 lg:mb-24">
                    Wave of Bengal
                </div>

                {/* Form Container */}
                <div className="w-full max-w-md mx-auto grow flex flex-col justify-center">
                    <h1 className="text-4xl lg:text-5xl text-ocean-deep font-heading font-bold mb-3">Create an account</h1>
                    <p className="text-ocean-muted text-base lg:text-lg mb-10">Sign up and get 30 day free trial</p>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-2xl mb-6 text-center border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-ocean-muted text-xs uppercase tracking-[0.15em] font-bold mb-2 pl-4">Full name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Amélie Laurent"
                                className="w-full bg-white/80 border border-oceanic-blue/20 shadow-[0_2px_10px_rgba(56,189,248,0.05)] rounded-full py-4 px-6 text-ocean-deep placeholder-ocean-muted/50 focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue outline-none transition-all text-base font-medium"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-ocean-muted text-xs uppercase tracking-[0.15em] font-bold mb-2 pl-4">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="amelielaurent7622@gmail.com"
                                className="w-full bg-white/80 border border-oceanic-blue/20 shadow-[0_2px_10px_rgba(56,189,248,0.05)] rounded-full py-4 px-6 text-ocean-deep placeholder-ocean-muted/50 focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue outline-none transition-all text-base font-medium"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-ocean-muted text-xs uppercase tracking-[0.15em] font-bold mb-2 pl-4">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className="w-full bg-white/80 border border-oceanic-blue/20 shadow-[0_2px_10px_rgba(56,189,248,0.05)] rounded-full py-4 pl-6 pr-12 text-ocean-deep placeholder-ocean-muted/50 focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue outline-none transition-all text-base tracking-[0.2em] font-medium"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-5 flex items-center text-oceanic-blue hover:text-ocean-deep transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={showPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gold hover:bg-gold-light text-white font-bold text-lg py-4 rounded-full shadow-[0_4px_14px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : 'Submit'}
                            </button>
                        </div>
                    </form>

                    {/* Social Auth */}
                    <div className="flex gap-4 mt-8">
                        <button className="flex-1 flex items-center justify-center gap-2 border border-oceanic-blue/20 hover:border-white hover:bg-white bg-transparent py-3.5 rounded-full text-base font-semibold text-ocean-deep shadow-sm hover:shadow-md transition-all">
                            <svg className="w-5 h-5" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                            Apple
                        </button>
                        <button onClick={handleGoogleLogin} className="flex-1 flex items-center justify-center gap-2 border border-oceanic-blue/20 hover:border-white hover:bg-white bg-transparent py-3.5 rounded-full text-base font-semibold text-ocean-deep shadow-sm hover:shadow-md transition-all">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                    </div>

                    <p className="mt-10 text-center text-ocean-muted font-medium text-base">
                        Already have an account? <Link href="/login" className="text-oceanic-blue font-bold hover:underline">Log in</Link>
                    </p>
                </div>
            </div>

            {/* Right Pane (Image Placeholder) */}
            <div className="hidden lg:flex lg:w-[55%] h-full p-4 lg:p-6 pl-0">
                <div className="w-full h-full relative overflow-hidden rounded-2xl-[2.5rem] shadow-xl border border-gray-100">
                    <Image
                        src="/images/loginbg.png"
                        alt="Wave of Bengal Authentication Background"
                        fill
                        unoptimized
                        className="object-cover object-center"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
