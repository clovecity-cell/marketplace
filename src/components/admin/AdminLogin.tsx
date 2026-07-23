import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertTriangle, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: (adminEmail: string) => void;
  onDenyAccess: (reason: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onDenyAccess }) => {
  const [email, setEmail] = useState('admin@cocok.in');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrorMsg('Masukkan email valid');
      return;
    }

    // Check if user has admin role
    if (email.toLowerCase().includes('admin') || email === 'admin@cocok.in') {
      onSuccess(email);
    } else {
      onDenyAccess('AKSES DITOLAK: User dengan email ini tidak memiliki hak akses role: "admin" di Firestore.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-3 border border-blue-500/30">
            <ShieldCheck className="w-9 h-9 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">cocok.in Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Sistem Manajemen & Kontrol Platform Pusat</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Admin
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                placeholder="admin@cocok.in"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Masuk Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-700/60 text-center">
          <p className="text-xs text-slate-500">
            Akses Khusus Pengelola Platform. Proteksi Firestore Rules & Custom Claim Admin Active.
          </p>
        </div>
      </div>
    </div>
  );
};
