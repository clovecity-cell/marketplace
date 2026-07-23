// AI Recommendation Module using Gemini
import { ai, getGeminiModel } from './gemini_client.js';

export async function generateProductRecommendations(userId: string, purchaseHistory: any[], availableProducts: any[]) {
  try {
    const prompt = `Anda adalah AI Recommender untuk cocok.in marketplace.
Riwayat Pembelian User (${userId}):
${JSON.stringify(purchaseHistory, null, 2)}

Daftar Produk Tersedia:
${JSON.stringify(availableProducts.map(p => ({ id: p.productId, name: p.name, category: p.category, price: p.price })), null, 2)}

Berdasarkan riwayat di atas, pilih hingga 6 ID produk terbaik yang paling cocok untuk user ini.
Kembalikan HANYA format JSON valid tanpa markdown, contoh: {"recommendedProductIds": ["prod_1", "prod_2", "prod_3"]}`;

    const response = await ai.models.generateContent({
      model: getGeminiModel(),
      contents: prompt,
    });

    const text = response.text || '';
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanText);

    return {
      userId,
      recommendedProductIds: result.recommendedProductIds || [],
      cachedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 Hours Cache
    };
  } catch (error) {
    console.error('Gemini Recommendation Error:', error);
    // Fallback product recommendations if error
    return {
      userId,
      recommendedProductIds: availableProducts.slice(0, 4).map(p => p.productId),
      cachedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    };
  }
}
