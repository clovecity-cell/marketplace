import React from 'react';
import { CartItem } from '../../types';
import { ShoppingBag, Trash2, ArrowRight, Store } from 'lucide-react';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, newQty: number) => void;
  onProceedToCheckout: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ cart, onUpdateQty, onProceedToCheckout }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
        <p className="text-sm font-semibold text-slate-600">Keranjang belanja Anda masih kosong</p>
        <p className="text-xs text-slate-400">Pilih produk favorit Anda di Home dan tambahkan ke keranjang!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-28">
      <h3 className="text-sm font-bold text-slate-800">Keranjang Belanja Multi-Seller</h3>

      {cart.map((item) => (
        <div key={item.product.productId} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 border-b border-slate-100 pb-2">
            <Store className="w-3.5 h-3.5 text-blue-600" />
            <span>{item.product.sellerName}</span>
          </div>

          <div className="flex gap-3">
            <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
              <p className="text-[10px] text-slate-400">Varian: {item.selectedVariant || 'Normal'}</p>
              <p className="text-xs font-bold text-blue-600 mt-1">Rp {item.product.price.toLocaleString('id-ID')}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={() => onUpdateQty(item.product.productId, 0)}
              className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => onUpdateQty(item.product.productId, item.quantity - 1)}
                className="w-6 h-6 bg-white rounded text-xs font-bold shadow-xs cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-bold px-2">{item.quantity}</span>
              <button
                onClick={() => onUpdateQty(item.product.productId, item.quantity + 1)}
                className="w-6 h-6 bg-white rounded text-xs font-bold shadow-xs cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Floating Checkout Footer Bar with GREEN Button as explicitly required */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-4 shadow-2xl z-20 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Total Belanja</span>
          <span className="text-base font-bold text-blue-600">Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>

        <button
          onClick={onProceedToCheckout}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors cursor-pointer"
        >
          <span>Lanjut Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
