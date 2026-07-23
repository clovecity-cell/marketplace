import React, { useState } from 'react';
import { PlatformSettings } from '../../types';
import { Settings, Save, CheckCircle, Percent, DollarSign, Truck } from 'lucide-react';

interface AdminSettingsProps {
  settings: PlatformSettings;
  onUpdateSettings: (newSettings: PlatformSettings) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onUpdateSettings }) => {
  const [platformFee, setPlatformFee] = useState<number>(settings.platformFeePercentage);
  const [minWithdraw, setMinWithdraw] = useState<number>(settings.minWithdrawAmount);
  const [baseShippingFee, setBaseShippingFee] = useState<number>(settings.baseShippingFee);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      platformFeePercentage: Number(platformFee),
      minWithdrawAmount: Number(minWithdraw),
      baseShippingFee: Number(baseShippingFee),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-500" />
          <span>Pengaturan Parameter Platform</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Perubahan nilai di sini akan langsung memperbarui parameter komisi dan pengiriman di Firestore secara otomatis
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-sm">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Pengaturan platform cocok.in berhasil diperbarui di Firestore!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Komisi Platform (platformFee %)
          </label>
          <div className="relative">
            <Percent className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
            <input
              type="number"
              step="0.1"
              value={platformFee}
              onChange={(e) => setPlatformFee(parseFloat(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Persentase potongan komisi platform dari setiap order sukses</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Minimum Penarikan Saldo Wallet (minWithdraw)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
            <input
              type="number"
              value={minWithdraw}
              onChange={(e) => setMinWithdraw(parseInt(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Batas minimum saldo yang dapat ditarik oleh Penjual / Kurir</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Biaya Ongkir Dasar Platform (baseShippingFee)
          </label>
          <div className="relative">
            <Truck className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
            <input
              type="number"
              value={baseShippingFee}
              onChange={(e) => setBaseShippingFee(parseInt(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tarif dasar pengiriman internal platform dalam kota (Radius 5km)</p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan ke Firestore</span>
          </button>
        </div>
      </form>
    </div>
  );
};
