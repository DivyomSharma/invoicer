'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { currencies } from '@/lib/currencies';
import { Currency } from '@/lib/types';
import { FileText, Calendar, Hash } from 'lucide-react';

interface InvoiceDetailsProps {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    currency: string;
    onUpdate: (field: string, value: string) => void;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
    invoiceNumber,
    invoiceDate,
    dueDate,
    currency,
    onUpdate,
}) => {
    const currencyOptions = currencies.map((c: Currency) => ({
        value: c.code,
        label: `${c.code} - ${c.name}`,
    }));

    return (
        <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Invoice Details</h2>
                    <p className="text-[10px] text-dark-400 mt-0.5 uppercase tracking-wide">Basic information</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                    label="Invoice Number"
                    value={invoiceNumber}
                    onChange={(e) => onUpdate('invoiceNumber', e.target.value)}
                    placeholder="INV-001"
                    leftIcon={<Hash className="w-4 h-4" />}
                />

                <Select
                    label="Currency"
                    value={currency}
                    onChange={(value) => onUpdate('currency', value)}
                    options={currencyOptions}
                />

                <Input
                    label="Issue Date"
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => onUpdate('invoiceDate', e.target.value)}
                    leftIcon={<Calendar className="w-4 h-4" />}
                />

                <Input
                    label="Due Date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => onUpdate('dueDate', e.target.value)}
                    leftIcon={<Calendar className="w-4 h-4" />}
                />
            </div>
        </Card>
    );
};

export default InvoiceDetails;
