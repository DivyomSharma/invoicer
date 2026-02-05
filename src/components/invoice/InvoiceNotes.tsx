'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { MessageSquare } from 'lucide-react';

interface InvoiceNotesProps {
    notes: string;
    terms: string;
    onNotesChange: (value: string) => void;
    onTermsChange: (value: string) => void;
}

export const InvoiceNotes: React.FC<InvoiceNotesProps> = ({
    notes,
    terms,
    onNotesChange,
    onTermsChange,
}) => {
    return (
        <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Notes & Terms</h2>
                    <p className="text-[10px] text-dark-400 mt-0.5 uppercase tracking-wide">Additional information</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Textarea
                    label="Notes"
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    placeholder="Additional notes for your client..."
                    rows={3}
                    helperText="Visible on the invoice"
                />

                <Textarea
                    label="Terms & Conditions"
                    value={terms}
                    onChange={(e) => onTermsChange(e.target.value)}
                    placeholder="Payment terms, late fees, etc..."
                    rows={3}
                    helperText="Payment conditions"
                />
            </div>
        </Card>
    );
};

export default InvoiceNotes;
