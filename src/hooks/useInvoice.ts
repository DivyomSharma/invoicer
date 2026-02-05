'use client';

import React, { useCallback } from 'react';
import { InvoiceData, LineItem, InvoiceSummary, createEmptyLineItem } from '@/lib/types';
import { getCurrencySymbol } from '@/lib/currencies';

interface UseInvoiceReturn {
    invoiceData: InvoiceData;
    setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
    summary: InvoiceSummary;
    addLineItem: () => void;
    removeLineItem: (id: string) => void;
    updateLineItem: (id: string, field: keyof LineItem, value: string | number) => void;
    updateSender: (field: string, value: string) => void;
    updateClient: (field: string, value: string) => void;
    updateField: (field: keyof InvoiceData, value: string | number) => void;
    currencySymbol: string;
    resetInvoice: () => void;
}

export function useInvoice(
    invoiceData: InvoiceData,
    setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>
): UseInvoiceReturn {
    const currencySymbol = getCurrencySymbol(invoiceData.currency);

    const calculateSummary = useCallback((): InvoiceSummary => {
        const subtotal = invoiceData.items.reduce((acc, item) => {
            return acc + (item.quantity * item.rate);
        }, 0);

        // Determine if inter-state (IGST) or intra-state (CGST + SGST)
        const isInterState = invoiceData.sender.state && invoiceData.client.state &&
            invoiceData.sender.state !== invoiceData.client.state;
        const isInr = invoiceData.currency === 'INR';

        let cgstAmount = 0;
        let sgstAmount = 0;
        let igstAmount = 0;
        let taxAmount = 0;

        if (isInr && invoiceData.taxType !== 'none') {
            if (isInterState) {
                // Inter-state: Apply IGST
                igstAmount = subtotal * (invoiceData.igstRate / 100);
                taxAmount = igstAmount;
            } else {
                // Intra-state: Apply CGST + SGST
                cgstAmount = subtotal * (invoiceData.cgstRate / 100);
                sgstAmount = subtotal * (invoiceData.sgstRate / 100);
                taxAmount = cgstAmount + sgstAmount;
            }
        } else {
            // Non-Indian invoice: Use standard tax rate
            const itemTax = invoiceData.items.reduce((acc, item) => {
                const itemTotal = item.quantity * item.rate;
                return acc + (itemTotal * (item.tax / 100));
            }, 0);

            const globalTax = subtotal * (invoiceData.taxRate / 100);
            taxAmount = itemTax + globalTax;
        }

        let discountAmount = 0;
        if (invoiceData.discountType === 'percentage') {
            discountAmount = subtotal * (invoiceData.discountRate / 100);
        } else {
            discountAmount = invoiceData.discountRate;
        }

        const total = subtotal + taxAmount - discountAmount;

        return {
            subtotal,
            taxAmount,
            cgstAmount,
            sgstAmount,
            igstAmount,
            discountAmount,
            total: Math.max(0, total),
        };
    }, [invoiceData]);

    const summary = calculateSummary();

    const addLineItem = useCallback(() => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [...prev.items, createEmptyLineItem()],
        }));
    }, [setInvoiceData]);

    const removeLineItem = useCallback((id: string) => {
        setInvoiceData((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id),
        }));
    }, [setInvoiceData]);

    const updateLineItem = useCallback((id: string, field: keyof LineItem, value: string | number) => {
        setInvoiceData((prev) => ({
            ...prev,
            items: prev.items.map((item) => {
                if (item.id !== id) return item;
                const updated = { ...item, [field]: value };
                updated.amount = updated.quantity * updated.rate;
                return updated;
            }),
        }));
    }, [setInvoiceData]);

    const updateSender = useCallback((field: string, value: string) => {
        setInvoiceData((prev) => ({
            ...prev,
            sender: { ...prev.sender, [field]: value },
        }));
    }, [setInvoiceData]);

    const updateClient = useCallback((field: string, value: string) => {
        setInvoiceData((prev) => ({
            ...prev,
            client: { ...prev.client, [field]: value },
        }));
    }, [setInvoiceData]);

    const updateField = useCallback((field: keyof InvoiceData, value: string | number) => {
        setInvoiceData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, [setInvoiceData]);

    const resetInvoice = useCallback(() => {
        const { defaultInvoiceData } = require('@/lib/types');
        setInvoiceData({
            ...defaultInvoiceData,
            invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
            items: [createEmptyLineItem()],
        });
    }, [setInvoiceData]);

    return {
        invoiceData,
        setInvoiceData,
        summary,
        addLineItem,
        removeLineItem,
        updateLineItem,
        updateSender,
        updateClient,
        updateField,
        currencySymbol,
        resetInvoice,
    };
}
