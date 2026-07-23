import React from 'react';
import { Users, DollarSign, ShoppingBag, TrendingUp, AlertTriangle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Order, User } from '../../types';

interface AdminDashboardProps {
  orders: Order[];
  users: User[];
}

const salesChartData = [
  { day: 'Sen', total: 4200000, orders: 28 },
  { day: 'Sel', total: 5800000, orders: 35 },
  { day: 'Rab', total: 3900000, orders: 22 },
  { day: 'Kam', total: 7100000, orders: 48 },
  { day: 'Jum', total: 9500000, orders: 62 },
  { day: 'Sab', total: 12800000, orders: 84 },
  { day: 'Min', total: 11200000, orders: 75 },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, users }) => {
  const totalUsersCount = users.length;
  const platformRevenue = orders.reduce((acc, o) => acc + o.platformFee, 2850000);
  const todayOrdersCount = orders.length;

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Pengguna</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">{totalUsersCount}</div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5" /> +12.4% minggu ini
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pendapatan Platform</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">
            Rp {platformRevenue.toLocaleString('id-ID')}
          </div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5" /> Commission 5% aktif
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pesanan Hari Ini</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">{todayOrdersCount}</div>
          <p className="text-xs text-slate-400 mt-2">Escrow Hold Wallet Active</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-white">Grafik Transaksi & Pendapatan Mingguan</h3>
            <p className="text-xs text-slate-400">Data agregat transaksi platform cocok.in</p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
            Recharts Live Visualization
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `Rp${val / 1000000}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                formatter={(value: any) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Volume Transaksi']}
              />
              <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest 5 Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">5 Pesanan Terbaru</h3>
          <span className="text-xs text-blue-400 hover:underline cursor-pointer">Lihat Semua</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/60 text-xs uppercase text-slate-400">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Pembeli</th>
                <th className="p-3">Penjual</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.orderId} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-xs text-blue-400 font-medium">{ord.orderId}</td>
                  <td className="p-3 font-medium text-white">{ord.buyerName}</td>
                  <td className="p-3 text-slate-400">{ord.sellerName}</td>
                  <td className="p-3 font-semibold text-white">Rp {ord.grandTotal.toLocaleString('id-ID')}</td>
                  <td className="p-3">
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium capitalize">
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
