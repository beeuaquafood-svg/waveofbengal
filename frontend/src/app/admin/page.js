'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

function LiveStatCard({ title, value, trend, trendUp, icon, pulse }) {
    return (
        <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl relative overflow-hidden">
            {pulse && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-white/60 text-xs font-semibold tracking-wider mb-1 uppercase">{title}</p>
                    <h3 className="text-3xl font-bold tracking-wide text-white">{value}</h3>
                </div>
                <div className="p-3 text-white/80">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                    </svg>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm">
                <span className={`font-semibold px-2.5 py-1 rounded-2xl flex items-center gap-1.5 ${trendUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={trendUp ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                    </svg>
                    {trend}
                </span>
                <span className="text-white/40 tracking-wide">vs last month</span>
            </div>
        </div>
    )
}

function MiniBarChart({ data, label }) {
    const max = Math.max(...data.map(d => d.value), 1)
    return (
        <div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">{label}</p>
            <div className="flex items-end gap-1 h-24">
                {data.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-oceanic-blue/60 rounded-t-sm transition-all duration-500" style={{ height: `${(d.value / max) * 100}%`, minHeight: '2px' }} />
                        <span className="text-[9px] text-white/40">{d.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TrafficPanel({ pageViews, visitors, topPages }) {
    return (
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold tracking-wide text-white">Live Traffic</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Real-time</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-white/40 text-xs uppercase font-bold">Page Views</p>
                    <p className="text-2xl font-bold text-white mt-1">{pageViews.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-white/40 text-xs uppercase font-bold">Visitors</p>
                    <p className="text-2xl font-bold text-white mt-1">{visitors.toLocaleString()}</p>
                </div>
            </div>
            <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">Top Pages</p>
                <div className="space-y-2">
                    {topPages.map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-white/80 text-sm truncate flex-1">{p.path}</span>
                            <span className="text-white font-bold text-sm ml-2">{p.views}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [traffic, setTraffic] = useState({
        pageViews: 0,
        visitors: 0,
        topPages: [],
        hourly: [],
    })
    const [tick, setTick] = useState(0)

    // Load product data
    useEffect(() => {
        const stored = localStorage.getItem('wob_products')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed)) setProducts(parsed)
            } catch (e) { /* ignore */ }
        }
    }, [])

    // Simulate live traffic (reads from localStorage tracking data if available, otherwise simulates)
    const generateTraffic = useCallback(() => {
        const stored = localStorage.getItem('wob_traffic')
        let base = { pageViews: 2847, visitors: 892 }
        if (stored) {
            try {
                base = JSON.parse(stored)
            } catch (e) { /* ignore */ }
        }

        const jitter = Math.floor(Math.random() * 15) + 1
        const newViews = base.pageViews + jitter
        const newVisitors = base.visitors + Math.floor(jitter / 3)

        const updatedTraffic = {
            pageViews: newViews,
            visitors: newVisitors,
            topPages: [
                { path: '/home', views: Math.floor(newViews * 0.35) },
                { path: '/products', views: Math.floor(newViews * 0.28) },
                { path: '/products/black-tiger-prawns', views: Math.floor(newViews * 0.12) },
                { path: '/our-story', views: Math.floor(newViews * 0.10) },
                { path: '/certifications', views: Math.floor(newViews * 0.08) },
                { path: '/cart', views: Math.floor(newViews * 0.07) },
            ],
            hourly: Array.from({ length: 12 }, (_, i) => ({
                label: `${(i + 8) % 24}:00`,
                value: Math.floor(Math.random() * 120) + 20,
            })),
        }

        localStorage.setItem('wob_traffic', JSON.stringify({ pageViews: newViews, visitors: newVisitors }))
        setTraffic(updatedTraffic)
    }, [])

    useEffect(() => {
        generateTraffic()
        const interval = setInterval(() => {
            generateTraffic()
            setTick(t => t + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [generateTraffic])

    // Compute stats from products
    const totalProducts = products.length
    const totalStock = products.reduce((sum, p) => {
        if (p.sizes?.length) return sum + p.sizes.reduce((s, v) => s + (v.stock || 0), 0)
        return sum + (p.stock || 0)
    }, 0)
    const totalCatalogValue = products.reduce((sum, p) => {
        if (p.sizes?.length) return sum + p.sizes.reduce((s, v) => s + (v.price * (v.stock || 0)), 0)
        return sum + (p.price || 0) * (p.stock || 0)
    }, 0)
    const lowStockCount = products.filter(p => {
        const stock = p.sizes?.length ? p.sizes.reduce((s, v) => s + (v.stock || 0), 0) : (p.stock || 0)
        return stock > 0 && stock <= 15
    }).length

    const categories = {}
    products.forEach(p => { categories[p.category] = (categories[p.category] || 0) + 1 })
    const categoryData = Object.entries(categories).map(([label, value]) => ({ label: label.slice(0, 8), value }))

    return (
        <div className="space-y-8 mb-20 md:mb-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <header>
                    <h1 className="text-4xl font-heading font-medium tracking-wide text-white drop-shadow-md">Dashboard Overview</h1>
                    <p className="text-white/60 mt-2 text-lg">Real-time store performance at a glance.</p>
                </header>
                <Link href="/"
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Return to Homepage
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <LiveStatCard title="Total Products" value={totalProducts} trend={`${totalProducts} active`} trendUp={true}
                    icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                <LiveStatCard title="Total Stock" value={totalStock.toLocaleString()} trend={`${lowStockCount} low stock`} trendUp={lowStockCount === 0}
                    icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                <LiveStatCard title="Catalog Value" value={`₹${totalCatalogValue.toLocaleString()}`} trend="+8.3%" trendUp={true}
                    icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <LiveStatCard title="Page Views" value={traffic.pageViews.toLocaleString()} trend={`${traffic.visitors} visitors`} trendUp={true} pulse={true}
                    icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Traffic Panel */}
                <div className="lg:col-span-2">
                    <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h2 className="text-xl font-bold tracking-wide text-white mb-6">Traffic Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <MiniBarChart data={traffic.hourly} label="Hourly Page Views" />
                            <MiniBarChart data={categoryData.length > 0 ? categoryData : [{ label: 'N/A', value: 0 }]} label="Products by Category" />
                        </div>

                        {/* Top pages */}
                        <div className="mt-6">
                            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">Most Visited Pages</p>
                            <div className="space-y-2">
                                {traffic.topPages.map((p, i) => {
                                    const maxViews = traffic.topPages[0]?.views || 1
                                    return (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-white/50 text-sm w-32 truncate">{p.path}</span>
                                            <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                                                <div className="bg-oceanic-blue/80 h-full rounded-full transition-all duration-700" style={{ width: `${(p.views / maxViews) * 100}%` }} />
                                            </div>
                                            <span className="text-white/70 text-sm font-bold w-12 text-right">{p.views}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div>
                    <TrafficPanel pageViews={traffic.pageViews} visitors={traffic.visitors} topPages={traffic.topPages.slice(0, 4)} />
                </div>
            </div>

            {/* Inventory Quick View */}
            <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold tracking-wide text-white">Inventory Snapshot</h2>
                    <Link href="/admin/products" className="text-oceanic-blue hover:text-white text-sm font-bold tracking-wide transition-colors">
                        Manage Products →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-white/40 text-xs uppercase tracking-wider">
                                <th className="pb-3 pr-4">Product</th>
                                <th className="pb-3 pr-4">Category</th>
                                <th className="pb-3 pr-4">Variants</th>
                                <th className="pb-3 pr-4">Price Range</th>
                                <th className="pb-3">Total Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.slice(0, 8).map(p => {
                                const variants = p.sizes?.length || 1
                                const stock = p.sizes?.reduce((s, v) => s + (v.stock || 0), 0) ?? p.stock ?? 0
                                const prices = p.sizes?.map(s => s.price) || [p.price]
                                const min = Math.min(...prices)
                                const max = Math.max(...prices)
                                const priceStr = min === max ? `₹${min}` : `₹${min}–${max}`
                                return (
                                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                        <td className="py-3 pr-4 text-white font-medium">{p.name}</td>
                                        <td className="py-3 pr-4 text-white/50">{p.category}</td>
                                        <td className="py-3 pr-4 text-white/70">{variants}</td>
                                        <td className="py-3 pr-4 text-white font-medium">{priceStr}</td>
                                        <td className="py-3">
                                            <span className={stock === 0 ? 'text-rose-400' : stock <= 15 ? 'text-amber-400' : 'text-emerald-400'}>{stock}</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
