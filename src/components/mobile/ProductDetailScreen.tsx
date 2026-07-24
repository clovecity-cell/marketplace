import React from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailScreenProps {
  product: Product;
  isFavorite: boolean;
  onBack: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  isFavorite,
  onBack,
  onToggleWishlist,
  onAddToCart,
}) => {
  return (
    <div className="space-y-4 pb-20">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <img src={product.images[0]} alt={product.name} className="h-56 w-full object-cover" />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{product.category}</p>
              <h2 className="mt-1 text-lg font-black text-slate-900">{product.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{product.sellerName}</p>
            </div>
            <button
              onClick={() => onToggleWishlist(product)}
              className="rounded-full border border-slate-200 p-2 text-slate-600"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-amber-400" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-slate-500">• 120 ulasan</span>
          </div>

          <div className="mt-4 rounded-2xl bg-blue-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Harga</p>
            <p className="text-2xl font-black text-blue-700">Rp {product.price.toLocaleString('id-ID')}</p>
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Garansi aman dan pembayaran escrow</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>Pengiriman cepat ke seluruh Indonesia</span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-800">Deskripsi</p>
            <p className="mt-1 text-sm text-slate-600">{product.description}</p>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">
            <Sparkles className="h-4 w-4" />
            Stok tersedia: {product.stock} unit
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Tambahkan ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};
