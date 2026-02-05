'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { NumberInput } from '@/components/ui/Input';
import { InvoiceData, indianStates } from '@/lib/types';
import { Receipt } from 'lucide-react';

interface TaxSettingsProps {
    data: InvoiceData;
    onUpdate: (field: keyof InvoiceData, value: string | number) => void;
}

export const TaxSettings: React.FC<TaxSettingsProps> = ({ data, onUpdate }) => {
    const isInr = data.currency === 'INR';

    if (!isInr) {
        return (
            <Card variant="elevated" padding="lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Tax Settings</h2>
                        <p className="text-[10px] text-dark-400 mt-0.5 uppercase tracking-wide">Configure tax rate</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <NumberInput
                        label="Tax Rate (%)"
                        value={data.taxRate}
                        onChange={(value) => onUpdate('taxRate', value)}
                        min={0}
                        max={100}
                        allowDecimal={true}
                        suffix="%"
                    />
                </div>
            </Card>
        );
    }

    // Indian GST settings
    return (
        <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">GST Settings</h2>
                    <p className="text-[10px] text-dark-400 mt-0.5 uppercase tracking-wide">Configure Indian GST rates</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Tax Type */}
                <div>
                    <label className="block text-[10px] font-medium uppercase tracking-widest text-dark-400 mb-2">
                        Tax Type
                    </label>
                    <select
                        value={data.taxType}
                        onChange={(e) => onUpdate('taxType', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded text-white text-sm focus:border-dark-500 focus:outline-none"
                    >
                        <option value="gst">GST (Auto - based on states)</option>
                        <option value="none">No Tax</option>
                    </select>
                    <p className="text-[10px] text-dark-500 mt-1">
                        Auto calculates CGST+SGST (same state) or IGST (different states)
                    </p>
                </div>

                {data.taxType !== 'none' && (
                    <>
                        {/* Place of Supply */}
                        <div>
                            <label className="block text-[10px] font-medium uppercase tracking-widest text-dark-400 mb-2">
                                Place of Supply
                            </label>
                            <select
                                value={data.placeOfSupply}
                                onChange={(e) => onUpdate('placeOfSupply', e.target.value)}
                                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded text-white text-sm focus:border-dark-500 focus:outline-none"
                            >
                                <option value="">Select State</option>
                                {indianStates.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        {/* GST Rates */}
                        <div className="grid grid-cols-3 gap-3">
                            <NumberInput
                                label="CGST Rate (%)"
                                value={data.cgstRate}
                                onChange={(value) => onUpdate('cgstRate', value)}
                                min={0}
                                max={50}
                                allowDecimal={true}
                            />
                            <NumberInput
                                label="SGST Rate (%)"
                                value={data.sgstRate}
                                onChange={(value) => onUpdate('sgstRate', value)}
                                min={0}
                                max={50}
                                allowDecimal={true}
                            />
                            <NumberInput
                                label="IGST Rate (%)"
                                value={data.igstRate}
                                onChange={(value) => onUpdate('igstRate', value)}
                                min={0}
                                max={50}
                                allowDecimal={true}
                            />
                        </div>
                        <p className="text-[10px] text-dark-500">
                            Common rates: 5%, 12%, 18%, 28%. IGST = CGST + SGST
                        </p>
                    </>
                )}
            </div>
        </Card>
    );
};

export default TaxSettings;
