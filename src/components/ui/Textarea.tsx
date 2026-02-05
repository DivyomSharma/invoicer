'use client';

import React, { forwardRef, useState } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
    label,
    error,
    helperText,
    className = '',
    disabled,
    onFocus,
    onBlur,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-[10px] font-medium uppercase tracking-widest text-dark-400 mb-1.5">
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                className={`
                    w-full px-3 py-2.5
                    bg-dark-900 rounded
                    border transition-colors duration-150
                    text-white text-sm
                    placeholder:text-dark-500
                    focus:outline-none
                    resize-none
                    ${isFocused
                        ? 'border-dark-400'
                        : 'border-dark-700 hover:border-dark-600'}
                    ${error ? 'border-red-500' : ''}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${className}
                `}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-red-400">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1 text-[10px] text-dark-500">{helperText}</p>
            )}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
