import React, { useState } from 'react';
import { Dispute } from '../../types';
import { AlertOctagon, MessageSquare, Check, X, ShieldAlert } from 'lucide-react';

interface AdminDisputesProps {
  disputes: Dispute[];
  onResolveDispute: (disputeId: string, decision: 'refund' | 'rejected', replyMessage: string) => void;
}

export const AdminDisputes: React.FC<AdminDisputesProps> = ({ disputes, onResolveDispute }) => {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(disputes[0] || null);
  const [replyText, setReplyText] = useState<string>('');

  const handleDecision = (decision: 'refund' | 'rejected') => {
    if (!selectedDispute) return;
    onResolveDispute(selectedDispute.disputeId, decision, replyText || 'Keputusan resmi Admin cocok.in');
    setReplyText('');
    setSelectedDispute(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* List Disputes Left */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-base font-bold text-white px-2 py-1 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-red-400" />
          <span>Daftar Komplain Pembeli ({disputes.length})</span>
        </h3>

        {disputes.length === 0 ? (
          <p className="text-sm text-slate-400 p-4 text-center">Tidak ada dispute komplain.</p>
        ) : (
          disputes.map((d) => (
            <div
              key={d.disputeId}
              onClick={() => setSelectedDispute(d)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedDispute?.disputeId === d.disputeId
                  ? 'bg-blue-600/10 border-blue-500 text-white'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-blue-400">{d.disputeId}</span>
                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                    d.status === 'open'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : d.status === 'refunded'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}
                >
                  {d.status}
                </span>
              </div>
              <p className="font-bold text-sm mb-1">{d.reason}</p>
              <div className="text-xs text-slate-400 flex justify-between">
                <span>Pembeli: {d.buyerName}</span>
                <span>Order: {d.orderId}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dispute Detail Right */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        {selectedDispute ? (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-slate-400 font-mono">Dispute ID: {selectedDispute.disputeId}</span>
              <h2 className="text-xl font-bold text-white mt-1">{selectedDispute.reason}</h2>
              <p className="text-xs text-slate-400 mt-1">Dibuat pada: {selectedDispute.createdAt}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block font-semibold mb-0.5">Pembeli (Klaim)</span>
                <span className="text-white font-medium">{selectedDispute.buyerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-semibold mb-0.5">Penjual (Tergugat)</span>
                <span className="text-white font-medium">{selectedDispute.sellerName}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Penjelasan Masalah:</h4>
              <p className="text-sm bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200">
                "{selectedDispute.description}"
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Foto Bukti Kerusakan:</h4>
              <div className="flex gap-3 overflow-x-auto">
                {selectedDispute.evidenceImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Bukti dispute"
                    className="w-32 h-28 object-cover rounded-xl border border-slate-700"
                  />
                ))}
              </div>
            </div>

            {selectedDispute.status === 'open' ? (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>Keputusan Resmi Admin</span>
                </h4>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tulis alasan keputusan resolusi dispute untuk dikirim ke Pembeli & Penjual..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 h-24"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDecision('refund')}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Setujui Refund (Kembalikan Saldo ke Pembeli)</span>
                  </button>
                  <button
                    onClick={() => handleDecision('rejected')}
                    className="flex-1 py-2.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Tolak Dispute (Lepas Saldo ke Penjual)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1 font-semibold">Respon Admin Terakhir:</span>
                <p className="text-slate-200">{selectedDispute.adminResponse || 'Dispute telah diselesaikan'}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            Pilih komplain dari daftar sebelah kiri untuk meninjau detailnya.
          </div>
        )}
      </div>
    </div>
  );
};
