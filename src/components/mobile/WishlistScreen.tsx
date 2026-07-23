import React from 'react';
import { Product } from '../../types';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface WishlistScreenProps {
  wishlistProducts: Product[];
  onAddToCart: (p: Product) => void;
  onRemoveWishlist: (p: Product) => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistProducts,
  onAddToCart,
  onRemoveWishlist,
}) => {
  if (wishlistProducts.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <Heart className="w-12 h-12 text-slate-300 mx-auto" />
        <p className="text-sm font-semibold text-slate-600">Belum ada produk favorit tersimpan</p>
        <p className="text-xs text-slate-400">Tekan ikon hati pada produk untuk menyimpannya di sini!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      <h3 className="text-sm font-bold text-slate-800">Produk Favorit Saya ({wishlistProducts.length})</h3>

      <div className="grid grid-cols-2 gap-3">
        {wishlistProducts.map((prod) => (
          <div key={prod.productId} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative">
              <img src={prod.images[0]} alt={prod.name} className="w-full h-32 object-cover" />
              <button
                onClick={() => onRemoveWishlist(prod)}
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-red-500 shadow-xs cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-red-500" />
              </button>
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{prod.name}</h4>
                <p className="text-[10px] text-slate-500">{prod.sellerName}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600">Rp {prod.price.toLocaleString('id-ID')}</span>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="p-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
