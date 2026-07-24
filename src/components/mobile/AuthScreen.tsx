import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, UserCircle2 } from 'lucide-react';

export type AuthMode = 'login' | 'register' | 'forgot';

interface AuthScreenProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  errorMessage?: string;
  successMessage?: string;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  mode,
  onModeChange,
  onLogin,
  onRegister,
  errorMessage,
  successMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (mode === 'login') {
      onLogin(email.trim(), password);
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        return;
      }
      onRegister(name.trim(), email.trim(), password);
      return;
    }

    onModeChange('login');
  };

  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_45%),linear-gradient(135deg,_#020617,_#0f172a)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-800/80 bg-slate-900/90 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black text-white">
            c
          </div>
          <div>
            <p className="text-xl font-black text-white">cocok.in</p>
            <p className="text-xs text-slate-400">Masuk untuk lanjut belanja & jualan</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3 text-sm text-blue-200">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-4 w-4" />
            Masuk ke akun marketplace Anda untuk melanjutkan transaksi.
          </div>
          <p className="mt-1 text-xs text-slate-300">Gunakan akun yang sudah terdaftar atau buat akun baru.</p>
          <button
            type="button"
            onClick={() => onModeChange('login')}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              isLogin ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => onModeChange('register')}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              isRegister ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Daftar
          </button>
        </div>

        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          {isRegister && (
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Nama lengkap</span>
              <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3">
                <UserCircle2 className="mr-2 h-4 w-4 text-slate-500" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="Contoh: Rina Putri"
                  required={isRegister}
                />
              </div>
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Email</span>
            <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3">
              <Mail className="mr-2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="your@email.com"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Password</span>
            <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3">
              <Lock className="mr-2 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                placeholder={isLogin ? 'Masukkan password' : 'Minimal 6 karakter'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-slate-400"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          {isRegister && (
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Ulangi password</span>
              <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3">
                <Lock className="mr-2 h-4 w-4 text-slate-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="Ketik ulang password"
                  required={isRegister}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-2 text-slate-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>
          )}

          {errorMessage && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{errorMessage}</p>}
          {successMessage && <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{successMessage}</p>}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            {isLogin ? 'Masuk Sekarang' : isRegister ? 'Buat Akun' : 'Kirim'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button type="button" onClick={() => onModeChange('forgot')} className="text-slate-400 hover:text-white">
            Lupa password?
          </button>
          {isForgot && (
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              Reset tersedia via email
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
