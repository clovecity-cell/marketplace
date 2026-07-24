import React, { useState } from 'react';
import { ArrowLeft, Store, CheckCircle2, Sparkles } from 'lucide-react';

interface SellerOnboardingScreenProps {
  onBack: () => void;
}

export const SellerOnboardingScreen: React.FC<SellerOnboardingScreenProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-600">
          <Store className="h-5 w-5" />
          <h2 className="text-lg font-black text-slate-900">Daftar Jadi Penjual</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">Buka toko Anda di cocok.in dan mulai jualan dengan fitur terintegrasi.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="rounded-2xl bg-white p-3 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Langkah yang perlu Anda siapkan
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Nama toko dan deskripsi bisnis</li>
            <li>Foto produk dan stok awal</li>
            <li>Nomor rekening untuk pencairan saldo</li>
          </ul>
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white"
        >
          Ajukan Pendaftaran Toko
        </button>

        {submitted && (
          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 p-2 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Pengajuan toko Anda berhasil dikirim.
          </div>
        )}
      </div>
    </div>
  );
};
