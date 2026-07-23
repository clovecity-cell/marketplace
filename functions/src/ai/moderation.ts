// AI Moderation Module using Gemini
import { ai, getGeminiModel } from './gemini_client.js';

export async function moderateProductContent(productData: {
  productId: string;
  name: string;
  description: string;
  price: number;
  sellerId: string;
}) {
  try {
    const prompt = `Anda adalah AI Content Moderator untuk cocok.in e-commerce platform.
Analisislah produk baru ini untuk mendeteksi barang ilegal, judi, pornografi, penipuan, atau pelanggaran kebijakan:

Nama Produk: "${productData.name}"
Deskripsi: "${productData.description}"
Harga: Rp ${productData.price}

Tugas:
1. Berikan skor risiko (0 - 100). Dimana >80 berarti SANGAT BERBAHAYA / DILARANG.
2. Berikan alasan analisis singkat.

Kembalikan HANYA JSON valid:
{"riskScore": 15, "reason": "Produk pakaian wajar dan aman", "isFlagged": false}`;

    const response = await ai.models.generateContent({
      model: getGeminiModel(),
      contents: prompt,
    });

    const text = response.text || '';
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanText);

    const isAutoRejected = (result.riskScore ?? 0) > 80;

    return {
      productId: productData.productId,
      riskScore: result.riskScore ?? 0,
      reason: result.reason ?? 'Pemeriksaan standar selesai',
      isApproved: !isAutoRejected,
      actionTaken: isAutoRejected ? 'AUTO_REJECTED' : 'PENDING_ADMIN_APPROVAL',
      sellerNotificationSent: isAutoRejected,
    };
  } catch (error) {
    console.error('Gemini Moderation Error:', error);
    return {
      productId: productData.productId,
      riskScore: 0,
      reason: 'Pemeriksaan otomatis tertunda',
      isApproved: false,
      actionTaken: 'PENDING_ADMIN_APPROVAL',
      sellerNotificationSent: false,
    };
  }
}
