'use client';

import React, { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
    children,
    variant = 'default',
    padding = 'md',
    hover = false,
    className = '',
    style,
    ...props
}, ref) => {
    const variants = {
        default: 'bg-dark-900 border border-dark-700',
        elevated: 'bg-dark-800 border border-dark-600',
        glass: 'glass',
    };

    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-4 sm:p-5',
        lg: 'p-5 sm:p-6',
    };

    return (
        <div
            ref={ref}
            className={`
                rounded
                ${variants[variant]}
                ${paddings[padding]}
                ${hover ? 'hover:border-dark-500 transition-colors duration-200' : ''}
                ${className}
            `}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
