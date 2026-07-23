import React from 'react';
import { Product } from '../../types';
import { CheckCircle, XCircle, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  onApproveProduct: (productId: string) => void;
  onRejectProduct: (productId: string) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  onApproveProduct,
  onRejectProduct,
}) => {
  const pendingProducts = products.filter((p) => !p.isApproved);
  const approvedProducts = products.filter((p) => p.isApproved);

  return (
    <div className="space-y-8">
      {/* Pending Products Moderation Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Moderasi Produk Pending Approval</span>
            </h3>
            <p className="text-xs text-slate-400">
              Produk yang diunggah oleh Penjual harus disetujui Admin sebelum tayang di marketplace
            </p>
          </div>
          <span className="text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full">
            {pendingProducts.length} Menunggu Moderasi
          </span>
        </div>

        {pendingProducts.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/50 rounded-xl border border-slate-800 text-slate-400 text-sm">
            Tidak ada produk baru yang menunggu persetujuan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/80 text-xs uppercase text-slate-400">
                <tr>
                  <th className="p-3">Produk</th>
                  <th className="p-3">Penjual</th>
                  <th className="p-3">Harga & Stok</th>
                  <th className="p-3">AI Moderation Risk</th>
                  <th className="p-3 text-right">Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {pendingProducts.map((prod) => (
                  <tr key={prod.productId} className="hover:bg-slate-800/40">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-white">{prod.name}</p>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                            {prod.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-slate-300 font-medium">{prod.sellerName}</td>
                    <td className="p-3">
                      <p className="font-semibold text-white">Rp {prod.price.toLocaleString('id-ID')}</p>
                      <p className="text-xs text-slate-400">Stok: {prod.stock}</p>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                            (prod.moderationScore ?? 0) > 50
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          Skor AI: {prod.moderationScore ?? 0}/100
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onApproveProduct(prod.productId)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => onRejectProduct(prod.productId)}
                          className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approved Active Catalog */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Katalog Produk Aktif ({approvedProducts.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedProducts.map((p) => (
            <div key={p.productId} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-3 items-center">
              <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-lg object-cover border border-slate-800" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{p.name}</p>
                <p className="text-xs text-slate-400">{p.sellerName}</p>
                <p className="text-sm font-semibold text-blue-400 mt-1">Rp {p.price.toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
