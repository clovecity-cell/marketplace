import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { Shield, Eye, Ban, CheckCircle, Search, Filter, X } from 'lucide-react';

interface AdminUsersProps {
  users: User[];
  onBanUser: (uid: string) => void;
  onVerifyUser: (uid: string) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ users, onBanUser, onVerifyUser }) => {
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedKtpUser, setSelectedKtpUser] = useState<User | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.roles.includes(roleFilter as UserRole);
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-white pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-400 shrink-0">Filter Role:</span>
          {['all', 'buyer', 'seller', 'courier', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                roleFilter === role
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {role === 'all' ? 'Semua' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-xs uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">Pengguna</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status KTP</th>
              <th className="p-4">Saldo Wallet</th>
              <th className="p-4">Status Akun</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredUsers.map((user) => (
              <tr key={user.uid} className="hover:bg-slate-800/40">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((r) => (
                      <span
                        key={r}
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                          r === 'admin'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            : r === 'seller'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : r === 'courier'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  {user.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> Terverifikasi
                    </span>
                  ) : (
                    <span className="text-xs text-amber-400 font-medium">Pending Verifikasi</span>
                  )}
                </td>
                <td className="p-4 font-mono font-medium text-white">
                  Rp {user.walletBalance.toLocaleString('id-ID')}
                </td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      user.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedKtpUser(user)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      title="Verifikasi KTP"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>KTP</span>
                    </button>
                    <button
                      onClick={() => onBanUser(user.uid)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                        user.status === 'active'
                          ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>{user.status === 'active' ? 'Suspend' : 'Aktifkan'}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal View KTP */}
      {selectedKtpUser && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedKtpUser(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-1">Verifikasi Dokumen Identitas KTP</h3>
            <p className="text-xs text-slate-400 mb-4">Pengguna: {selectedKtpUser.name} ({selectedKtpUser.email})</p>

            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 mb-4">
              <img
                src={selectedKtpUser.ktpImageUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'}
                alt="Foto KTP"
                className="w-full h-56 object-cover rounded-lg"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setSelectedKtpUser(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700"
              >
                Tutup
              </button>
              {!selectedKtpUser.isVerified && (
                <button
                  onClick={() => {
                    onVerifyUser(selectedKtpUser.uid);
                    setSelectedKtpUser(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 flex items-center gap-1.5 font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Setujui Verifikasi KTP</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
