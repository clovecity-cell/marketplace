import React, { useState } from 'react';
import { CartItem, User, PlatformSettings } from '../../types';
import { MapPin, Truck, ShieldCheck, Wallet, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CheckoutScreenProps {
  cart: CartItem[];
  user: User;
  settings: PlatformSettings;
  onBack: () => void;
  onPaySuccess: (orderId: string, grandTotal: number) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  user,
  settings,
  onBack,
  onPaySuccess,
}) => {
  const [selectedCourier, setSelectedCourier] = useState<'platform' | 'personal_seller'>('platform');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shippingCost = selectedCourier === 'platform' ? settings.baseShippingFee : 10000;
  const platformFee = Math.round((subtotal * settings.platformFeePercentage) / 100);
  const grandTotal = subtotal + shippingCost + platformFee;

  const handlePay = () => {
    if (user.walletBalance < grandTotal) {
      setErrorMsg(`Saldo Wallet (Rp ${user.walletBalance.toLocaleString('id-ID')}) tidak cukup untuk total Rp ${grandTotal.toLocaleString('id-ID')}`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      onPaySuccess(generatedOrderId, grandTotal);
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button onClick={onBack} className="p-1 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-sm font-bold text-slate-800">Checkout & Escrow Payment</h3>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* Alamat Pengiriman */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-2">
        <span className="text-[10px] font-bold uppercase text-slate-400">Alamat Pengiriman (Buyer)</span>
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">{user.name} ({user.phone})</p>
            <p className="text-slate-500 mt-0.5">{user.address}</p>
          </div>
        </div>
      </div>

      {/* Pilih Kurir */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
        <span className="text-[10px] font-bold uppercase text-slate-400">Metode Pengiriman / Kurir</span>

        <div className="space-y-2">
          <label
            onClick={() => setSelectedCourier('platform')}
            className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
              selectedCourier === 'platform'
                ? 'border-blue-600 bg-blue-50/50 font-bold text-blue-900'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <div>
                <p>Kurir Internal platform cocok.in</p>
                <p className="text-[10px] text-slate-500 font-normal">Express 1 Jam (Penugasan GPS Otomatis)</p>
              </div>
            </div>
            <span className="font-bold">Rp {settings.baseShippingFee.toLocaleString('id-ID')}</span>
          </label>

          <label
            onClick={() => setSelectedCourier('personal_seller')}
            className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
              selectedCourier === 'personal_seller'
                ? 'border-blue-600 bg-blue-50/50 font-bold text-blue-900'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              <div>
                <p>Kurir Pribadi Toko Penjual</p>
                <p className="text-[10px] text-slate-500 font-normal">Antar langsung oleh armada toko</p>
              </div>
            </div>
            <span className="font-bold">Rp 10.000</span>
          </label>
        </div>
      </div>

      {/* Rincian Biaya */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-2 text-xs">
        <span className="text-[10px] font-bold uppercase text-slate-400">Rincian Transaksi</span>
        <div className="flex justify-between text-slate-600">
          <span>Subtotal Produk ({cart.length} barang)</span>
          <span>Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Biaya Ongkos Kirim</span>
          <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Biaya Layanan Platform ({settings.platformFeePercentage}%)</span>
          <span>Rp {platformFee.toLocaleString('id-ID')}</span>
        </div>
        <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-sm text-slate-900">
          <span>Grand Total</span>
          <span className="text-blue-600">Rp {grandTotal.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Saldo Wallet & Pay Button */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-800">Saldo Wallet Anda:</span>
          </div>
          <span className="font-mono font-bold text-emerald-700">Rp {user.walletBalance.toLocaleString('id-ID')}</span>
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors cursor-pointer"
        >
          {isProcessing ? (
            <span>Memproses Potong Saldo & Escrow...</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Bayar dengan Wallet (Rp {grandTotal.toLocaleString('id-ID')})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
