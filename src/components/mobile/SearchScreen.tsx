import React, { useState } from 'react';
import { Product } from '../../types';
import { Search, SlidersHorizontal, Star, ShoppingCart } from 'lucide-react';

interface SearchScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [minRating, setMinRating] = useState<number>(4.0);

  const filteredProducts = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    const matchesRating = p.rating >= minRating;
    return p.isApproved && matchesName && matchesPrice && matchesRating;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Search Header */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Cari produk di cocok.in..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-100 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Filters Box */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span>Filter Pencarian</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-slate-500 block mb-1">Maksimal Harga: Rp {maxPrice.toLocaleString('id-ID')}</label>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="25000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-500 block mb-1">Minimal Rating: ⭐ {minRating}</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800"
            >
              <option value="3.0">Semua Rating (3.0+)</option>
              <option value="4.0">⭐ 4.0+</option>
              <option value="4.5">⭐ 4.5+</option>
              <option value="4.8">⭐ 4.8+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <p className="text-xs text-slate-500 font-medium">Menampilkan {filteredProducts.length} hasil produk</p>

        {filteredProducts.map((p) => (
          <div key={p.productId} className="bg-white border border-slate-200/80 rounded-2xl p-3 flex gap-3 shadow-sm">
            <img src={p.images[0]} alt={p.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                <p className="text-[10px] text-slate-500">{p.sellerName}</p>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{p.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-blue-600">Rp {p.price.toLocaleString('id-ID')}</span>
                <button
                  onClick={() => onAddToCart(p)}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  + Keranjang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
