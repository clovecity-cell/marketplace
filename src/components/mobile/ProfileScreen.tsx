import React from 'react';
import { User } from '../../types';
import { Wallet, ShoppingBag, Store, Truck, Settings, LogOut, ShieldAlert, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ProfileScreenProps {
  user: User;
  onOpenWallet: () => void;
  onOpenSeller: () => void;
  onOpenCourier: () => void;
  onOpenOrders: () => void;
  onOpenVerification: () => void;
  onOpenSupport: () => void;
  onOpenReviews: () => void;
  onOpenPayment: () => void;
  onOpenSellerOnboarding: () => void;
  onOpenNotifications: () => void;
  onOpenVouchers: () => void;
  onOpenSecurity: () => void;
  onOpenChatSupport: () => void;
  onOpenAddress: () => void;
  onOpenDispute: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onOpenWallet,
  onOpenSeller,
  onOpenCourier,
  onOpenOrders,
  onOpenVerification,
  onOpenSupport,
  onOpenReviews,
  onOpenPayment,
  onOpenSellerOnboarding,
  onOpenNotifications,
  onOpenVouchers,
  onOpenSecurity,
  onOpenChatSupport,
  onOpenAddress,
  onOpenDispute,
  onLogout,
}) => {
  const isAdmin = user.roles.includes('admin');
  const isSeller = user.roles.includes('seller');
  const isCourier = user.roles.includes('courier');

  if (isAdmin) {
    return (
      <div className="py-12 text-center space-y-4 px-4 bg-slate-50 rounded-2xl border border-slate-200 my-6">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Akses Khusus Admin</h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
          User dengan role <span className="font-bold text-blue-600 font-mono">'admin'</span> dilarang mengakses fitur jual/beli di aplikasi mobile.
        </p>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-semibold">
          Silakan akses Admin Web di browser!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {/* User Avatar Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-4">
        <img
          src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="overflow-hidden flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-slate-900 truncate">{user.name}</h3>
            {user.isVerified && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
          </div>
          <p className="text-xs text-slate-500 truncate">{user.email}</p>
          <div className="flex gap-1 mt-1">
            {user.roles.map((r) => (
              <span key={r} className="text-[9px] font-bold uppercase bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Saldo Wallet Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-4 shadow-lg shadow-blue-500/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-blue-100 uppercase tracking-wider font-semibold block">Saldo Wallet cocok.in</span>
          <span className="text-lg font-bold">Rp {user.walletBalance.toLocaleString('id-ID')}</span>
        </div>
        <button
          onClick={onOpenWallet}
          className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
        >
          Kelola Wallet
        </button>
      </div>

      {/* Menu Options */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
        <button
          onClick={onOpenOrders}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Pesanan Saya</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {isSeller && (
          <button
            onClick={onOpenSeller}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Store className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Toko Saya (Dashboard Penjual)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        )}

        {isCourier && (
          <button
            onClick={onOpenCourier}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-amber-600" />
              <span className="font-semibold">Pengiriman Saya (Dashboard Kurir)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        )}

        <button
          onClick={onOpenVerification}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Verifikasi Akun</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenSupport}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Dukungan Pelanggan</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenChatSupport}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Live Chat Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenReviews}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Ulasan Pengguna</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenPayment}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Metode Pembayaran</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenAddress}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Alamat Pengiriman</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenSecurity}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Keamanan Akun</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenDispute}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Refund & Dispute</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenSellerOnboarding}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Daftar Jadi Penjual</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenNotifications}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Notifikasi</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenVouchers}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">Voucher & Referral</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onLogout}
          className="w-full p-3.5 flex items-center justify-between hover:bg-red-50 text-red-600 font-semibold cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </div>
        </button>
      </div>
    </div>
  );
};
