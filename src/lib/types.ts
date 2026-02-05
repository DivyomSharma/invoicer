// Invoice Types

export interface LineItem {
    id: string;
    description: string;
    hsnSac: string;  // HSN/SAC code for Indian GST
    quantity: number;
    rate: number;
    tax: number;
    amount: number;
}

export interface SenderInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;  // Added for Indian GST
    country: string;
    pincode: string; // Added for Indian addresses
    logo: string | null;
    gstin: string;  // GSTIN for Indian businesses
    pan: string;    // PAN number
}

export interface ClientInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;  // Added for Indian GST
    country: string;
    pincode: string; // Added for Indian addresses
    gstin: string;  // Client GSTIN
}

export interface InvoiceData {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    currency: string;
    sender: SenderInfo;
    client: ClientInfo;
    items: LineItem[];
    notes: string;
    terms: string;
    taxRate: number;
    discountRate: number;
    discountType: 'percentage' | 'fixed';
    // Indian tax options
    taxType: 'gst' | 'igst' | 'none';  // GST (intra-state), IGST (inter-state), or no tax
    cgstRate: number;  // Central GST rate
    sgstRate: number;  // State GST rate
    igstRate: number;  // Integrated GST rate
    placeOfSupply: string; // State where goods/services are supplied
}

export interface InvoiceSummary {
    subtotal: number;
    taxAmount: number;
    cgstAmount: number;
    sgstAmount: number;
    igstAmount: number;
    discountAmount: number;
    total: number;
}

export interface Currency {
    code: string;
    symbol: string;
    name: string;
}

// Indian States for GST
export const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
    'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep'
];

// Default values
export const defaultSenderInfo: SenderInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    logo: null,
    gstin: '',
    pan: '',
};

export const defaultClientInfo: ClientInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    gstin: '',
};

export const defaultInvoiceData: InvoiceData = {
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'INR',
    sender: defaultSenderInfo,
    client: defaultClientInfo,
    items: [],
    notes: '',
    terms: 'Payment is due within 30 days of invoice date.',
    taxRate: 0,
    discountRate: 0,
    discountType: 'percentage',
    taxType: 'gst',
    cgstRate: 9,
    sgstRate: 9,
    igstRate: 18,
    placeOfSupply: '',
};

export const createEmptyLineItem = (): LineItem => ({
    id: crypto.randomUUID(),
    description: '',
    hsnSac: '',
    quantity: 1,
    rate: 0,
    tax: 0,
    amount: 0,
});
