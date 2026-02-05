'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FileText, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur border-b border-dark-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                            <FileText className="w-4 h-4 text-dark-950" />
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-white">Invoicer</span>
                    </Link>

                    {/* CTA */}
                    <Link href="/create">
                        <Button
                            variant="primary"
                            size="sm"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                            Create Invoice
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
