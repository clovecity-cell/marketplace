import React, { useState } from 'react';
import { ArrowLeft, MessageCircleMore, SendHorizonal, CheckCircle2 } from 'lucide-react';

interface SupportScreenProps {
  onBack: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-blue-600">
          <MessageCircleMore className="h-5 w-5" />
          <h2 className="text-lg font-black text-slate-900">Dukungan Pelanggan</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">Hubungi tim support jika ada kendala pada pesanan atau akun Anda.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="rounded-2xl bg-white p-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Tim support siap membantu 24/7</p>
          <p className="mt-1">Biasanya balasan dalam 5–15 menit.</p>
        </div>

        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan masalah Anda di sini..."
            className="min-h-24 w-full resize-none text-sm text-slate-700 outline-none"
          />
          <button
            onClick={() => setSent(true)}
            className="mt-3 flex items-center gap-2 rounded-2xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
          >
            <SendHorizonal className="h-4 w-4" />
            Kirim pesan
          </button>

          {sent && (
            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 p-2 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Pesan Anda berhasil dikirim ke support.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
