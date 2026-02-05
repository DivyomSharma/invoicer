'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { NumberInput } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { InvoiceSummary as InvoiceSummaryType } from '@/lib/types';
import { Calculator } from 'lucide-react';

interface InvoiceSummaryProps {
    summary: InvoiceSummaryType;
    currencySymbol: string;
    taxRate: number;
    discountRate: number;
    discountType: 'percentage' | 'fixed';
    onTaxChange: (value: number) => void;
    onDiscountChange: (value: number) => void;
    onDiscountTypeChange: (type: 'percentage' | 'fixed') => void;
}

const formatAmount = (amount: number): string => {
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
    summary,
    currencySymbol,
    taxRate,
    discountRate,
    discountType,
    onTaxChange,
    onDiscountChange,
    onDiscountTypeChange,
}) => {
    const discountOptions = [
        { value: 'percentage', label: '%' },
        { value: 'fixed', label: currencySymbol },
    ];

    return (
        <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Summary</h2>
                    <p className="text-[10px] text-dark-400 mt-0.5 uppercase tracking-wide">Invoice totals</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-dark-700">
                    <span className="text-xs uppercase tracking-wider text-dark-400">Subtotal</span>
                    <span className="text-sm font-medium text-white tabular-nums">
                        {currencySymbol}{formatAmount(summary.subtotal)}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-2 border-b border-dark-700">
                    <label className="text-xs uppercase tracking-wider text-dark-400">Tax</label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="flex-1 sm:w-24">
                            <NumberInput
                                value={taxRate}
                                onChange={onTaxChange}
                                min={0}
                                max={100}
                                suffix="%"
                                allowDecimal={true}
                            />
                        </div>
                        <span className="text-sm font-medium text-white tabular-nums whitespace-nowrap">
                            {currencySymbol}{formatAmount(summary.taxAmount)}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-2 border-b border-dark-700">
                    <label className="text-xs uppercase tracking-wider text-dark-400">Discount</label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="flex-1 sm:w-24">
                            <NumberInput
                                value={discountRate}
                                onChange={onDiscountChange}
                                min={0}
                                allowDecimal={true}
                            />
                        </div>
                        <div className="w-16">
                            <Select
                                value={discountType}
                                onChange={(value) => onDiscountTypeChange(value as 'percentage' | 'fixed')}
                                options={discountOptions}
                            />
                        </div>
                        <span className="text-sm font-medium text-white tabular-nums whitespace-nowrap">
                            -{currencySymbol}{formatAmount(summary.discountAmount)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <span className="text-sm font-semibold uppercase tracking-wider text-white">Total</span>
                    <span className="text-2xl font-bold text-white tabular-nums">
                        {currencySymbol}{formatAmount(summary.total)}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default InvoiceSummary;
