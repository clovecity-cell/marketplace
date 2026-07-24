import React from 'react';
import { Sparkles, Percent, Truck, ShieldCheck } from 'lucide-react';

interface PromotionsScreenProps {
  onBack: () => void;
}

export const PromotionsScreen: React.FC<PromotionsScreenProps> = ({ onBack }) => {
  const promos = [
    { title: 'Diskon 50% Hari Ini', desc: 'Untuk produk pilihan di kategori fashion dan elektronik.', badge: 'Limited' },
    { title: 'Gratis Ongkir', desc: 'Bebas biaya kirim untuk pembelian di atas Rp 200.000.', badge: 'Bebas Ongkir' },
    { title: 'Cashback Wallet', desc: 'Dapatkan cashback 5% ke saldo wallet setelah pembayaran.', badge: 'Cashback' },
  ];

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="text-sm font-semibold text-slate-700">← Kembali</button>
      <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 to-emerald-600 p-4 text-white">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4" />
          Promo & Penawaran cocok.in
        </div>
        <p className="mt-2 text-sm text-blue-50">Nikmati keuntungan eksklusif setiap hari dari marketplace terpercaya.</p>
      </div>

      <div className="space-y-3">
        {promos.map((promo, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-amber-100 p-2 text-amber-600">
                  <Percent className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{promo.title}</p>
                  <p className="text-xs text-slate-500">{promo.desc}</p>
                </div>
              </div>
              <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">{promo.badge}</span>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Cepat</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Aman</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
