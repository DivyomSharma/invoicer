'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ClientInfo as ClientInfoType, indianStates } from '@/lib/types';
import { User } from 'lucide-react';

interface ClientInfoProps {
    client: ClientInfoType;
    onUpdate: (field: keyof ClientInfoType, value: string) => void;
}

export const ClientInfo: React.FC<ClientInfoProps> = ({ client, onUpdate }) => {
    return (
        <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Bill To</h2>
                    <p className="text-[10px] text-dark-400 mt-0.5 uppercase tracking-wide">Client details</p>
                </div>
            </div>

            <div className="space-y-4">
                <Input
                    label="Client Name"
                    value={client.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    placeholder="Client Name or Company"
                />

                <Input
                    label="GSTIN (Optional)"
                    value={client.gstin}
                    onChange={(e) => onUpdate('gstin', e.target.value.toUpperCase())}
                    placeholder="22AAAAA0000A1Z5"
                    maxLength={15}
                />

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="Email"
                        type="email"
                        value={client.email}
                        onChange={(e) => onUpdate('email', e.target.value)}
                        placeholder="client@example.com"
                    />
                    <Input
                        label="Phone"
                        type="tel"
                        value={client.phone}
                        onChange={(e) => onUpdate('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                    />
                </div>

                <Textarea
                    label="Address"
                    value={client.address}
                    onChange={(e) => onUpdate('address', e.target.value)}
                    placeholder="Building, Street, Locality"
                    rows={2}
                />

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="City"
                        value={client.city}
                        onChange={(e) => onUpdate('city', e.target.value)}
                        placeholder="Delhi"
                    />
                    <Input
                        label="Pincode"
                        value={client.pincode}
                        onChange={(e) => onUpdate('pincode', e.target.value)}
                        placeholder="110001"
                        maxLength={6}
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-medium uppercase tracking-widest text-dark-400 mb-2">
                        State
                    </label>
                    <select
                        value={client.state}
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

export default ClientInfo;
