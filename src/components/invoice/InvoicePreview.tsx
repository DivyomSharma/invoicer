'use client';

import React, { forwardRef } from 'react';
import { InvoiceData, InvoiceSummary } from '@/lib/types';
import { getCurrencySymbol } from '@/lib/currencies';

interface InvoicePreviewProps {
    data: InvoiceData;
    summary: InvoiceSummary;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
    ({ data, summary }, ref) => {
        const currencySymbol = getCurrencySymbol(data.currency);
        const isInr = data.currency === 'INR';

        const formatDate = (dateStr: string) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        };

        const formatAmount = (amount: number) => {
            const locale = isInr ? 'en-IN' : 'en-US';
            return `${currencySymbol}${amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };

        // Determine tax type based on sender/client states
        const isInterState = data.sender.state && data.client.state && data.sender.state !== data.client.state;

        return (
            <>
                {/* Embed Inter font for PDF generation */}
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                        .invoice-preview, .invoice-preview * {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                        }
                    `}
                </style>
                <div
                    ref={ref}
                    className="invoice-preview bg-white text-gray-900 p-8 rounded-lg shadow-lg"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", width: '100%', minHeight: '842px' }}
                >
                    {/* Header */}
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 gap-4">
                        <div className="flex items-start gap-4 flex-shrink max-w-[55%]">
                            {data.sender.logo && (
                                <img
                                    src={data.sender.logo}
                                    alt="Company Logo"
                                    className="w-16 h-16 object-contain flex-shrink-0"
                                />
                            )}
                            <div className="min-w-0">
                                <h1 className="text-xl font-bold text-gray-900 break-words">
                                    {data.sender.name || 'Your Company'}
                                </h1>
                                {data.sender.address && (
                                    <p className="text-gray-600 text-sm mt-1">{data.sender.address}</p>
                                )}
                                {(data.sender.city || data.sender.state || data.sender.pincode) && (
                                    <p className="text-gray-600 text-sm">
                                        {[data.sender.city, data.sender.state, data.sender.pincode].filter(Boolean).join(', ')}
                                    </p>
                                )}
                                {data.sender.country && (
                                    <p className="text-gray-600 text-sm">{data.sender.country}</p>
                                )}
                                {data.sender.gstin && (
                                    <p className="text-gray-600 text-sm font-medium mt-2">GSTIN: {data.sender.gstin}</p>
                                )}
                                {data.sender.pan && (
                                    <p className="text-gray-600 text-sm">PAN: {data.sender.pan}</p>
                                )}
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">
                                {isInr ? 'Tax Invoice' : 'Invoice'}
                            </h2>
                            <p className="text-gray-600 mt-2 text-sm">
                                <span className="font-medium">Invoice #:</span>{' '}
                                {data.invoiceNumber || 'INV-001'}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <span className="font-medium">Date:</span> {formatDate(data.invoiceDate)}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <span className="font-medium">Due:</span> {formatDate(data.dueDate)}
                            </p>
                            {data.placeOfSupply && (
                                <p className="text-gray-600 mt-2 text-sm">
                                    <span className="font-medium">Place of Supply:</span> {data.placeOfSupply}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sender & Client Info */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                From
                            </h3>
                            <div className="text-gray-700 text-sm space-y-1">
                                {data.sender.email && <p>{data.sender.email}</p>}
                                {data.sender.phone && <p>{data.sender.phone}</p>}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Bill To
                            </h3>
                            <div className="text-gray-700 text-sm space-y-1">
                                <p className="font-semibold text-gray-900">{data.client.name || 'Client Name'}</p>
                                {data.client.gstin && <p className="font-medium">GSTIN: {data.client.gstin}</p>}
                                {data.client.email && <p>{data.client.email}</p>}
                                {data.client.phone && <p>{data.client.phone}</p>}
                                {data.client.address && <p>{data.client.address}</p>}
                                {(data.client.city || data.client.state || data.client.pincode) && (
                                    <p>{[data.client.city, data.client.state, data.client.pincode].filter(Boolean).join(', ')}</p>
                                )}
                                {data.client.country && <p>{data.client.country}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="mb-8">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    {isInr && (
                                        <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            HSN/SAC
                                        </th>
                                    )}
                                    <th className="text-center py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Qty
                                    </th>
                                    <th className="text-right py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Rate
                                    </th>
                                    <th className="text-right py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.length > 0 ? (
                                    data.items.map((item, index) => (
                                        <tr key={item.id} className="border-b border-gray-100">
                                            <td className="py-3 text-gray-700">
                                                {item.description || `Item ${index + 1}`}
                                            </td>
                                            {isInr && (
                                                <td className="py-3 text-gray-600">{item.hsnSac || '-'}</td>
                                            )}
                                            <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                                            <td className="py-3 text-right text-gray-600">{formatAmount(item.rate)}</td>
                                            <td className="py-3 text-right text-gray-700 font-medium">
                                                {formatAmount(item.quantity * item.rate)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={isInr ? 5 : 4} className="py-8 text-center text-gray-400 italic">
                                            No items added
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="flex justify-end mb-8">
                        <div className="w-72 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatAmount(summary.subtotal)}</span>
                            </div>

                            {/* GST Breakdown for Indian invoices */}
                            {isInr && data.taxType !== 'none' && (
                                <>
                                    {isInterState ? (
                                        // IGST for inter-state
                                        summary.igstAmount > 0 && (
                                            <div className="flex justify-between text-gray-600">
                                                <span>IGST ({data.igstRate}%)</span>
                                                <span>+{formatAmount(summary.igstAmount)}</span>
                                            </div>
                                        )
                                    ) : (
                                        // CGST + SGST for intra-state
                                        <>
                                            {summary.cgstAmount > 0 && (
                                                <div className="flex justify-between text-gray-600">
                                                    <span>CGST ({data.cgstRate}%)</span>
                                                    <span>+{formatAmount(summary.cgstAmount)}</span>
                                                </div>
                                            )}
                                            {summary.sgstAmount > 0 && (
                                                <div className="flex justify-between text-gray-600">
                                                    <span>SGST ({data.sgstRate}%)</span>
                                                    <span>+{formatAmount(summary.sgstAmount)}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}

                            {/* Generic tax for non-Indian invoices */}
                            {!isInr && summary.taxAmount > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>+{formatAmount(summary.taxAmount)}</span>
                                </div>
                            )}

                            {summary.discountAmount > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Discount</span>
                                    <span>-{formatAmount(summary.discountAmount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-2 border-t-2 border-gray-200">
                                <span className="text-xl font-bold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-gray-900">
                                    {formatAmount(summary.total)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notes & Terms */}
                    {(data.notes || data.terms) && (
                        <div className="border-t border-gray-200 pt-6 space-y-4">
                            {data.notes && (
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                        Notes
                                    </h4>
                                    <p className="text-gray-600 text-sm whitespace-pre-wrap">{data.notes}</p>
                                </div>
                            )}
                            {data.terms && (
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                        Terms & Conditions
                                    </h4>
                                    <p className="text-gray-600 text-sm whitespace-pre-wrap">{data.terms}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                        <p className="text-gray-400 text-xs">
                            Invoicer by PlotArmour
                        </p>
                    </div>
                </div>
            </>
        );
    }
);

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;
