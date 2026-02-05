'use client';

import React from 'react';

// Pure CSS animated background with floating elements
export const Hero3DBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            {/* Floating geometric shapes */}
            <div className="absolute top-[10%] left-[10%] w-32 h-32 border border-dark-700/30 rotate-45 animate-float-slow" />
            <div className="absolute top-[60%] right-[15%] w-24 h-24 border border-dark-700/20 rotate-12 animate-float-medium" />
            <div className="absolute top-[30%] right-[25%] w-16 h-16 bg-dark-800/30 rounded-full animate-float-fast" />
            <div className="absolute bottom-[20%] left-[20%] w-20 h-20 border border-dark-700/25 rounded-full animate-float-medium" />

            {/* Wireframe box effect */}
            <div className="absolute top-[15%] right-[10%] w-40 h-40 border border-dark-700/20 animate-spin-slow">
                <div className="absolute inset-2 border border-dark-700/15 rotate-6" />
                <div className="absolute inset-4 border border-dark-700/10 rotate-12" />
            </div>

            {/* Ring elements */}
            <div className="absolute top-[40%] left-[5%] w-48 h-48 border-2 border-dark-700/20 rounded-full animate-pulse-slow" />
            <div className="absolute top-[45%] left-[7%] w-40 h-40 border border-dark-700/15 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />

            {/* Gradient orbs */}
            <div className="absolute top-[20%] left-[40%] w-64 h-64 bg-dark-800/20 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-[10%] right-[20%] w-48 h-48 bg-dark-800/15 rounded-full blur-2xl animate-float-medium" />

            {/* Vertical Lines */}
            <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-dark-700/20 to-transparent" />
            <div className="absolute top-0 left-[70%] w-px h-full bg-gradient-to-b from-transparent via-dark-700/15 to-transparent" />
        </div>
    );
};

export default Hero3DBackground;
