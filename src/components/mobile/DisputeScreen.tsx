import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle2, Send } from 'lucide-react';

interface DisputeScreenProps {
  onBack: () => void;
}

export const DisputeScreen: React.FC<DisputeScreenProps> = ({ onBack }) => {
  const [reason, setReason] = useState('Barang tidak sesuai deskripsi');
  const [detail, setDetail] = useState('Saya menerima produk berbeda dari foto yang tertera.');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-2 text-amber-700">
          <AlertCircle className="h-5 w-5" />
          <h2 className="text-lg font-black text-slate-900">Ajukan Refund / Dispute</h2>
        </div>
        <p className="mt-2 text-sm text-slate-600">Tim mediasi cocok.in akan meninjau pengajuan Anda dan membantu menemukan penyelesaian.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Alasan</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
          >
            <option>Barang tidak sesuai deskripsi</option>
            <option>Barang datang rusak</option>
            <option>Pengiriman terlambat</option>
            <option>Produk tidak diterima</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Detail masalah</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
          />
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white"
        >
          <Send className="h-4 w-4" />
          Kirim pengajuan dispute
        </button>

        {submitted && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Pengajuan dispute berhasil dikirim. Tim akan menindaklanjuti dalam 24 jam.
          </div>
        )}
      </div>
    </div>
  );
};
