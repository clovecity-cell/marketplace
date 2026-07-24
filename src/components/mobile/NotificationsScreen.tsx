import React from 'react';
import { ArrowLeft, BellRing, CheckCircle2 } from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const items = [
    { title: 'Pesanan dikirim', text: 'Kurir sedang menuju alamat Anda.', time: '5 menit lalu' },
    { title: 'Voucher baru tersedia', text: 'Dapatkan diskon 10% untuk pembelian berikutnya.', time: '1 jam lalu' },
    { title: 'Saldo wallet bertambah', text: 'Top up berhasil masuk ke akun Anda.', time: 'Hari ini' },
  ];

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-blue-600">
          <BellRing className="h-5 w-5" />
          <h2 className="text-lg font-black text-slate-900">Notifikasi</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">Pantau update penting dari pesanan, promo, dan saldo wallet Anda.</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.text}</p>
              </div>
              <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
