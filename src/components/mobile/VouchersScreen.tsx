import React from 'react';
import { ArrowLeft, Ticket, Sparkles } from 'lucide-react';

interface VouchersScreenProps {
  onBack: () => void;
}

export const VouchersScreen: React.FC<VouchersScreenProps> = ({ onBack }) => {
  const vouchers = [
    { code: 'WELCOME10', title: 'Diskon 10% untuk pemula', desc: 'Berlaku untuk pembelian pertama Anda.', value: '10%' },
    { code: 'FREESHIP', title: 'Gratis ongkir', desc: 'Untuk transaksi di atas Rp 200.000.', value: 'Gratis Ongkir' },
  ];

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-600">
          <Ticket className="h-5 w-5" />
          <h2 className="text-lg font-black text-slate-900">Voucher & Referral</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">Nikmati promo dan ajak teman Anda untuk mendapatkan bonus.</p>
      </div>

      <div className="space-y-3">
        {vouchers.map((voucher, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{voucher.title}</p>
                <p className="mt-1 text-sm text-slate-500">{voucher.desc}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                {voucher.value}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Kode: {voucher.code}
              </div>
              <button className="text-sm font-semibold text-blue-600">Gunakan</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
