'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { SenderInfo as SenderInfoType, indianStates } from '@/lib/types';
import { Building2, Upload, X } from 'lucide-react';

interface SenderInfoProps {
    sender: SenderInfoType;
    onUpdate: (field: keyof SenderInfoType, value: string) => void;
}

export const SenderInfo: React.FC<SenderInfoProps> = ({ sender, onUpdate }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('Logo must be smaller than 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate('logo', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        onUpdate('logo', '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">From</h2>
                    <p className="text-[10px] text-dark-400 mt-0.5 uppercase tracking-wide">Your business details</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Logo Upload */}
                <div>
                    <label className="block text-[10px] font-medium uppercase tracking-widest text-dark-400 mb-2">
                        Logo
                    </label>
                    {sender.logo ? (
                        <div className="relative inline-block">
                            <div className="relative w-24 h-24 rounded bg-white p-2">
                                <Image
                                    src={sender.logo}
                                    alt="Company logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <button
                                onClick={handleRemoveLogo}
                                className="absolute -top-2 -right-2 p-1 rounded bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <label className="cursor-pointer">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoUpload}
                            />
                            <div className="w-24 h-24 rounded border border-dashed border-dark-600 flex flex-col items-center justify-center gap-2 hover:border-dark-500 hover:bg-dark-800/50 transition-colors">
                                <Upload className="w-5 h-5 text-dark-500" />
                                <span className="text-[10px] text-dark-400 uppercase tracking-wider">Upload</span>
                            </div>
                        </label>
                    )}
                </div>

                <Input
                    label="Business Name"
                    value={sender.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    placeholder="Your Business Name"
                />

                {/* Indian Tax Information */}
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="GSTIN"
                        value={sender.gstin}
                        onChange={(e) => onUpdate('gstin', e.target.value.toUpperCase())}
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                    />
                    <Input
                        label="PAN"
                        value={sender.pan}
                        onChange={(e) => onUpdate('pan', e.target.value.toUpperCase())}
                        placeholder="AAAAA0000A"
                        maxLength={10}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="Email"
                        type="email"
                        value={sender.email}
                        onChange={(e) => onUpdate('email', e.target.value)}
                        placeholder="you@company.com"
                    />
                    <Input
                        label="Phone"
                        type="tel"
                        value={sender.phone}
                        onChange={(e) => onUpdate('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                    />
                </div>

                <Textarea
                    label="Address"
                    value={sender.address}
                    onChange={(e) => onUpdate('address', e.target.value)}
                    placeholder="Building, Street, Locality"
                    rows={2}
                />

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="City"
                        value={sender.city}
                        onChange={(e) => onUpdate('city', e.target.value)}
                        placeholder="Mumbai"
                    />
                    <Input
                        label="Pincode"
                        value={sender.pincode}
                        onChange={(e) => onUpdate('pincode', e.target.value)}
                        placeholder="400001"
                        maxLength={6}
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-medium uppercase tracking-widest text-dark-400 mb-2">
                        State
                    </label>
                    <select
                        value={sender.state}
                        onChange={(e) => onUpdate('state', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded text-white text-sm focus:border-dark-500 focus:outline-none"
                    >
                        <option value="">Select State</option>
                        {indianStates.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
            </div>
        </Card>
    );
};

export default SenderInfo;
