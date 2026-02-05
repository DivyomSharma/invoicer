'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input, NumberInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LineItem } from '@/lib/types';
import { Trash2, Plus } from 'lucide-react';

interface LineItemsProps {
    items: LineItem[];
    currencySymbol: string;
    onAdd: () => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, field: keyof LineItem, value: string | number) => void;
}

// Format large numbers with commas (Indian numbering system for INR)
const formatAmount = (amount: number, isInr: boolean = false): string => {
    if (isInr) {
        return amount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const LineItems: React.FC<LineItemsProps> = ({
    items,
    currencySymbol,
    onAdd,
    onRemove,
    onUpdate,
}) => {
    const isInr = currencySymbol === '₹';

    return (
        <Card variant="elevated" padding="lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Line Items</h2>
                    <p className="text-[10px] text-dark-400 mt-0.5 uppercase tracking-wide">Add products or services</p>
                </div>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onAdd}
                    leftIcon={<Plus className="w-3 h-3" />}
                >
                    Add Item
                </Button>
            </div>

            {/* Desktop View - Full Width Table */}
            <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-3 mb-3 pb-2 border-b border-dark-700">
                    <div className="col-span-4">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-dark-400">Description</span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-dark-400">HSN/SAC</span>
                    </div>
                    <div className="col-span-1">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-dark-400">Qty</span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-dark-400">Rate</span>
                    </div>
                    <div className="col-span-2 text-right">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-dark-400">Amount</span>
                    </div>
                    <div className="col-span-1"></div>
                </div>

                <div className="space-y-2">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-12 gap-3 items-center py-2 group"
                        >
                            <div className="col-span-4">
                                <Input
                                    value={item.description}
                                    onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                                    placeholder="Item description"
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    value={item.hsnSac}
                                    onChange={(e) => onUpdate(item.id, 'hsnSac', e.target.value)}
                                    placeholder="HSN/SAC"
                                    maxLength={8}
                                />
                            </div>
                            <div className="col-span-1">
                                <NumberInput
                                    value={item.quantity}
                                    onChange={(value) => onUpdate(item.id, 'quantity', value)}
                                    min={0}
                                    allowDecimal={true}
                                    placeholder="0"
                                />
                            </div>
                            <div className="col-span-2">
                                <NumberInput
                                    value={item.rate}
                                    onChange={(value) => onUpdate(item.id, 'rate', value)}
                                    min={0}
                                    allowDecimal={true}
                                    prefix={currencySymbol}
                                    placeholder="0"
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center justify-end h-[42px] px-3 bg-dark-900 rounded border border-dark-700">
                                    <span className="text-sm font-medium text-white tabular-nums">
                                        {currencySymbol}{formatAmount(item.quantity * item.rate, isInr)}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1 flex justify-end">
                                {items.length > 1 && (
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        className="p-2 text-dark-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="p-4 rounded bg-dark-900 border border-dark-700 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-medium uppercase tracking-widest text-dark-400">
                                Item {index + 1}
                            </span>
                            {items.length > 1 && (
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="p-1.5 text-dark-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <Input
                            label="Description"
                            value={item.description}
                            onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                            placeholder="Item description"
                        />

                        <Input
                            label="HSN/SAC Code"
                            value={item.hsnSac}
                            onChange={(e) => onUpdate(item.id, 'hsnSac', e.target.value)}
                            placeholder="e.g., 9983 for IT services"
                            maxLength={8}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <NumberInput
                                label="Quantity"
                                value={item.quantity}
                                onChange={(value) => onUpdate(item.id, 'quantity', value)}
                                min={0}
                                allowDecimal={true}
                                placeholder="0"
                            />
                            <NumberInput
                                label="Rate"
                                value={item.rate}
                                onChange={(value) => onUpdate(item.id, 'rate', value)}
                                min={0}
                                allowDecimal={true}
                                prefix={currencySymbol}
                                placeholder="0"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-dark-700">
                            <span className="text-[10px] font-medium uppercase tracking-widest text-dark-400">Total</span>
                            <span className="text-base font-semibold text-white tabular-nums">
                                {currencySymbol}{formatAmount(item.quantity * item.rate, isInr)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default LineItems;
