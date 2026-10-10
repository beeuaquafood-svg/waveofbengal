'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SparkleIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
);

const ChefIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 0119 0A4 4 0 0118 13.87V21H6z" /><line x1="6" y1="17" x2="18" y2="17" />
    </svg>
);

export default function AIRecipe({ product }) {
    const [recipeData, setRecipeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generated, setGenerated] = useState(false);

    // Personalization state
    const [allergies, setAllergies] = useState([]);
    const [cuisinePreference, setCuisinePreference] = useState('');
    const [spiceLevel, setSpiceLevel] = useState('');
    const [cookingStyle, setCookingStyle] = useState('');
    const [customAllergy, setCustomAllergy] = useState('');

    const allergyOptions = ['Gluten', 'Dairy', 'Nuts', 'Soy', 'Eggs', 'Mustard', 'Sesame'];
    const cuisineOptions = ['Bengali', 'South Indian', 'North Indian', 'Indo-Chinese', 'Continental', 'Japanese', 'Thai'];
    const spiceOptions = ['Mild', 'Medium', 'Spicy', 'Extra Spicy'];
    const cookingOptions = ['Quick (Under 30 min)', 'Grilled / BBQ', 'Deep-Fried / Crispy', 'Curry / Gravy', 'Steamed / Healthy', 'Stir-Fry'];

    const toggleAllergy = (allergy) => {
        setAllergies(prev => prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]);
    };

    const addCustomAllergy = () => {
        const trimmed = customAllergy.trim();
        if (trimmed && !allergies.includes(trimmed)) {
            setAllergies(prev => [...prev, trimmed]);
            setCustomAllergy('');
        }
    };

    const generateRecipe = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/ai-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: product.name,
                    category: product.category,
                    description: product.description,
                    allergies,
                    cuisinePreference,
                    spiceLevel,
                    cookingStyle,
                }),
            });
            if (!res.ok) throw new Error('Failed to generate recipe');
            const data = await res.json();
            setRecipeData(data);
            setGenerated(true);
        } catch (e) {
            setError('Could not generate recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-16">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10">
                <h2 className="font-fraunces text-2xl text-stone-800 font-bold italic whitespace-nowrap flex items-center gap-2">
                    <span className="text-amber-600"><SparkleIcon /></span>
                    AI Chef Recipes
                </h2>
                <div className="grow h-px bg-stone-200" />
            </div>

            {/* CTA card — before generation */}
            {!generated && (
                <div className="bg-linear-to-br from-stone-900 to-stone-800 rounded-2xl p-8 md:p-10 shadow-xl space-y-8">
                    <div>
                        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Personalized Culinary Intelligence</p>
                        <h3 className="text-white font-fraunces text-2xl font-bold italic mb-2">
                            What can you cook with {product.name}?
                        </h3>
                        <p className="text-stone-400 text-sm leading-relaxed">
                            Tell us your preferences and we&apos;ll create a recipe tailored just for you.
                        </p>
                    </div>

                    {/* Allergies */}
                    <div>
                        <p className="text-stone-300 text-xs font-bold uppercase tracking-widest mb-3">Any Allergies?</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {allergyOptions.map(a => (
                                <button key={a} onClick={() => toggleAllergy(a)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${allergies.includes(a) ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-white/5 text-stone-400 border-white/10 hover:border-white/30'}`}
                                >{a}</button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input type="text" value={customAllergy} onChange={e => setCustomAllergy(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCustomAllergy()}
                                placeholder="Other allergy..."
                                className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-white/30 w-40"
                            />
                            {customAllergy.trim() && <button onClick={addCustomAllergy} className="text-amber-400 text-xs font-bold">+ Add</button>}
                        </div>
                        {allergies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {allergies.filter(a => !allergyOptions.includes(a)).map(a => (
                                    <span key={a} className="px-2.5 py-1 rounded-full text-xs bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1.5">
                                        {a} <button onClick={() => toggleAllergy(a)} className="hover:text-white">×</button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cuisine Preference */}
                    <div>
                        <p className="text-stone-300 text-xs font-bold uppercase tracking-widest mb-3">Cuisine Style</p>
                        <div className="flex flex-wrap gap-2">
                            {cuisineOptions.map(c => (
                                <button key={c} onClick={() => setCuisinePreference(cuisinePreference === c ? '' : c)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${cuisinePreference === c ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-white/5 text-stone-400 border-white/10 hover:border-white/30'}`}
                                >{c}</button>
                            ))}
                        </div>
                    </div>

                    {/* Spice Level */}
                    <div>
                        <p className="text-stone-300 text-xs font-bold uppercase tracking-widest mb-3">Spice Level</p>
                        <div className="flex flex-wrap gap-2">
                            {spiceOptions.map(s => (
                                <button key={s} onClick={() => setSpiceLevel(spiceLevel === s ? '' : s)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${spiceLevel === s ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' : 'bg-white/5 text-stone-400 border-white/10 hover:border-white/30'}`}
                                >{s}</button>
                            ))}
                        </div>
                    </div>

                    {/* Cooking Style */}
                    <div>
                        <p className="text-stone-300 text-xs font-bold uppercase tracking-widest mb-3">Cooking Style</p>
                        <div className="flex flex-wrap gap-2">
                            {cookingOptions.map(c => (
                                <button key={c} onClick={() => setCookingStyle(cookingStyle === c ? '' : c)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${cookingStyle === c ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-white/5 text-stone-400 border-white/10 hover:border-white/30'}`}
                                >{c}</button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="pt-2">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={generateRecipe}
                            disabled={loading}
                            className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-white font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-widest shadow-lg transition-colors whitespace-nowrap disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Generating Your Personalized Recipe...
                                </>
                            ) : (
                                <>
                                    <SparkleIcon />
                                    Generate My Recipe
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-5 py-4 mt-4">
                    {error}
                </div>
            )}

            {/* Recipe content */}
            <AnimatePresence>
                {recipeData && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Featured Recipe Card */}
                        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-md">
                            {/* Recipe header */}
                            <div className="bg-linear-to-r from-stone-900 to-stone-700 px-8 py-6">
                                <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-1">Featured Recipe</p>
                                <h3 className="text-white font-fraunces text-2xl font-bold italic">
                                    {recipeData.featuredRecipe?.name}
                                </h3>
                                <p className="text-stone-400 text-sm mt-2 leading-relaxed">
                                    {recipeData.featuredRecipe?.intro}
                                </p>
                                {/* Meta pills */}
                                <div className="flex flex-wrap gap-3 mt-4">
                                    {recipeData.featuredRecipe?.prepTime && (
                                        <span className="flex items-center gap-1.5 text-stone-300 text-xs bg-white/10 px-3 py-1.5 rounded-full">
                                            <ClockIcon /> Prep: {recipeData.featuredRecipe.prepTime}
                                        </span>
                                    )}
                                    {recipeData.featuredRecipe?.cookTime && (
                                        <span className="flex items-center gap-1.5 text-stone-300 text-xs bg-white/10 px-3 py-1.5 rounded-full">
                                            <ClockIcon /> Cook: {recipeData.featuredRecipe.cookTime}
                                        </span>
                                    )}
                                    {recipeData.featuredRecipe?.serves && (
                                        <span className="flex items-center gap-1.5 text-stone-300 text-xs bg-white/10 px-3 py-1.5 rounded-full">
                                            <UsersIcon /> Serves {recipeData.featuredRecipe.serves}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Ingredients + Steps */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-100">
                                {/* Ingredients */}
                                <div className="p-8">
                                    <h4 className="font-semibold text-stone-700 text-sm uppercase tracking-widest mb-4">Ingredients</h4>
                                    <ul className="space-y-2">
                                        {recipeData.featuredRecipe?.ingredients?.map((ing, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-stone-600 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                                {ing}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Steps */}
                                <div className="p-8">
                                    <h4 className="font-semibold text-stone-700 text-sm uppercase tracking-widest mb-4">Cooking Instructions</h4>
                                    <ol className="space-y-3">
                                        {recipeData.featuredRecipe?.steps?.map((step, i) => (
                                            <li key={i} className="flex items-start gap-3 text-stone-600 text-sm leading-relaxed">
                                                <span className="w-5 h-5 rounded-full bg-stone-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                    {i + 1}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* Other Dishes Grid */}
                        <div>
                            <h4 className="font-fraunces text-xl text-stone-800 font-bold italic mb-4">More Dishes You Can Make</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {recipeData.otherDishes?.map((dish, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="bg-white border border-stone-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center mb-3 text-amber-600">
                                            <SparkleIcon />
                                        </div>
                                        <h5 className="font-semibold text-stone-800 text-sm mb-1.5">{dish.name}</h5>
                                        <p className="text-stone-400 text-xs leading-relaxed">{dish.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Chef Tip */}
                        {recipeData.chefTip && (
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                                <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0">
                                    <ChefIcon />
                                </div>
                                <div>
                                    <p className="text-amber-800 text-xs font-bold uppercase tracking-widest mb-1">Pro Chef Tip</p>
                                    <p className="text-stone-700 text-sm leading-relaxed">{recipeData.chefTip}</p>
                                </div>
                            </div>
                        )}

                        {/* Regenerate */}
                        <div className="text-right">
                            <button
                                onClick={generateRecipe}
                                disabled={loading}
                                className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-800 uppercase tracking-wider transition-colors disabled:opacity-50"
                            >
                                <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
                                </svg>
                                Generate New Recipe
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
