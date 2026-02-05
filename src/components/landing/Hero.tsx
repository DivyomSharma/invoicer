'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Hero3DBackground } from './Hero3DBackground';
import { ArrowRight, Shield, Zap, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
    return (
        <section className="relative pt-28 pb-20 px-4 sm:px-6 overflow-hidden min-h-[90vh] flex items-center">
            {/* Animated Background */}
            <Hero3DBackground />

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <div className="text-center max-w-3xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-dark-700 mb-8 bg-dark-900/50 backdrop-blur-sm">
                        <span className="text-[10px] uppercase tracking-widest text-dark-300">
                            Free • No Sign-up • Privacy First
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight uppercase tracking-wide">
                        Create Professional
                        <br />
                        <span className="text-dark-400">Invoices Instantly</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-sm sm:text-base text-dark-400 mb-10 max-w-xl mx-auto leading-relaxed">
                        Generate beautiful invoices in seconds. No account needed.
                        Your data stays private — everything runs locally in your browser.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href="/create">
                            <Button
                                size="lg"
                                variant="primary"
                                rightIcon={<ArrowRight className="w-5 h-5" />}
                            >
                                Get Started
                            </Button>
                        </Link>
                        <span className="text-dark-500 text-xs uppercase tracking-wider">Free, forever</span>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-dark-500 text-xs uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span>Privacy First</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            <span>Instant PDF</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span>Professional</span>
                        </div>
                    </div>
                </div>

                {/* Preview Mockup */}
                <div className="mt-16 relative">
                    <div className="relative max-w-3xl mx-auto">
                        {/* Invoice Preview Card */}
                        <div className="rounded border border-dark-700 p-4 sm:p-6 bg-dark-900/80 backdrop-blur-sm">
                            <div className="bg-white rounded p-6">
                                {/* Fake Invoice Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="w-10 h-10 rounded bg-dark-900 mb-3" />
                                        <div className="w-32 h-3 bg-dark-200 rounded mb-2" />
                                        <div className="w-24 h-2 bg-dark-100 rounded" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-dark-900 uppercase tracking-wider mb-2">Invoice</div>
                                        <div className="w-20 h-2 bg-dark-100 rounded ml-auto mb-1" />
                                        <div className="w-16 h-2 bg-dark-100 rounded ml-auto" />
                                    </div>
                                </div>
                                {/* Fake Line Items */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between py-2 border-b border-dark-100">
                                        <div className="w-40 h-2 bg-dark-100 rounded" />
                                        <div className="w-14 h-2 bg-dark-100 rounded" />
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-dark-100">
                                        <div className="w-32 h-2 bg-dark-100 rounded" />
                                        <div className="w-14 h-2 bg-dark-100 rounded" />
                                    </div>
                                </div>
                                {/* Fake Total */}
                                <div className="flex justify-end">
                                    <div className="text-right">
                                        <div className="text-base font-bold text-dark-900">Total: $1,250.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
