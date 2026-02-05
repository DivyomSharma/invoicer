'use client';

import React, { forwardRef, useState, useEffect } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    prefix?: string;
    suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    prefix,
    suffix,
    className = '',
    disabled,
    onFocus,
    onBlur,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
            <div
                className={`
                    relative flex items-center
                    bg-dark-900 rounded
                    border transition-colors duration-150
                    ${isFocused
                        ? 'border-dark-400'
                        : 'border-dark-700 hover:border-dark-600'}
                    ${error ? 'border-red-500' : ''}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                {leftIcon && (
                    <span className="pl-3 text-dark-500">
                        {leftIcon}
                    </span>
                )}
                {prefix && (
                    <span className="pl-3 text-dark-400 text-sm select-none">
                        {prefix}
                    </span>
                )}
                <input
                    ref={ref}
                    className={`
                        flex-1 w-full px-3 py-2.5
                        bg-transparent
                        text-white text-sm
                        placeholder:text-dark-300
                        focus:outline-none
                        disabled:cursor-not-allowed
                        ${leftIcon ? 'pl-2' : ''}
                        ${rightIcon ? 'pr-2' : ''}
                        ${prefix ? 'pl-1' : ''}
                        ${suffix ? 'pr-1' : ''}
                        ${className}
                    `}
                    disabled={disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
                {suffix && (
                    <span className="pr-3 text-dark-400 text-sm select-none">
                        {suffix}
                    </span>
                )}
                {rightIcon && (
                    <span className="pr-3 text-dark-500">
                        {rightIcon}
                    </span>
                )}
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

Input.displayName = 'Input';

// Number Input with validation
interface NumberInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange'> {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    allowDecimal?: boolean;
    allowNegative?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
    value,
    onChange,
    min,
    max,
    step = 1,
    allowDecimal = true,
    allowNegative = false,
    ...props
}, ref) => {
    const [displayValue, setDisplayValue] = useState(value.toString());

    useEffect(() => {
        setDisplayValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Allow empty input, minus sign, and decimal point while typing
        if (inputValue === '' || inputValue === '-' || inputValue === '.') {
            setDisplayValue(inputValue);
            return;
        }

        // Build regex pattern based on options
        let pattern = allowNegative ? '^-?' : '^';
        pattern += allowDecimal ? '\\d*\\.?\\d*$' : '\\d*$';
        const regex = new RegExp(pattern);

        if (regex.test(inputValue)) {
            setDisplayValue(inputValue);
            const numValue = parseFloat(inputValue);
            if (!isNaN(numValue)) {
                onChange(numValue);
            }
        }
    };

    const handleBlur = () => {
        let numValue = parseFloat(displayValue) || 0;

        if (min !== undefined && numValue < min) numValue = min;
        if (max !== undefined && numValue > max) numValue = max;

        setDisplayValue(numValue.toString());
        onChange(numValue);
    };

    return (
        <Input
            ref={ref}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
        />
    );
});

NumberInput.displayName = 'NumberInput';

export default Input;
