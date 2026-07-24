import React, { useState } from 'react';
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react';
import { User } from '../../types';

interface AddressBookScreenProps {
  user: User;
  onBack: () => void;
}

export const AddressBookScreen: React.FC<AddressBookScreenProps> = ({ user, onBack }) => {
  const [saved, setSaved] = useState(false);
  const [address, setAddress] = useState(user.address);

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button onClick={onBack} className="p-1 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-sm font-bold text-slate-800">Alamat Pengiriman</h3>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Alamat utama</p>
            <p className="text-xs text-slate-500">Nomor telepon: {user.phone}</p>
          </div>
        </div>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none"
        />

        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 1800);
          }}
          className="w-full rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-bold text-white"
        >
          {saved ? 'Alamat Tersimpan' : 'Simpan Alamat'}
        </button>

        {saved && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>Alamat pengiriman berhasil diperbarui.</span>
          </div>
        )}
      </div>
    </div>
  );
};
