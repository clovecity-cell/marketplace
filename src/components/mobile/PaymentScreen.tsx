import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Banknote, CheckCircle2 } from 'lucide-react';

interface PaymentScreenProps {
  onBack: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const [confirmed, setConfirmed] = useState(false);

  const methods = [
    { id: 'wallet', label: 'Saldo Wallet', icon: Wallet, desc: 'Bayar dari saldo cocok.in' },
    { id: 'bank', label: 'Transfer Bank', icon: Banknote, desc: 'BCA / Mandiri / BRI' },
    { id: 'card', label: 'Kartu Kredit', icon: CreditCard, desc: 'Visa / Mastercard' },
  ];

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-900">Metode Pembayaran</h2>
        <p className="mt-1 text-sm text-slate-500">Pilih metode pembayaran yang Anda inginkan sebelum checkout.</p>
      </div>

      <div className="space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left ${selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
            >
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{method.label}</p>
                <p className="text-xs text-slate-500">{method.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">Ringkasan Pembayaran</p>
        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>Rp 151.500</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm text-slate-600">
          <span>Biaya admin</span>
          <span>Rp 5.000</span>
        </div>
        <div className="mt-2 border-t border-slate-200 pt-2 font-semibold text-slate-900">
          Total: Rp 156.500
        </div>

        <button
          onClick={() => setConfirmed(true)}
          className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
        >
          Konfirmasi Pembayaran
        </button>

        {confirmed && (
          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 p-2 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Pembayaran berhasil dipilih dan siap diproses.
          </div>
        )}
      </div>
    </div>
  );
};
