'use client';

import React, { forwardRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    error?: string;
    helperText?: string;
    disabled?: boolean;
    className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    value,
    onChange,
    options,
    error,
    helperText,
    disabled,
    className = '',
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-[10px] font-medium uppercase tracking-widest text-dark-400 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    className={`
                        w-full px-3 py-2.5 pr-8
                        bg-dark-900 rounded
                        border transition-colors duration-150
                        text-white text-sm
                        focus:outline-none
                        appearance-none cursor-pointer
                        ${isFocused
                            ? 'border-dark-400'
                            : 'border-dark-700 hover:border-dark-600'}
                        ${error ? 'border-red-500' : ''}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${className}
                    `}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-400">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1 text-[10px] text-dark-500">{helperText}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
