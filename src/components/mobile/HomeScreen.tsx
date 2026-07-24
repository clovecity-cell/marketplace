import React from 'react';
import { Product } from '../../types';
import { Sparkles, ShoppingCart, Star, Heart, Flame, ShieldCheck } from 'lucide-react';

interface HomeScreenProps {
  products: Product[];
  aiRecommendations: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenProduct: (product: Product) => void;
  onOpenPromotions: () => void;
  onOpenFlashSale: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  aiRecommendations,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenProduct,
  onOpenPromotions,
  onOpenFlashSale,
}) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Banner Carousel */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-emerald-600 p-6 text-white shadow-xl shadow-blue-500/10">
        <div className="max-w-xs space-y-2">
          <span className="inline-block bg-white/20 backdrop-blur text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Promo Spesial cocok.in
          </span>
          <h2 className="text-xl font-black tracking-tight leading-tight">
            Diskon s/d 50% + Bebas Ongkir Se-Indonesia!
          </h2>
          <p className="text-xs text-blue-100">
            Bayar praktis & aman menggunakan Saldo Wallet cocok.in Escrow Hold
          </p>
        </div>
        <button
          onClick={onOpenPromotions}
          className="mt-4 rounded-xl bg-white/20 px-3 py-2 text-sm font-semibold text-white backdrop-blur"
        >
          Lihat promo hari ini
        </button>
        <div className="absolute right-3 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Grid Categories */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-3 px-1">Kategori Pilihan</h3>
        <div className="grid grid-cols-4 gap-3 text-center">
          {[
            { name: 'Elektronik', icon: '📱', color: 'bg-blue-50 text-blue-600' },
            { name: 'Fashion', icon: '👕', color: 'bg-emerald-50 text-emerald-600' },
            { name: 'Kuliner', icon: '☕', color: 'bg-amber-50 text-amber-600' },
            { name: 'Kecantikan', icon: '✨', color: 'bg-purple-50 text-purple-600' },
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-105 ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="text-[11px] font-medium text-slate-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation Section (Gemini) */}
      <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-4 rounded-2xl border border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Rekomendasi Spesial AI Gemini</h3>
              <p className="text-[10px] text-slate-500">Disesuaikan otomatis dengan riwayat Anda</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            Gemini 2.5 Flash
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {aiRecommendations.map((prod) => (
            <div
              key={prod.productId}
              className="w-40 shrink-0 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={prod.images[0]}
                alt={prod.name}
                className="w-full h-28 object-cover rounded-lg mb-2"
              />
              <p className="text-xs font-bold text-slate-900 line-clamp-1">{prod.name}</p>
              <p className="text-[10px] text-slate-500 mb-1">{prod.sellerName}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-blue-600">
                  Rp {prod.price.toLocaleString('id-ID')}
                </span>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Products Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Katalog Produk Terbaru</span>
          </h3>
          <span className="text-xs font-semibold text-blue-600 cursor-pointer">Lihat Semua</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenFlashSale}
            className="rounded-2xl border border-orange-200 bg-orange-50 p-3 text-left"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-orange-600">Flash Sale</p>
            <p className="mt-1 text-sm font-bold text-slate-900">Diskon hingga 50%</p>
          </button>
          {products.filter(p => p.isApproved).map((prod) => {
            const isFav = wishlistIds.includes(prod.productId);
            return (
              <div
                key={prod.productId}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative">
                  <button onClick={() => onOpenProduct(prod)} className="block w-full">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-36 object-cover" />
                  </button>
                  <button
                    onClick={() => onToggleWishlist(prod)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-slate-600 hover:text-red-500 transition-colors shadow-sm cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {prod.category}
                    </span>
                    <button onClick={() => onOpenProduct(prod)} className="mt-1 text-left">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                        {prod.name}
                      </h4>
                    </button>
                    <p className="text-[10px] text-slate-500 mt-0.5">{prod.sellerName}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-blue-600">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-amber-500 font-medium">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{prod.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>+Beli</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
