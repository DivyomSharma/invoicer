'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SenderInfo } from '@/components/invoice/SenderInfo';
import { ClientInfo } from '@/components/invoice/ClientInfo';
import { InvoiceDetails } from '@/components/invoice/InvoiceDetails';
import { LineItems } from '@/components/invoice/LineItems';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { InvoiceNotes } from '@/components/invoice/InvoiceNotes';
import { TaxSettings } from '@/components/invoice/TaxSettings';
import { InvoicePreview } from '@/components/invoice/InvoicePreview';
import { useInvoice } from '@/hooks/useInvoice';
import {
    InvoiceData,
    defaultInvoiceData,
    createEmptyLineItem
} from '@/lib/types';
import { saveDraft, loadDraft, exportToJSON, importFromJSON } from '@/lib/storage';
import { generatePDF, printInvoice } from '@/lib/pdf';
import {
    FileText,
    ArrowLeft,
    Download,
    Printer,
    Upload,
    Save,
    RotateCcw,
    Eye,
    EyeOff,
} from 'lucide-react';

export default function CreateInvoice() {
    const [invoiceData, setInvoiceData] = useState<InvoiceData>(() => ({
        ...defaultInvoiceData,
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        items: [createEmptyLineItem()],
    }));

    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const {
        summary,
        addLineItem,
        removeLineItem,
        updateLineItem,
        updateSender,
        updateClient,
        updateField,
        currencySymbol,
        resetInvoice,
    } = useInvoice(invoiceData, setInvoiceData);

    // Load draft on mount
    useEffect(() => {
        const draft = loadDraft();
        if (draft) {
            setInvoiceData(draft);
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timeout = setTimeout(() => {
            saveDraft(invoiceData);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [invoiceData]);

    const handleDownloadPDF = async () => {
        if (!previewRef.current) return;
        setIsGenerating(true);
        try {
            await generatePDF(
                previewRef.current,
                `invoice-${invoiceData.invoiceNumber || 'draft'}.pdf`
            );
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePrint = async () => {
        if (!previewRef.current) return;
        setIsGenerating(true);
        try {
            await printInvoice(previewRef.current);
        } catch (error) {
            console.error('Failed to print:', error);
            alert('Failed to print. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExportJSON = () => {
        exportToJSON(invoiceData);
    };

    const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const data = await importFromJSON(file);
            setInvoiceData(data);
        } catch (error) {
            console.error('Failed to import JSON:', error);
            alert('Failed to import. Please check the file format.');
        }
        e.target.value = '';
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset the invoice? All data will be lost.')) {
            resetInvoice();
        }
    };

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-dark-950/95 backdrop-blur border-b border-dark-800">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wider hidden sm:inline">Back</span>
                            </Link>
                            <div className="h-4 w-px bg-dark-700" />
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-white" />
                                <span className="text-sm font-medium uppercase tracking-wider text-white">Invoice</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Preview Toggle */}
                            <Button
                                variant={showPreview ? "primary" : "secondary"}
                                size="sm"
                                onClick={() => setShowPreview(!showPreview)}
                                leftIcon={showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            >
                                <span className="hidden sm:inline">{showPreview ? 'Hide' : 'Show'}</span> Preview
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePrint}
                                className="hidden sm:flex"
                            >
                                <Printer className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleDownloadPDF}
                                isLoading={isGenerating}
                                leftIcon={<Download className="w-4 h-4" />}
                            >
                                <span className="hidden sm:inline">Download</span> PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content - Split Layout when preview is shown */}
            <main className={`${showPreview ? 'max-w-[1800px]' : 'max-w-6xl'} mx-auto px-4 sm:px-6 py-6 sm:py-8`}>
                <div className={`${showPreview ? 'flex gap-6' : ''}`}>
                    {/* Form Column */}
                    <div className={`${showPreview ? 'w-1/2 flex-shrink-0' : 'w-full'} space-y-4 sm:space-y-6`}>
                        <InvoiceDetails
                            invoiceNumber={invoiceData.invoiceNumber}
                            invoiceDate={invoiceData.invoiceDate}
                            dueDate={invoiceData.dueDate}
                            currency={invoiceData.currency}
                            onUpdate={(field, value) => updateField(field as keyof InvoiceData, value)}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <SenderInfo
                                sender={invoiceData.sender}
                                onUpdate={updateSender}
                            />

                            <ClientInfo
                                client={invoiceData.client}
                                onUpdate={updateClient}
                            />
                        </div>

                        <LineItems
                            items={invoiceData.items}
                            currencySymbol={currencySymbol}
                            onAdd={addLineItem}
                            onRemove={removeLineItem}
                            onUpdate={updateLineItem}
                        />

                        <TaxSettings
                            data={invoiceData}
                            onUpdate={updateField}
                        />

                        <InvoiceSummary
                            summary={summary}
                            currencySymbol={currencySymbol}
                            taxRate={invoiceData.taxRate}
                            discountRate={invoiceData.discountRate}
                            discountType={invoiceData.discountType}
                            onTaxChange={(value) => updateField('taxRate', value)}
                            onDiscountChange={(value) => updateField('discountRate', value)}
                            onDiscountTypeChange={(type) => updateField('discountType', type)}
                        />

                        <InvoiceNotes
                            notes={invoiceData.notes}
                            terms={invoiceData.terms}
                            onNotesChange={(value) => updateField('notes', value)}
                            onTermsChange={(value) => updateField('terms', value)}
                        />

                        {/* Actions */}
                        <Card variant="default" className="flex flex-wrap items-center gap-3">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleExportJSON}
                                leftIcon={<Save className="w-4 h-4" />}
                            >
                                Export JSON
                            </Button>
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImportJSON}
                                    className="hidden"
                                />
                                <span className="inline-flex items-center justify-center font-medium uppercase tracking-wider rounded transition-all duration-150 bg-dark-700 hover:bg-dark-600 text-white border border-dark-600 px-3 py-1.5 text-xs gap-1.5">
                                    <Upload className="w-4 h-4" />
                                    Import JSON
                                </span>
                            </label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleReset}
                                leftIcon={<RotateCcw className="w-4 h-4" />}
                            >
                                Reset
                            </Button>
                        </Card>
                    </div>

                    {/* Preview Column - 50% when visible */}
                    {showPreview && (
                        <div className="w-1/2 flex-shrink-0 sticky top-20 h-fit">
                            <Card variant="glass" padding="none" className="overflow-hidden">
                                <div className="p-4 border-b border-dark-700">
                                    <span className="text-xs uppercase tracking-wider text-dark-400">Live Preview</span>
                                </div>
                                <div className="bg-dark-900 p-4 overflow-auto max-h-[calc(100vh-160px)]">
                                    <div className="transform scale-[0.65] origin-top-left" style={{ width: '153.8%' }}>
                                        <InvoicePreview
                                            ref={previewRef}
                                            data={invoiceData}
                                            summary={summary}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </main>

            {/* Hidden Preview for PDF Generation (when preview panel is closed) */}
            {!showPreview && (
                <div className="fixed left-[-9999px] top-0">
                    <InvoicePreview
                        ref={previewRef}
                        data={invoiceData}
                        summary={summary}
                    />
                </div>
            )}
        </div>
    );
}
