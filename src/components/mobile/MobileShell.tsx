import React, { useState } from 'react';
import { Home, Search, ShoppingBag, Heart, User as UserIcon, ShieldAlert, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';

interface MobileShellProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({
  currentRole,
  onChangeRole,
  activeTab,
  setActiveTab,
  cartCount,
  children,
}) => {
  const rolesList: { id: UserRole; label: string }[] = [
    { id: 'buyer', label: 'Pembeli' },
    { id: 'seller', label: 'Penjual' },
    { id: 'courier', label: 'Kurir' },
    { id: 'admin', label: 'Admin (Web Only)' },
  ];

  const bottomNavItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'search', label: 'Cari', icon: Search },
    { id: 'cart', label: 'Keranjang', icon: ShoppingBag, badge: cartCount },
    { id: 'wishlist', label: 'Favorit', icon: Heart },
    { id: 'profile', label: 'Profil', icon: UserIcon },
  ];

  const isAdminRole = currentRole === 'admin';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-0 sm:p-4 font-sans">
      {/* Mobile Frame Outer Container */}
      <div className="w-full max-w-md bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-screen sm:min-h-[820px] sm:max-h-[880px] border border-slate-200 relative">
        
        {/* Top Role Switcher Header Bar */}
        <div className="bg-slate-900 text-white p-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-400 text-sm tracking-tight">cocok.in</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
              Mobile App
            </span>
          </div>

          {/* Role selector dropdown/chips */}
          <div className="flex bg-slate-800 p-0.5 rounded-xl border border-slate-700">
            {rolesList.map((r) => (
              <button
                key={r.id}
                onClick={() => onChangeRole(r.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                  currentRole === r.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          {isAdminRole ? (
            <div className="py-16 text-center space-y-4 px-4 bg-white rounded-2xl border border-slate-200 my-8 shadow-xs">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Akses Khusus Admin Web</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                User dengan role <span className="font-bold text-blue-600 font-mono">'admin'</span> dilarang mengakses fitur jual/beli di aplikasi mobile.
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-bold">
                Silakan akses Admin Web di browser!
              </div>
            </div>
          ) : (
            children
          )}
        </div>

        {/* Bottom Navigation Bar */}
        {!isAdminRole && (
          <nav className="bg-white border-t border-slate-200 h-16 px-3 flex items-center justify-around sticky bottom-0 z-30 shadow-lg">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative cursor-pointer ${
                    isActive ? 'text-blue-600 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 right-1 bg-emerald-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};
