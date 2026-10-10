'use client'

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminGuard({ children }) {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace('/admin-login');
            } else if (!isAdmin) {
                router.replace('/home');
            }
        }
    }, [user, isAdmin, loading, router]);

    // Loading state
    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02070e]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <p className="text-white/50 text-sm tracking-widest uppercase font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Not authenticated or not admin — render nothing (redirect happening in useEffect)
    if (!user || !isAdmin) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02070e]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <p className="text-white/50 text-sm tracking-widest uppercase font-medium">Redirecting...</p>
                </div>
            </div>
        );
    }

    // Admin — render children
    return children;
}
