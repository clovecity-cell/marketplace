import React from 'react';
import { ArrowLeft, PackageCheck, ShieldCheck, Truck, CircleDollarSign, Clock3 } from 'lucide-react';
import { Order } from '../../types';

interface OrderDetailScreenProps {
  order: Order;
  onBack: () => void;
}

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ order, onBack }) => {
  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">{order.orderId}</p>
            <h2 className="text-lg font-black text-slate-900">Detail Pesanan</h2>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 capitalize">
            {order.status}
          </span>
        </div>

        <div className="rounded-2xl bg-blue-50 p-3 text-sm text-blue-800">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Dana Anda aman di escrow cocok.in sampai barang diterima.
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <PackageCheck className="h-4 w-4 text-blue-600" />
          Ringkasan Belanja
        </div>
        <div className="mt-3 space-y-2">
          {order.items.map((item) => (
            <div key={`${order.orderId}-${item.productId}`} className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-sm">
              <div>
                <p className="font-semibold text-slate-800">{item.productName}</p>
                <p className="text-xs text-slate-500">Variant: {item.variant} • Qty: {item.quantity}</p>
              </div>
              <p className="font-bold text-slate-700">Rp {item.price.toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Truck className="h-4 w-4 text-emerald-600" />
          Informasi Pengiriman
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-800">Penjual:</span> {order.sellerName}</p>
          <p><span className="font-semibold text-slate-800">Pembeli:</span> {order.buyerName}</p>
          <p><span className="font-semibold text-slate-800">Dikirim via:</span> {order.courierType === 'personal_seller' ? 'Kurir pribadi penjual' : 'Kurir platform'}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <CircleDollarSign className="h-4 w-4 text-amber-600" />
          Rincian Pembayaran
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <div className="flex justify-between"><span>Subtotal</span><span>Rp {order.subtotal.toLocaleString('id-ID')}</span></div>
          <div className="flex justify-between"><span>Ongkir</span><span>Rp {order.shippingCost.toLocaleString('id-ID')}</span></div>
          <div className="flex justify-between"><span>Biaya Platform</span><span>Rp {order.platformFee.toLocaleString('id-ID')}</span></div>
          <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2"><span>Total</span><span>Rp {order.grandTotal.toLocaleString('id-ID')}</span></div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Clock3 className="h-4 w-4 text-slate-500" />
          Riwayat Status
        </div>
        <div className="mt-3 space-y-2">
          {order.trackingHistory.map((step, index) => (
            <div key={`${step.status}-${index}`} className="rounded-xl bg-slate-50 p-2.5 text-sm">
              <p className="font-semibold text-slate-800">{step.status}</p>
              <p className="text-xs text-slate-500">{step.description}</p>
              <p className="mt-1 text-[10px] text-slate-400">{step.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
