'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AccountPage() {
    const { user, profile, isAdmin, updateProfile, logout } = useAuth();
    const router = useRouter();

    // Form state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');

    // UI state
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            router.replace('/login');
        }
    }, [user, router]);

    // Populate form from profile
    useEffect(() => {
        if (profile) {
            setName(profile.name || '');
            setPhone(profile.phone || '');
            setAddress(profile.address || '');
            setCity(profile.city || '');
            setPincode(profile.pincode || '');
        }
    }, [profile]);

    const handleSave = async () => {
        setError('');
        setSuccess('');
        setSaving(true);
        try {
            await updateProfile({ name, phone, address, city, pincode });
            setSuccess('Profile updated successfully!');
            setEditing(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (profile) {
            setName(profile.name || '');
            setPhone(profile.phone || '');
            setAddress(profile.address || '');
            setCity(profile.city || '');
            setPincode(profile.pincode || '');
        }
        setEditing(false);
        setError('');
    };

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if (!user) return null;

    const memberSince = profile?.createdAt?.toDate
        ? profile.createdAt.toDate().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Just now';

    const avatar = user.photoURL;
    const initials = (profile?.name || user.displayName || user.email || 'U')
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white placeholder-white/30 focus:ring-2 focus:ring-[#c5a061]/40 focus:border-[#c5a061]/50 outline-none transition-all text-sm font-medium backdrop-blur-sm";

    return (
        <div className="relative min-h-screen bg-[#0a1628] text-white pt-24 pb-20">

            {/* Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/bg/admin-bg.jpeg"
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={90}
                />
                <div className="absolute inset-0 bg-[#0a1628]/60" />
            </div>

            {/* Subtle background particles */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-[#c5a061]/20 rounded-full blur-[1px]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.1, 0.4, 0.1],
                            scale: [0.8, 1.3, 0.8]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center"
                >
                    <span className="text-[#c5a061] uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Your Profile</span>
                    <h1 className="text-5xl md:text-6xl font-cinzel font-black text-white drop-shadow-lg">My Account</h1>
                    <div className="w-16 h-px bg-[#c5a061] mx-auto mt-6" />
                </motion.div>

                {/* Messages */}
                <AnimatePresence mode="wait">
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 bg-[#c5a061]/15 text-[#FFFDD0] rounded-2xl border border-[#c5a061]/30 text-sm font-medium text-center backdrop-blur-sm"
                        >
                            ✓ {success}
                        </motion.div>
                    )}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 bg-red-500/10 text-red-300 rounded-2xl border border-red-500/20 text-sm font-medium text-center backdrop-blur-sm"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl-3xl border border-white/10 overflow-hidden"
                >
                    {/* Avatar & Overview Banner */}
                    <div className="relative bg-linear-to-r from-[#050B14] via-[#0c1a2e] to-[#0a1628] px-8 py-10 border-b border-white/10">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                {avatar ? (
                                    <Image
                                        src={avatar}
                                        alt="Profile"
                                        width={88}
                                        height={88}
                                        className="rounded-full border-[3px] border-[#c5a061]/40 object-cover shadow-[0_0_20px_rgba(197,160,97,0.2)]"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-[88px] h-[88px] rounded-full border-[3px] border-[#c5a061]/40 bg-white/10 flex items-center justify-center text-2xl font-heading font-bold text-[#FFFDD0] shadow-[0_0_20px_rgba(197,160,97,0.2)]">
                                        {initials}
                                    </div>
                                )}
                                {isAdmin && (
                                    <span className="absolute -bottom-1 -right-1 bg-[#c5a061] text-[#0a1628] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border-2 border-[#050B14]">
                                        Admin
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-fraunces font-bold text-[#FFFDD0]">{profile?.name || 'User'}</h2>
                                <p className="text-white/50 text-sm mt-1">{user.email || profile?.phone || ''}</p>
                                <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                                    <span className="text-white/30 text-xs tracking-wider uppercase">Member since</span>
                                    <span className="text-[#c5a061] text-xs font-medium">{memberSince}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-playfair font-bold text-[#FFFDD0] uppercase tracking-widest">Personal Information</h3>
                            {!editing ? (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-2 text-sm font-semibold text-[#c5a061] hover:text-[#FFFDD0] transition-colors px-4 py-2 rounded-2xl hover:bg-white/5"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="text-sm font-semibold text-white/50 hover:text-white transition-colors px-4 py-2 rounded-2xl hover:bg-white/5"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="btn-gold flex items-center gap-2 text-sm px-5 py-2 rounded-2xl disabled:opacity-50"
                                    >
                                        {saving ? (
                                            <svg className="animate-spin h-4 w-4 text-[#0a1628]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        ) : 'Save Changes'}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Full Name</label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={inputClasses}
                                    />
                                ) : (
                                    <p className="text-white/80 font-medium text-base py-3 px-1">{profile?.name || '—'}</p>
                                )}
                            </div>

                            {/* Email (read-only) */}
                            <div>
                                <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Email</label>
                                <p className="text-white/80 font-medium text-base py-3 px-1 flex items-center gap-2">
                                    {user.email || '—'}
                                    {user.emailVerified && (
                                        <span className="text-[#c5a061] text-xs font-bold bg-[#c5a061]/10 px-2 py-0.5 rounded-full">Verified</span>
                                    )}
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Phone</label>
                                {editing ? (
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 9876543210"
                                        className={inputClasses}
                                    />
                                ) : (
                                    <p className="text-white/80 font-medium text-base py-3 px-1">{profile?.phone || '—'}</p>
                                )}
                            </div>

                            {/* Role (read-only) */}
                            <div>
                                <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Account Type</label>
                                <p className="text-white/80 font-medium text-base py-3 px-1 capitalize flex items-center gap-2">
                                    {profile?.role || 'customer'}
                                    {isAdmin && (
                                        <span className="text-[#c5a061] text-xs font-bold bg-[#c5a061]/10 px-2 py-0.5 rounded-full">🛡️ Admin</span>
                                    )}
                                </p>
                            </div>

                            {/* Address — full width */}
                            <div className="md:col-span-2">
                                <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Delivery Address</label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Street, Area, Landmark..."
                                        className={inputClasses}
                                    />
                                ) : (
                                    <p className="text-white/80 font-medium text-base py-3 px-1">{profile?.address || '—'}</p>
                                )}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">City</label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="Your city"
                                        className={inputClasses}
                                    />
                                ) : (
                                    <p className="text-white/80 font-medium text-base py-3 px-1">{profile?.city || '—'}</p>
                                )}
                            </div>

                            {/* Pincode */}
                            <div>
                                <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Pincode</label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value.replace(/[^\d]/g, ''))}
                                        placeholder="560001"
                                        maxLength={6}
                                        className={inputClasses}
                                    />
                                ) : (
                                    <p className="text-white/80 font-medium text-base py-3 px-1">{profile?.pincode || '—'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    {/* Browse Products */}
                    <button
                        onClick={() => router.push('/home')}
                        className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-[#c5a061]/30 transition-all hover:-translate-y-0.5 group"
                    >
                        <div className="p-3 rounded-2xl bg-[#c5a061]/10 group-hover:bg-[#c5a061]/20 transition-colors">
                            <svg className="w-5 h-5 text-[#c5a061]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-white text-sm">Browse Products</p>
                            <p className="text-white/40 text-xs mt-0.5">Continue shopping</p>
                        </div>
                    </button>

                    {/* Admin Dashboard (only for admins) */}
                    {isAdmin && (
                        <button
                            onClick={() => router.push('/admin')}
                            className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-[#c5a061]/20 hover:border-[#c5a061]/40 transition-all hover:-translate-y-0.5 group"
                        >
                            <div className="p-3 rounded-2xl bg-[#c5a061]/10 group-hover:bg-[#c5a061]/20 transition-colors">
                                <svg className="w-5 h-5 text-[#c5a061]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-white text-sm">Admin Dashboard</p>
                                <p className="text-white/40 text-xs mt-0.5">Manage your store</p>
                            </div>
                        </button>
                    )}

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-red-500/30 transition-all hover:-translate-y-0.5 group"
                    >
                        <div className="p-3 rounded-2xl bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-white text-sm">Log Out</p>
                            <p className="text-white/40 text-xs mt-0.5">Sign out of your account</p>
                        </div>
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
