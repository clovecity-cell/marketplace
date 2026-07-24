import React from 'react';
import { ArrowLeft, Star, MessageSquareQuote } from 'lucide-react';

interface ReviewsScreenProps {
  onBack: () => void;
}

export const ReviewsScreen: React.FC<ReviewsScreenProps> = ({ onBack }) => {
  const reviews = [
    { name: 'Rina', rating: 5, text: 'Produk sesuai deskripsi, pengirimannya cepat.', badge: 'Terpercaya', verified: true },
    { name: 'Dewi', rating: 4, text: 'Sangat membantu untuk belanja kebutuhan harian.', badge: 'Rekomendasi', verified: true },
    { name: 'Ayu', rating: 5, text: 'Pembayaran escrow sangat aman dan prosesnya nyaman.', badge: 'Escrow', verified: false },
  ];

  return (
    <div className="space-y-4 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-600">
          <MessageSquareQuote className="h-5 w-5" />
          <h2 className="text-lg font-black text-slate-900">Ulasan Pengguna</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">Lihat pengalaman pengguna lain dan bagikan pendapat Anda.</p>
      </div>

      <div className="space-y-3">
        {reviews.map((review, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">{review.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">{review.badge}</span>
                  {review.verified && <span className="text-[10px] font-semibold text-emerald-600">Verified Buyer</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
