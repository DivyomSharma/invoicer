'use client';

import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-10 px-4 sm:px-6 border-t border-dark-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded bg-white flex items-center justify-center">
                            <FileText className="w-3.5 h-3.5 text-dark-950" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-white">Invoicer</span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/create"
                            className="text-dark-400 hover:text-white text-xs uppercase tracking-wider transition-colors"
                        >
                            Create Invoice
                        </Link>
                        <a
                            href="#features"
                            className="text-dark-400 hover:text-white text-xs uppercase tracking-wider transition-colors"
                        >
                            Features
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-dark-800 text-center">
                    <p className="text-dark-500 text-[10px] uppercase tracking-widest">
                        © {new Date().getFullYear()} Invoicer — Powered by PlotArmour Studio
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
