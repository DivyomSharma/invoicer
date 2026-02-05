import { InvoiceData } from './types';

const STORAGE_KEY = 'invoicer_draft';
const TEMPLATES_KEY = 'invoicer_templates';

export const saveDraft = (data: InvoiceData): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};

export const loadDraft = (): InvoiceData | null => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return null;
            }
        }
    }
    return null;
};

export const clearDraft = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
};

export const saveTemplate = (name: string, data: InvoiceData): void => {
    if (typeof window !== 'undefined') {
        const templates = getTemplates();
        templates[name] = data;
        localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    }
};

export const getTemplates = (): Record<string, InvoiceData> => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(TEMPLATES_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return {};
            }
        }
    }
    return {};
};

export const deleteTemplate = (name: string): void => {
    if (typeof window !== 'undefined') {
        const templates = getTemplates();
        delete templates[name];
        localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    }
};

export const exportToJSON = (data: InvoiceData): void => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${data.invoiceNumber || 'draft'}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

export const importFromJSON = (file: File): Promise<InvoiceData> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);
                resolve(data);
            } catch {
                reject(new Error('Invalid JSON file'));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
};
