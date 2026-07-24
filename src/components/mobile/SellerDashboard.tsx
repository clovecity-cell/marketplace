import React, { useState } from 'react';
import { Product, Order } from '../../types';
import { Store, DollarSign, ShoppingBag, Plus, Truck, ArrowLeft, TrendingUp, Package, Star, BadgeCheck } from 'lucide-react';

interface SellerDashboardProps {
  sellerProducts: Product[];
  sellerOrders: Order[];
  onAddProduct: (prod: Partial<Product>) => void;
  onUpdateOrderStatus: (orderId: string, status: 'processing' | 'shipping' | 'completed') => void;
  onBack: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  sellerProducts,
  sellerOrders,
  onAddProduct,
  onUpdateOrderStatus,
  onBack,
}) => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('85000');
  const [newProdCategory, setNewProdCategory] = useState('Kuliner & Makanan');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [showCourierModal, setShowCourierModal] = useState(false);
  const [personalCourierName, setPersonalCourierName] = useState('');

  const totalIncome = sellerOrders.reduce((acc, o) => acc + o.subtotal, 3250000);
  const fulfilledOrders = sellerOrders.filter((o) => o.status === 'completed' || o.status === 'shipping').length;
  const averageRating = sellerProducts.length ? (sellerProducts.reduce((acc, p) => acc + p.rating, 0) / sellerProducts.length).toFixed(1) : '0.0';
  const totalStock = sellerProducts.reduce((acc, p) => acc + p.stock, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      name: newProdName || 'Produk Baru Toko',
      price: Number(newProdPrice) || 50000,
      category: newProdCategory,
      description: newProdDesc || 'Deskripsi kualitas tinggi',
      images: ['https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80'],
      stock: 25,
      variants: ['Standar'],
      isApproved: false, // Must be moderated by Admin or Gemini
      rating: 0.0,
    });
    setShowAddProductModal(false);
    setNewProdName('');
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button onClick={onBack} className="p-1 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-sm font-bold text-slate-800">Dashboard Toko Penjual</h3>
          <p className="text-[11px] text-slate-500">Pantau omzet, stok, dan pesanan dari satu layar</p>
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200">Kinerja toko hari ini</p>
            <p className="mt-1 text-xl font-black">Rp {totalIncome.toLocaleString('id-ID')}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-2">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2 text-blue-600">
            <Package className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase">Stok Tersedia</span>
          </div>
          <p className="mt-2 text-lg font-black text-slate-900">{totalStock}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600">
            <BadgeCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase">Pesanan Selesai</span>
          </div>
          <p className="mt-2 text-lg font-black text-slate-900">{fulfilledOrders}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setShowAddProductModal(true)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </button>

        <button
          onClick={() => setShowCourierModal(true)}
          className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Truck className="w-4 h-4 text-emerald-400" />
          <span>+ Kurir Pribadi</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900">Kinerja Produk</h4>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
            <Star className="w-3 h-3 fill-amber-500" />
            {averageRating}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {sellerProducts.length ? sellerProducts.slice(0, 3).map((product) => (
            <div key={product.productId} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
              <div>
                <p className="font-semibold text-slate-800">{product.name}</p>
                <p className="text-[11px] text-slate-500">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">Rp {product.price.toLocaleString('id-ID')}</p>
                <p className="text-[11px] text-slate-500">{product.stock} stok</p>
              </div>
            </div>
          )) : <p className="text-sm text-slate-500">Belum ada produk yang Anda unggah.</p>}
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-slate-900">Kelola Status Pesanan</h4>

        {sellerOrders.map((ord) => (
          <div key={ord.orderId} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 text-xs">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold text-blue-600">{ord.orderId}</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold capitalize">
                {ord.status}
              </span>
            </div>
            <p className="font-bold text-slate-800">{ord.items[0]?.productName}</p>
            <p className="text-slate-500">Pembeli: {ord.buyerName}</p>

            <div className="pt-2 border-t border-slate-200/60 flex justify-end gap-2">
              {ord.status === 'paid' && (
                <button
                  onClick={() => onUpdateOrderStatus(ord.orderId, 'processing')}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold"
                >
                  Proses Pesanan
                </button>
              )}
              {ord.status === 'processing' && (
                <button
                  onClick={() => onUpdateOrderStatus(ord.orderId, 'shipping')}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold"
                >
                  Kirim Barang
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Form Tambah Produk Toko</h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Nama Produk</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2"
                  placeholder="Kopi Susu Aren 1L"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Kategori</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2"
                >
                  <option value="Kuliner & Makanan">Kuliner & Makanan</option>
                  <option value="Fashion & Pakaian">Fashion & Pakaian</option>
                  <option value="Elektronik">Elektronik</option>
                  <option value="Kecantikan">Kecantikan</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[10px] text-blue-800">
                Gambar akan diunggah ke Firebase Storage. AI Moderation Gemini akan otomatis memeriksa produk ini.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg"
                >
                  Simpan & Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Courier Modal */}
      {showCourierModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Daftarkan Kurir Pribadi Toko</h3>
            <input
              type="text"
              placeholder="Nama Kurir / Plat Kendaraan (misal: Rian - B 1234 KIN)"
              value={personalCourierName}
              onChange={(e) => setPersonalCourierName(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs"
            />
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowCourierModal(false)} className="flex-1 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg text-xs">
                Batal
              </button>
              <button
                onClick={() => {
                  alert(`Kurir Pribadi Toko (${personalCourierName || 'Kurir Toko'}) berhasil ditambahkan!`);
                  setShowCourierModal(false);
                }}
                className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs"
              >
                Simpan Kurir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
