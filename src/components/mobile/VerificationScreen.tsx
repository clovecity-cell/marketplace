import React, { useState } from 'react';
import { ArrowLeft, Camera, CheckCircle2, ShieldCheck } from 'lucide-react';

interface VerificationScreenProps {
  onBack: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-blue-600">
          <ShieldCheck className="h-5 w-5" />
          <h2 className="text-lg font-black text-slate-900">Verifikasi Akun</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">Lengkapi identitas Anda untuk meningkatkan batas transaksi dan kepercayaan penjual.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Camera className="h-4 w-4 text-blue-600" />
          Upload KTP / identitas
        </div>
        <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
          {submitted ? (
            <div className="space-y-2">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
              <p className="font-semibold text-slate-800">Dokumen berhasil dikirim</p>
              <p>Tim verifikasi akan meninjau dalam 1–2 hari kerja.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p>Seret file atau pilih gambar KTP Anda</p>
              <button
                onClick={() => setSubmitted(true)}
                className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Upload Sekarang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
