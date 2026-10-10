'use client'

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-sky-light border-t border-oceanic-blue/20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="font-heading text-2xl font-black text-ocean-deep tracking-wider block mb-4">
                            Wave of Bengal
                        </Link>
                        <p className="text-ocean-muted text-sm leading-relaxed mb-6 font-medium">
                            Premium, sustainably sourced seafood delivered fresh from the ocean to your doorstep.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-ocean-muted hover:text-oceanic-blue transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* Facebook Icon placeholder */}
                            <a href="#" className="text-ocean-muted hover:text-oceanic-blue transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-heading text-lg font-bold text-ocean-deep mb-4">Explore</h4>
                        <ul className="space-y-3">
                            <li><Link href="/products" className="text-ocean-muted hover:text-oceanic-blue text-sm font-semibold transition-colors">Our Catch</Link></li>
                            <li><Link href="/our-story" className="text-ocean-muted hover:text-oceanic-blue text-sm font-semibold transition-colors">Our Story</Link></li>
                            <li><Link href="/sustainability" className="text-ocean-muted hover:text-oceanic-blue text-sm font-semibold transition-colors">Sustainability</Link></li>
                            <li><Link href="/certifications" className="text-ocean-muted hover:text-oceanic-blue text-sm font-semibold transition-colors">Certifications</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-heading text-lg font-bold text-ocean-deep mb-4">Support</h4>
                        <ul className="space-y-3">
                            <li><Link href="/faq" className="text-ocean-muted hover:text-oceanic-blue text-sm font-semibold transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-ocean-muted hover:text-oceanic-blue text-sm font-semibold transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="text-ocean-muted hover:text-oceanic-blue text-sm font-semibold transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-heading text-lg font-bold text-ocean-deep mb-4">Newsletter</h4>
                        <p className="text-ocean-muted text-sm mb-4 font-medium">
                            Subscribe to get special offers and updates on fresh catches.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white border border-oceanic-blue/20 rounded-l- px-4 py-2 text-sm text-ocean-deep focus:outline-none focus:border-oceanic-blue w-full font-medium"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-ocean-deep hover:bg-oceanic-blue text-sky-light font-bold px-4 py-2 rounded-r- transition-colors"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-oceanic-blue/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-ocean-deep font-semibold text-sm">
                        &copy; {new Date().getFullYear()} Wave of Bengal. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-ocean-muted hover:text-oceanic-blue text-sm font-medium transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-ocean-muted hover:text-oceanic-blue text-sm font-medium transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
