import React from 'react';
import { ArrowLeft, Sparkles, Clock3, Percent, ShoppingBag } from 'lucide-react';

interface FlashSaleScreenProps {
  onBack: () => void;
}

export const FlashSaleScreen: React.FC<FlashSaleScreenProps> = ({ onBack }) => {
  const deals = [
    { name: 'Kopi Susu Aren', price: 'Rp 49.000', oldPrice: 'Rp 69.000', endsIn: '00:21:15' },
    { name: 'Headset Wireless', price: 'Rp 189.000', oldPrice: 'Rp 249.000', endsIn: '00:48:02' },
    { name: 'Tas Traveler', price: 'Rp 135.000', oldPrice: 'Rp 180.000', endsIn: '01:10:12' },
  ];

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4" />
          Flash Sale cocok.in
        </div>
        <p className="mt-1 text-sm text-orange-50">Penawaran terbatas, jangan sampai terlewat.</p>
      </div>

      <div className="space-y-3">
        {deals.map((deal, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-900">{deal.name}</p>
                <p className="text-xs text-slate-500">Diskon terbatas sampai {deal.endsIn}</p>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700">Hot</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-lg font-black text-slate-900">{deal.price}</p>
                <p className="text-xs text-slate-400 line-through">{deal.oldPrice}</p>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white">
                <ShoppingBag className="h-3.5 w-3.5" />
                Beli sekarang
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
              <Clock3 className="h-3.5 w-3.5 text-orange-500" />
              Berakhir dalam {deal.endsIn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
