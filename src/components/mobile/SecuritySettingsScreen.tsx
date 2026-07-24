import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Smartphone, BellRing } from 'lucide-react';

interface SecuritySettingsScreenProps {
  onBack: () => void;
}

export const SecuritySettingsScreen: React.FC<SecuritySettingsScreenProps> = ({ onBack }) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isAlertEnabled, setIsAlertEnabled] = useState(true);

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button onClick={onBack} className="p-1 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-sm font-bold text-slate-800">Keamanan Akun</h3>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-300">Status perlindungan</p>
            <p className="text-sm font-bold">Akun Anda aman dan terverifikasi</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-blue-600" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Autentikasi 2 Langkah</p>
              <p className="text-[10px] text-slate-500">Kode OTP saat login dari perangkat baru</p>
            </div>
          </div>
          <button
            onClick={() => setIs2FAEnabled((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${is2FAEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${is2FAEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Login Sidik Jari</p>
              <p className="text-[10px] text-slate-500">Gunakan biometrik cepat saat membuka aplikasi</p>
            </div>
          </div>
          <button
            onClick={() => setIsBiometricEnabled((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isBiometricEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isBiometricEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BellRing className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Peringatan Aktivitas</p>
              <p className="text-[10px] text-slate-500">Notifikasi saat login dari lokasi baru</p>
            </div>
          </div>
          <button
            onClick={() => setIsAlertEnabled((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isAlertEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isAlertEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800">
        <p className="font-semibold">Rekomendasi aktif hari ini</p>
        <p className="mt-1">Ganti password secara berkala dan aktifkan notifikasi aktivitas untuk perlindungan maksimal.</p>
      </div>
    </div>
  );
};
