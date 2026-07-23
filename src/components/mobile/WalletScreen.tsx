import React, { useState } from 'react';
import { User, Transaction } from '../../types';
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, X, ArrowLeft } from 'lucide-react';

interface WalletScreenProps {
  user: User;
  transactions: Transaction[];
  onTopUp: (amount: number) => void;
  onBack: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  user,
  transactions,
  onTopUp,
  onBack,
}) => {
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'topup' | 'payment'>('all');
  const [customAmount, setCustomAmount] = useState<string>('100000');

  const filteredTx = transactions.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const handleConfirmTopUp = (amt: number) => {
    onTopUp(amt);
    setShowTopUpModal(false);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button onClick={onBack} className="p-1 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-sm font-bold text-slate-800">Dompet Digital cocok.in</h3>
      </div>

      {/* Saldo Main Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-xl shadow-blue-500/10 relative overflow-hidden">
        <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Saldo Terverifikasi</span>
        <h2 className="text-2xl font-black mt-1">Rp {user.walletBalance.toLocaleString('id-ID')}</h2>

        <div className="mt-4 pt-4 border-t border-white/20 flex gap-2">
          <button
            onClick={() => setShowTopUpModal(true)}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Top Up Saldo</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-800">Riwayat Mutasi Saldo</h4>
          <div className="flex gap-1">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'topup', label: 'Masuk' },
              { id: 'payment', label: 'Keluar' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                  filterType === f.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredTx.map((tx) => {
            const isIncome = tx.type === 'topup' || tx.type === 'payout' || tx.type === 'refund';
            return (
              <div key={tx.transactionId} className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {isIncome ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{tx.description}</p>
                    <p className="text-[10px] text-slate-400">{tx.timestamp}</p>
                  </div>
                </div>
                <span className={`font-mono font-bold ${isIncome ? 'text-emerald-600' : 'text-red-500'}`}>
                  {isIncome ? '+' : '-'}Rp {tx.amount.toLocaleString('id-ID')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Up Nominal Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 space-y-4 relative">
            <button
              onClick={() => setShowTopUpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900">Pilih Nominal Top Up</h3>

            <div className="grid grid-cols-2 gap-2">
              {[50000, 100000, 250000, 500000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleConfirmTopUp(amt)}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Rp {amt.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Nominal Lainnya:</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 mb-3"
              />
              <button
                onClick={() => handleConfirmTopUp(Number(customAmount) || 50000)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Top Up Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
