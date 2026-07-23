import React, { useState } from 'react';
import { Truck, Navigation, Camera, CheckCircle2, DollarSign, ArrowLeft, Upload } from 'lucide-react';

interface CourierDashboardProps {
  onBack: () => void;
}

export const CourierDashboard: React.FC<CourierDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'history'>('available');
  const [deliveryStep, setDeliveryStep] = useState<'assigned' | 'picked_up' | 'delivered'>('assigned');
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofImage, setProofImage] = useState<string | null>(null);

  const handleTakeTask = () => {
    setActiveTab('active');
    setDeliveryStep('assigned');
  };

  const handleUploadProof = () => {
    setProofImage('https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80');
    setDeliveryStep('delivered');
    setShowProofModal(false);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button onClick={onBack} className="p-1 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-sm font-bold text-slate-800">Dashboard Kurir Express</h3>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
        <button
          onClick={() => setActiveTab('available')}
          className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'available' ? 'bg-white text-blue-600 shadow-xs' : ''
          }`}
        >
          Order Tersedia
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'active' ? 'bg-white text-blue-600 shadow-xs' : ''
          }`}
        >
          Pengiriman Aktif
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'history' ? 'bg-white text-blue-600 shadow-xs' : ''
          }`}
        >
          Riwayat & Income
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'available' && (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Memindai pesanan terdekat berdasarkan lokasi GPS (-6.2088, 106.8456)</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-blue-600">#ORD-2026-001</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                Jarak: 1.2 KM
              </span>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-900">Jemput: Toko Berkah Utama (Jababeka 2)</p>
              <p className="text-slate-500">Antar: Andi Pratama (Jl. Sudirman 45)</p>
              <p className="font-bold text-emerald-600 mt-1">Ongkir Kurir: Rp 15.000</p>
            </div>

            <button
              onClick={handleTakeTask}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Ambil Pesanan Ini
            </button>
          </div>
        </div>
      )}

      {activeTab === 'active' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-xs text-slate-800">Status Pengiriman Order #ORD-2026-001</span>
            <span className="text-xs font-mono font-bold text-blue-600 uppercase">{deliveryStep}</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className={`p-3 rounded-xl border flex items-center gap-3 ${deliveryStep === 'assigned' ? 'bg-blue-50 border-blue-300 font-bold' : 'bg-slate-50 border-slate-200'}`}>
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</div>
              <span>Ambil Paket dari Toko Penjual</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-3 ${deliveryStep === 'picked_up' ? 'bg-blue-50 border-blue-300 font-bold' : 'bg-slate-50 border-slate-200'}`}>
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</div>
              <span>Sedang Mengantar ke Alamat Pembeli</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-3 ${deliveryStep === 'delivered' ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900' : 'bg-slate-50 border-slate-200'}`}>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</div>
              <span>Paket Sampai & Foto Bukti Penerima</span>
            </div>
          </div>

          {deliveryStep === 'assigned' && (
            <button
              onClick={() => setDeliveryStep('picked_up')}
              className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Konfirmasi Sudah Ambil Paket dari Toko
            </button>
          )}

          {deliveryStep === 'picked_up' && (
            <button
              onClick={() => setShowProofModal(true)}
              className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Paket Sampai & Upload Foto Bukti</span>
            </button>
          )}

          {deliveryStep === 'delivered' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-bold">
              ✔ Pesanan Selesai Diantar! Ongkir Rp 15.000 masuk ke Wallet Kurir.
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-800">Pendapatan Pengiriman Kurir</h4>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
            <span className="text-[10px] font-bold uppercase text-emerald-700 block">Total Income Hari Ini</span>
            <span className="text-xl font-black">Rp 120.000</span>
            <span className="text-xs block text-emerald-700 mt-1">8 Pengiriman Berhasil Selesai</span>
          </div>
        </div>
      )}

      {/* Proof Photo Modal */}
      {showProofModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 space-y-4 text-center">
            <h3 className="text-sm font-bold text-slate-900">Foto Bukti Penerimaan Paket</h3>
            <div className="w-full h-40 bg-slate-100 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400">
              <Camera className="w-8 h-8" />
              <span className="text-xs">Ambil Foto / Upload Dokumen Bukti</span>
            </div>
            <button
              onClick={handleUploadProof}
              className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Simpan & Konfirmasi Sampai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
