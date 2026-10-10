'use client'

import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Rohan Kapoor",
        location: "Mumbai",
        rating: 5,
        text: "The freshest prawns I've ever ordered online. Perfectly cleaned, packed with ice, and arrived right on time for our dinner party."
    },
    {
        name: "Ananya Desai",
        location: "Pune",
        rating: 5,
        text: "I was hesitant to order seafood online, but the quality of the Pomfret was restaurant-grade. The packaging kept it completely chilled."
    },
    {
        name: "Vikram Sethi",
        location: "Bengaluru",
        rating: 5,
        text: "Consistent quality every single time. The Salmon steaks are incredible. Wave of Bengal is now my only source for premium catches."
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-cinzel font-black text-[#FFFDD0] mb-4"
                    >
                        Words from Our Patrons
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gold mx-auto"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: idx * 0.2 }}
                            className="glass-card hover:border-white/30 p-8"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>
                            <p className="text-white font-medium italic leading-relaxed mb-8">
                                "{testimonial.text}"
                            </p>
                            <div className="mt-auto">
                                <p className="font-heading font-bold text-[#FFFDD0] text-lg">{testimonial.name}</p>
                                <p className="text-white/70 font-medium text-sm">{testimonial.location}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
