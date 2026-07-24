import React, { useState } from 'react';
import { Home, Search, ShoppingBag, Heart, User as UserIcon, ShieldAlert, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';

interface MobileShellProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  isDarkMode?: boolean;
  children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({
  currentRole,
  onChangeRole,
  activeTab,
  setActiveTab,
  cartCount,
  isDarkMode = false,
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-slate-900'} flex flex-col items-center justify-center p-0 sm:p-4 font-sans`}>
      {/* Mobile Frame Outer Container */}
      <div className={`w-full max-w-md ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'} sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-screen sm:min-h-[820px] sm:max-h-[880px] border ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} relative`}>
        
        {/* Top Role Switcher Header Bar */}
        <div className={`bg-gradient-to-r ${isDarkMode ? 'from-slate-950 via-slate-900 to-indigo-950' : 'from-slate-900 via-blue-900 to-indigo-800'} text-white p-3 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-800'} flex items-center justify-between sticky top-0 z-30 shadow-sm`}>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20 text-sm font-black text-blue-200">
              c
            </div>
            <div>
              <span className="block font-extrabold text-blue-300 text-sm tracking-tight">cocok.in</span>
              <span className="text-[10px] text-blue-100/90">
                Mobile App • Escrow & Commerce
              </span>
            </div>
          </div>

          {/* Role selector dropdown/chips */}
          <div className={`flex ${isDarkMode ? 'bg-slate-800/70' : 'bg-slate-800/70'} p-0.5 rounded-xl border border-slate-700 backdrop-blur`}>
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
        <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-slate-950/80' : 'bg-slate-50/50'}`}>
          {isAdminRole ? (
            <div className={`py-16 text-center space-y-4 px-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} rounded-2xl border my-8 shadow-xs`}>
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
          <nav className={`${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur border-t h-16 px-3 flex items-center justify-around sticky bottom-0 z-30 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]`}>
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-blue-600 font-bold scale-105'
                      : isDarkMode
                        ? 'text-slate-500 hover:text-slate-300'
                        : 'text-slate-400 hover:text-slate-600'
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
