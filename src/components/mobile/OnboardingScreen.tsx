import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Store, Truck } from 'lucide-react';

interface OnboardingScreenProps {
  onContinue: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onContinue }) => {
  const bullets = [
    { title: 'Belanja aman', desc: 'Pembayaran dijaga escrow dan aman', icon: ShieldCheck },
    { title: 'Jualan praktis', desc: 'Kelola stok, pesanan, dan promosi', icon: Store },
    { title: 'Pengiriman terpantau', desc: 'Lacak paket dari kurir sampai tujuan', icon: Truck },
  ];

  return (
    <div className="flex min-h-[70vh] flex-col justify-center rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 p-4 text-white">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4" />
          Selamat datang di cocok.in
        </div>
        <h2 className="mt-2 text-xl font-black">Mulai pengalaman belanja yang lebih percaya diri</h2>
        <p className="mt-2 text-sm text-blue-50">Dari belanja kebutuhan harian sampai buka toko sendiri, semua tersedia di satu aplikasi.</p>
      </div>

      <div className="mt-5 space-y-3">
        {bullets.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-4 w-4" />
          Siap mulai? Anda bisa mengubah peran kapan saja dari tombol atas.
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
      >
        Lanjut ke Beranda
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
