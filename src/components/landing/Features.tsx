'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import {
    Shield,
    Zap,
    Globe,
    Upload,
    FileDown,
    HardDrive,
    CreditCard,
    Printer,
    Smartphone
} from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Privacy First',
        description: 'Your data never leaves your browser. No collection, storage, or transmission.',
    },
    {
        icon: Zap,
        title: 'Instant Generation',
        description: 'Create professional invoices in seconds. Everything happens locally.',
    },
    {
        icon: Globe,
        title: 'Multi-Currency',
        description: 'Support for 20+ currencies with automatic symbol formatting.',
    },
    {
        icon: Upload,
        title: 'Custom Logo',
        description: 'Upload your company logo to create branded invoices.',
    },
    {
        icon: FileDown,
        title: 'PDF Download',
        description: 'Download high-quality PDF invoices ready to send.',
    },
    {
        icon: HardDrive,
        title: 'Local Storage',
        description: 'Save drafts locally. Your work is never lost.',
    },
    {
        icon: CreditCard,
        title: 'No Sign-up',
        description: 'Start creating invoices immediately. No account needed.',
    },
    {
        icon: Printer,
        title: 'Print Ready',
        description: 'Print invoices directly from your browser.',
    },
    {
        icon: Smartphone,
        title: 'Mobile Friendly',
        description: 'Works perfectly on all devices.',
    },
];

export const Features: React.FC = () => {
    return (
        <section className="py-20 px-4 sm:px-6 border-t border-dark-800" id="features">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 uppercase tracking-wider">
                        Features
                    </h2>
                    <p className="text-sm text-dark-400 max-w-lg mx-auto">
                        Fast, free, and respects your privacy.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            variant="default"
                            padding="md"
                            hover
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded bg-dark-800 flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-5 h-5 text-dark-300" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                                        {feature.title}
                                    </h3>
                                    <p className="text-dark-400 text-xs leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
