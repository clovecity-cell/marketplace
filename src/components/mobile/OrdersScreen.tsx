import React from 'react';
import { ArrowLeft, PackageCheck, Truck, Clock3, CircleDollarSign } from 'lucide-react';
import { Order } from '../../types';

interface OrdersScreenProps {
  orders: Order[];
  onBack: () => void;
  onOpenOrderDetail: (order: Order) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ orders, onBack, onOpenOrderDetail }) => {
  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-900">Riwayat Pesanan</h2>
        <p className="mt-1 text-sm text-slate-500">Pantau status dan perkembangan pengiriman Anda.</p>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.orderId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{order.orderId}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{order.items[0]?.productName}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                {order.status}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <PackageCheck className="h-4 w-4 text-blue-600" />
                <span>Subtotal Rp {order.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-600" />
                <span>{order.sellerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-amber-600" />
                <span>{new Date(order.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CircleDollarSign className="h-4 w-4 text-blue-600" />
                Total: Rp {order.grandTotal.toLocaleString('id-ID')}
              </div>
              <button
                onClick={() => onOpenOrderDetail(order)}
                className="text-sm font-semibold text-blue-600"
              >
                Lihat detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
