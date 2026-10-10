'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import HeroSection from '@/components/home/HeroSection';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import SustainabilityBanner from '@/components/home/SustainabilityBanner';
import LandingPage from '@/components/home/LandingPage';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Post-hero content with bg3 background */}
      <div className="relative">
        {/* Fixed Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/bg/landingpagebg.png"
            alt="Ocean Background"
            fill
            className="object-cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-[#0a1628]/40" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10">

          {/* Top sections */}
          <TrustBadges />
          <FeaturedProducts />

          {/* Our Story Teaser Section */}
          <section className="py-24 relative z-20 overflow-hidden border-y border-white/20">
            <div className="absolute inset-0 bg-linear-to-br from-oceanic-blue/5 via-transparent to-transparent opacity-50"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-fraunces font-black text-[#FFFDD0] mb-8 italic">
                "A legacy born from the deep sea"
              </h2>
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
                For three generations, our family has braved the waters of the Bay of Bengal.
                What started as a single wooden trawler has evolved into a promise—to bring you
                only the finest, cleanest, and most sustainable catch the ocean has to offer.
              </p>
              <Link
                href="/our-story"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-ocean-deep font-bold py-3 px-8 rounded-md tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Read Our Journey
              </Link>
            </div>
          </section>

          <Testimonials />
          <SustainabilityBanner />
        </div>
      </div>
    </div>
  );
}
