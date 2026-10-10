'use client'

import { useState, useEffect } from 'react'
import ProductForm from '@/components/admin/ProductForm'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_PRODUCTS = [
    { id: 'black-tiger-prawns', name: 'Black Tiger Prawns', category: 'Prawns', price: 680, stock: 100, weight: '250g', description: 'Our flagship variety - large, succulent prawns with distinctive black stripes.', status: 'active', image: '/images/black%20tiger.jpeg', rating: 5, sizes: [{ id: '250g', label: '250g', price: 680, stock: 40 }, { id: '500g', label: '500g', price: 1200, stock: 35 }, { id: '1kg', label: '1 Kg', price: 2200, stock: 25 }] },
    { id: 'butter-prawns', name: 'Butter Prawns', category: 'Prawns', price: 500, stock: 80, weight: '250g', description: 'Marinated in rich garlic butter and aromatic herbs. Ready to sauté or grill.', status: 'active', image: '/images/butter%20prawns%20.jpeg', rating: 4, sizes: [{ id: '250g', label: '250g', price: 500, stock: 30 }, { id: '500g', label: '500g', price: 950, stock: 30 }, { id: '1kg', label: '1 Kg', price: 1800, stock: 20 }] },
    { id: 'prawn-skewers', name: 'Prawn Skewers', category: 'Ready-to-Cook', price: 450, stock: 60, weight: '200g', description: 'Expertly threaded and seasoned prawns on bamboo skewers for BBQ & grilling.', status: 'active', image: '/images/skewers.jpeg', rating: 5, sizes: [{ id: '200g', label: '200g', price: 450, stock: 30 }, { id: '400g', label: '400g', price: 850, stock: 20 }, { id: '800g', label: '800g', price: 1600, stock: 10 }] },
    { id: 'vannamei-prawns', name: 'Vannamei Prawns', category: 'Prawns', price: 400, stock: 120, weight: '250g', description: 'Premium white prawns with delicate, sweet flavor for all cooking methods.', status: 'active', image: '/images/black%20tiger.jpeg', rating: 4, sizes: [{ id: '250g', label: '250g', price: 400, stock: 50 }, { id: '500g', label: '500g', price: 750, stock: 40 }, { id: '1kg', label: '1 Kg', price: 1400, stock: 30 }] },
    { id: 'headless-peeled-shrimp', name: 'Headless Peeled Shrimp', category: 'Prawns', price: 430, stock: 90, weight: '250g', description: 'Cleaned, deveined and ready to cook. Saves prep time with premium freshness.', status: 'active', image: '/images/butter%20prawns%20.jpeg', rating: 3, sizes: [{ id: '250g', label: '250g', price: 430, stock: 30 }, { id: '500g', label: '500g', price: 800, stock: 35 }, { id: '1kg', label: '1 Kg', price: 1500, stock: 25 }] },
    { id: 'shrimp-ebi-fry', name: 'Shrimp Ebi Fry', category: 'Ready-to-Cook', price: 500, stock: 70, weight: '200g', description: 'Japanese-style breaded prawns, pre-seasoned and ready to fry to crispy perfection.', status: 'active', image: '/images/skewers.jpeg', rating: 5, sizes: [{ id: '200g', label: '200g', price: 500, stock: 35 }, { id: '400g', label: '400g', price: 900, stock: 35 }] },
    { id: 'connoisseurs-collection', name: "Connoisseur's Collection", category: 'Signature Dishes', price: 1350, stock: 50, weight: '750g', description: 'Experience our signature trio: Black Tiger (250g), Vannamei (250g), Butter Prawns (250g).', status: 'active', image: '/images/black%20tiger.jpeg', rating: 5, sizes: [{ id: '750g', label: '750g', price: 1350, stock: 50 }] },
    { id: 'chefs-starter-pack', name: "Chef's Starter Pack", category: "Chef's Special", price: 1250, stock: 40, weight: '700g', description: 'Ready-to-cook premium selections: Butterfly Cut (250g), Marinated Shrimp (250g), Skewers (200g).', status: 'active', image: '/images/butter%20prawns%20.jpeg', rating: 4, sizes: [{ id: '700g', label: '700g', price: 1250, stock: 40 }] },
    { id: 'trial-prawn-sampler', name: 'Trial Prawn Sampler', category: 'Trial Packs', price: 499, stock: 100, weight: '300g', description: 'Try our best-sellers: Black Tiger (100g), Vannamei (100g), Butter Prawns (100g). Perfect for first-time buyers.', status: 'active', image: '/images/black%20tiger.jpeg', rating: 5, sizes: [{ id: '300g', label: '300g', price: 499, stock: 100 }] },
    { id: 'trial-ready-to-cook', name: 'Trial Ready-to-Cook Box', category: 'Trial Packs', price: 449, stock: 80, weight: '300g', description: 'Mini portions of Ebi Fry (150g) and Prawn Skewers (150g). Taste before you commit!', status: 'active', image: '/images/skewers.jpeg', rating: 4, sizes: [{ id: '300g', label: '300g', price: 449, stock: 80 }] },
    { id: 'chefs-bengali-special', name: "Chef's Bengali Special", category: "Chef's Special", price: 1100, stock: 35, weight: '500g', description: 'Authentic Bengali-style marinated prawns with mustard, turmeric & green chili. A true Kolkata delicacy.', status: 'active', image: '/images/butter%20prawns%20.jpeg', rating: 5, sizes: [{ id: '500g', label: '500g', price: 1100, stock: 35 }] },
    { id: 'signature-bay-platter', name: 'Bay of Bengal Platter', category: 'Signature Dishes', price: 2200, stock: 25, weight: '1 Kg', description: 'Our crown jewel — hand-picked jumbo Black Tiger, Vannamei, and seasoned Scampi in one premium box.', status: 'active', image: '/images/black%20tiger.jpeg', rating: 5, sizes: [{ id: '1kg', label: '1 Kg', price: 2200, stock: 25 }] },
]

const CATEGORIES = ['All', 'Prawns', 'Ready-to-Cook', 'Trial Packs', 'Signature Dishes', "Chef's Special"]

export default function AdminProductsPage() {
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem('wob_products')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setProducts(parsed)
                    return
                }
            } catch (e) { /* ignore */ }
        }
        setProducts(DEFAULT_PRODUCTS)
        localStorage.setItem('wob_products', JSON.stringify(DEFAULT_PRODUCTS))
    }, [])

    const saveProducts = (updated) => {
        setProducts(updated)
        localStorage.setItem('wob_products', JSON.stringify(updated))
    }

    const handleSaveProduct = (product) => {
        if (editingProduct) {
            const updated = products.map(p => p.id === editingProduct.id ? { ...p, ...product, id: editingProduct.id } : p)
            saveProducts(updated)
        } else {
            saveProducts([...products, product])
        }
        setEditingProduct(null)
        setShowForm(false)
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setShowForm(true)
    }

    const handleDelete = (id) => {
        if (!confirm('Delete this product? This cannot be undone.')) return
        const updated = products.filter(p => p.id !== id)
        saveProducts(updated)
    }

    const getStatus = (p) => {
        const total = p.sizes?.reduce((s, v) => s + (v.stock || 0), 0) ?? p.stock ?? 0
        if (total === 0) return 'Out of Stock'
        if (total <= 15) return 'Low Stock'
        return 'Active'
    }

    const getTotalStock = (p) => p.sizes?.reduce((s, v) => s + (v.stock || 0), 0) ?? p.stock ?? 0

    const getPriceRange = (p) => {
        if (!p.sizes?.length) return `₹${p.price}`
        const prices = p.sizes.map(s => s.price)
        const min = Math.min(...prices)
        const max = Math.max(...prices)
        return min === max ? `₹${min}` : `₹${min} – ₹${max}`
    }

    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchCat = categoryFilter === 'All' || p.category === categoryFilter
        return matchSearch && matchCat
    })

    const stats = {
        total: products.length,
        active: products.filter(p => getStatus(p) === 'Active').length,
        lowStock: products.filter(p => getStatus(p) === 'Low Stock').length,
        outOfStock: products.filter(p => getStatus(p) === 'Out of Stock').length,
    }

    return (
        <div className="space-y-8 mb-20 md:mb-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <header>
                    <h1 className="text-4xl font-heading font-bold text-white drop-shadow-md">Product Management</h1>
                    <p className="text-white/60 mt-2">Manage products, sizes, pricing and images.</p>
                </header>
                {!showForm && (
                    <button onClick={() => { setEditingProduct(null); setShowForm(true); }}
                        className="bg-oceanic-blue text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(56,189,248,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(56,189,248,0.5)] transition-all duration-300 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Product
                    </button>
                )}
            </div>

            {/* Quick Stats */}
            {!showForm && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Products', val: stats.total, color: 'text-white' },
                        { label: 'Active', val: stats.active, color: 'text-emerald-400' },
                        { label: 'Low Stock', val: stats.lowStock, color: 'text-amber-400' },
                        { label: 'Out of Stock', val: stats.outOfStock, color: 'text-rose-400' },
                    ].map(s => (
                        <div key={s.label} className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-4">
                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider">{s.label}</p>
                            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.val}</p>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {showForm ? (
                    <motion.div key="form" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                        <ProductForm onClose={() => { setShowForm(false); setEditingProduct(null); }} editProduct={editingProduct} onSave={handleSaveProduct} />
                    </motion.div>
                ) : (
                    <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1 max-w-md">
                                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-black/30 backdrop-blur border border-white/10 rounded-full pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 placeholder:text-white/40 transition-all font-medium" />
                                <svg className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {CATEGORIES.map(cat => (
                                    <button key={cat} onClick={() => setCategoryFilter(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${categoryFilter === cat ? 'bg-oceanic-blue text-white shadow-lg' : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Cards */}
                        <div className="space-y-4">
                            {filtered.map((product) => {
                                const isExpanded = expandedId === product.id
                                const status = getStatus(product)
                                return (
                                    <motion.div key={product.id} layout className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
                                        {/* Main row */}
                                        <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-colors"
                                            onClick={() => setExpandedId(isExpanded ? null : product.id)}>
                                            {/* Thumbnail */}
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white/10 relative">
                                                {(product.images?.[0] || product.image) && (
                                                    (product.images?.[0] || product.image).startsWith('data:') ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={product.images?.[0] || product.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Image src={product.images?.[0] || product.image} alt="" fill className="object-cover" unoptimized />
                                                    )
                                                )}
                                            </div>
                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-white truncate">{product.name}</h3>
                                                <p className="text-white/50 text-sm">{product.category}</p>
                                            </div>
                                            {/* Price range */}
                                            <div className="text-right hidden sm:block">
                                                <p className="text-white font-bold">{getPriceRange(product)}</p>
                                                <p className="text-white/40 text-xs">{product.sizes?.length || 1} variant{(product.sizes?.length || 1) > 1 ? 's' : ''}</p>
                                            </div>
                                            {/* Stock */}
                                            <div className="text-right hidden md:block">
                                                <p className="text-white font-medium">{getTotalStock(product)}</p>
                                                <p className="text-white/40 text-xs">in stock</p>
                                            </div>
                                            {/* Status */}
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : status === 'Low Stock' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                                {status}
                                            </span>
                                            {/* Actions */}
                                            <div className="flex gap-2 shrink-0">
                                                <button onClick={(e) => { e.stopPropagation(); handleEdit(product); }}
                                                    className="text-white/60 hover:text-oceanic-blue transition-colors p-2 hover:bg-white/10 rounded-lg" title="Edit">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}
                                                    className="text-white/60 hover:text-rose-400 transition-colors p-2 hover:bg-white/10 rounded-lg" title="Delete">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                            {/* Expand icon */}
                                            <svg className={`w-5 h-5 text-white/40 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </div>

                                        {/* Expanded detail */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                    <div className="px-4 pb-4 pt-2 border-t border-white/10 space-y-4">
                                                        {/* Description */}
                                                        <p className="text-white/60 text-sm">{product.description}</p>

                                                        {/* Images */}
                                                        {(product.images?.length > 0 || product.image) && (
                                                            <div>
                                                                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">Images</p>
                                                                <div className="flex gap-3">
                                                                    {(product.images || [product.image]).map((img, i) => (
                                                                        <div key={i} className="w-20 h-20 rounded-lg overflow-hidden bg-white/10 relative">
                                                                            {img.startsWith('data:') ? (
                                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                                            ) : (
                                                                                <Image src={img} alt="" fill className="object-cover" unoptimized />
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Variants table */}
                                                        {product.sizes?.length > 0 && (
                                                            <div>
                                                                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">Size Variants</p>
                                                                <div className="overflow-x-auto">
                                                                    <table className="w-full text-left text-sm">
                                                                        <thead>
                                                                            <tr className="text-white/40 text-xs uppercase tracking-wider">
                                                                                <th className="pb-2 pr-6">Size</th>
                                                                                <th className="pb-2 pr-6">Price</th>
                                                                                <th className="pb-2">Stock</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-white/5">
                                                                            {product.sizes.map((s, i) => (
                                                                                <tr key={i}>
                                                                                    <td className="py-2 pr-6 text-white font-medium">{s.label}</td>
                                                                                    <td className="py-2 pr-6 text-white">₹{s.price}</td>
                                                                                    <td className="py-2">
                                                                                        <span className={`${(s.stock || 0) === 0 ? 'text-rose-400' : (s.stock || 0) <= 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                                                            {s.stock || 0}
                                                                                        </span>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )
                            })}

                            {filtered.length === 0 && (
                                <div className="text-center py-12 text-white/40">
                                    <p className="text-lg font-medium">No products found</p>
                                    <p className="text-sm mt-1">Adjust your search or category filter</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
