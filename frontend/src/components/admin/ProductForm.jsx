'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const CATEGORIES = ['Prawns', 'Ready-to-Cook', 'Trial Packs', 'Signature Dishes', "Chef's Special"]

const emptyVariant = () => ({ id: Date.now().toString(), label: '', price: '', stock: '' })

export default function ProductForm({ onClose, editProduct, onSave }) {
    const [formData, setFormData] = useState({
        name: editProduct?.name || '',
        category: editProduct?.category || '',
        description: editProduct?.description || '',
        subtitle: editProduct?.subtitle || '',
    })

    const [variants, setVariants] = useState(() => {
        if (editProduct?.sizes?.length) {
            return editProduct.sizes.map(s => ({
                id: s.id || Date.now().toString(),
                label: s.label || '',
                price: s.price?.toString() || '',
                stock: s.stock?.toString() || '0',
            }))
        }
        if (editProduct?.price) {
            return [{
                id: editProduct.weight || '1',
                label: editProduct.weight || '',
                price: editProduct.price.toString(),
                stock: editProduct.stock?.toString() || '0',
            }]
        }
        return [emptyVariant()]
    })

    const [images, setImages] = useState(() => {
        if (editProduct?.images?.length) return editProduct.images
        if (editProduct?.image) return [editProduct.image]
        return []
    })

    const fileInputRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const addVariant = () => setVariants(prev => [...prev, emptyVariant()])

    const removeVariant = (idx) => {
        if (variants.length <= 1) return
        setVariants(prev => prev.filter((_, i) => i !== idx))
    }

    const updateVariant = (idx, field, value) => {
        setVariants(prev => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v))
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return
        const remaining = 3 - images.length
        files.slice(0, remaining).forEach(file => {
            if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) return
            const reader = new FileReader()
            reader.onload = (ev) => {
                setImages(prev => prev.length >= 3 ? prev : [...prev, ev.target.result])
            }
            reader.readAsDataURL(file)
        })
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const removeImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx))

    const handleSubmit = (e) => {
        e.preventDefault()
        const sizes = variants
            .filter(v => v.label && v.price)
            .map(v => ({
                id: v.label.toLowerCase().replace(/\s+/g, ''),
                label: v.label,
                price: Number(v.price),
                stock: Number(v.stock) || 0,
            }))

        const totalStock = sizes.reduce((sum, s) => sum + s.stock, 0)
        const basePrice = sizes.length > 0 ? Math.min(...sizes.map(s => s.price)) : 0

        const product = {
            id: editProduct?.id || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name: formData.name,
            category: formData.category,
            description: formData.description,
            subtitle: formData.subtitle,
            sizes,
            price: basePrice,
            stock: totalStock,
            weight: sizes.length > 0 ? sizes[0].label : '',
            status: totalStock > 0 ? 'active' : 'out-of-stock',
            images: images.length > 0 ? images : ['/images/black%20tiger.jpeg'],
            image: images.length > 0 ? images[0] : (editProduct?.image || '/images/black%20tiger.jpeg'),
            rating: editProduct?.rating || 4,
        }
        if (onSave) onSave(product)
        if (onClose) onClose()
    }

    const inputClass = "w-full bg-white/60 border border-white/40 rounded-2xl px-4 py-3 text-ocean-deep focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 placeholder:text-ocean-muted/60 transition-all font-medium"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card bg-white/50 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto w-full"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-fraunces font-bold text-ocean-deep">
                    {editProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                {onClose && (
                    <button onClick={onClose} className="p-2 text-ocean-muted hover:text-ocean-deep rounded-full hover:bg-white/40 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div>
                    <h3 className="text-sm font-bold text-ocean-deep tracking-wide uppercase mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Product Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Black Tiger Prawns" required className={inputClass} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} required className={`${inputClass} appearance-none`}>
                                <option value="" disabled>Select Category</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Subtitle</label>
                            <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="e.g. Export Freeze Count | Premium" className={inputClass} />
                        </div>
                    </div>
                    <div className="mt-6 space-y-2">
                        <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Description</label>
                        <textarea name="description" rows="3" value={formData.description} onChange={handleChange} placeholder="Tell us about the source, taste notes..." required className={`${inputClass} resize-none`} />
                    </div>
                </div>

                {/* Size / Weight Variants */}
                <div>
                    <h3 className="text-sm font-bold text-ocean-deep tracking-wide uppercase mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        Size &amp; Price Variants
                    </h3>
                    <p className="text-ocean-muted text-sm mb-4">Add different weight/size options with individual pricing and stock.</p>

                    <div className="space-y-3">
                        <AnimatePresence>
                            {variants.map((v, idx) => (
                                <motion.div
                                    key={v.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-end bg-white/30 p-4 rounded-xl border border-white/30"
                                >
                                    <div className="flex-1 space-y-1 w-full sm:w-auto">
                                        <label className="text-xs font-bold text-ocean-deep/80 uppercase">Weight / Size</label>
                                        <input type="text" value={v.label} onChange={(e) => updateVariant(idx, 'label', e.target.value)} placeholder="e.g. 250g" required className={inputClass} />
                                    </div>
                                    <div className="flex-1 space-y-1 w-full sm:w-auto">
                                        <label className="text-xs font-bold text-ocean-deep/80 uppercase">Price (₹)</label>
                                        <input type="number" value={v.price} onChange={(e) => updateVariant(idx, 'price', e.target.value)} placeholder="680" required min="0" className={inputClass} />
                                    </div>
                                    <div className="flex-1 space-y-1 w-full sm:w-auto">
                                        <label className="text-xs font-bold text-ocean-deep/80 uppercase">Stock</label>
                                        <input type="number" value={v.stock} onChange={(e) => updateVariant(idx, 'stock', e.target.value)} placeholder="100" min="0" className={inputClass} />
                                    </div>
                                    <button type="button" onClick={() => removeVariant(idx)} disabled={variants.length <= 1}
                                        className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0" title="Remove variant">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <button type="button" onClick={addVariant}
                        className="mt-3 flex items-center gap-2 px-4 py-2 text-sm font-bold text-oceanic-blue hover:text-ocean-deep bg-white/30 hover:bg-white/50 border border-dashed border-oceanic-blue/40 rounded-xl transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Another Variant
                    </button>
                </div>

                {/* Image Upload */}
                <div>
                    <h3 className="text-sm font-bold text-ocean-deep tracking-wide uppercase mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Product Images ({images.length}/3)
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-white/40 group">
                                {img.startsWith('data:') ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                                ) : (
                                    <Image src={img} alt={`Product ${idx + 1}`} fill className="object-cover" unoptimized />
                                )}
                                <button type="button" onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                                    &times;
                                </button>
                            </div>
                        ))}
                        {images.length < 3 && (
                            <button type="button" onClick={() => fileInputRef.current?.click()}
                                className="w-28 h-28 rounded-xl border-2 border-dashed border-oceanic-blue/40 flex flex-col items-center justify-center text-oceanic-blue hover:bg-white/30 transition-colors cursor-pointer">
                                <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                                <span className="text-[10px] font-bold uppercase tracking-wide">Upload</span>
                            </button>
                        )}
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    <p className="text-ocean-muted text-xs">Upload up to 3 images. Max 5MB each. JPG, PNG, WebP</p>
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-4 border-t border-white/20">
                    {onClose && (
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-full font-bold text-ocean-muted hover:text-ocean-deep hover:bg-white/40 transition-colors">
                            Cancel
                        </button>
                    )}
                    <button type="submit" className="bg-oceanic-blue text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(56,189,248,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(56,189,248,0.5)] transition-all duration-300 uppercase tracking-wider">
                        {editProduct ? 'Update Product' : 'Save Product'}
                    </button>
                </div>
            </form>
        </motion.div>
    )
}
