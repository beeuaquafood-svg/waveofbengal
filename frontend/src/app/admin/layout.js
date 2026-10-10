'use client'

import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminGuard from '@/components/admin/AdminGuard'
import Image from 'next/image'

export default function AdminLayout({ children }) {
    return (
        <AdminGuard>
            <div className="relative flex min-h-screen text-[#f0ead6] selection:bg-oceanic-blue/20">

                {/* Cinematic Glassmorphic Background Layer - Starry Night Ocean */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#02070e]">
                    <div className="absolute inset-0 opacity-100">
                        <Image
                            src="/images/bg/Image8.jpeg"
                            alt="Admin Portal Background"
                            fill
                            className="object-cover object-center"
                            quality={100}
                            priority
                            unoptimized
                        />
                    </div>

                    {/* 
                      Very subtle transparent layer (maximum 10–15% opacity) that does not hide or dull the waves.
                    */}
                    <div className="absolute inset-0 bg-[#02070e]/15" />
                </div>

                {/* Interactive Dashboard UI Layer */}
                <div className="relative z-10 flex w-full h-full">
                    <AdminSidebar />
                    <main className="flex-1 ml-0 md:ml-64 p-6 lg:p-10 transition-all pb-24 md:pb-10">
                        {children}
                    </main>
                </div>
            </div>
        </AdminGuard>
    )
}
