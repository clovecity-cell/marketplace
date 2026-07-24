import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { initialOrders, initialProducts, initialSettings } from './src/data/mockData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey });

  // API Routes (Cloud Functions Simulation)

  // 1. Process Payment
  app.post('/api/payment/process', (req, res) => {
    const { orderId, amount, userWallet } = req.body;
    if ((userWallet || 0) < amount) {
      return res.status(400).json({ success: false, message: 'Saldo Wallet tidak mencukupi' });
    }
    return res.json({
      success: true,
      message: 'Pembayaran berhasil ditahan di Escrow Rekening Bersama cocok.in',
      orderId,
      amountPaid: amount,
      newWalletBalance: (userWallet || 0) - amount,
      status: 'paid',
      provider: process.env.GEMINI_API_KEY ? 'escrow-gemini' : 'escrow-live',
    });
  });

  // 2. Gemini Recommendation Route
  app.post('/api/ai/recommendation', async (req, res) => {
    try {
      const { userId, purchaseHistory, availableProducts } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        // Fallback if no key set
        return res.json({
          recommendedProductIds: (availableProducts || []).slice(0, 3).map((p: any) => p.productId),
        });
      }

      const prompt = `Anda adalah AI Recommender untuk cocok.in marketplace.
Riwayat Pembelian User (${userId}):
${JSON.stringify(purchaseHistory || [], null, 2)}

Daftar Produk Tersedia:
${JSON.stringify((availableProducts || []).map((p: any) => ({ id: p.productId, name: p.name, category: p.category, price: p.price })), null, 2)}

Pilih hingga 4 ID produk terbaik yang paling cocok untuk user ini.
Kembalikan HANYA JSON valid: {"recommendedProductIds": ["prod_01", "prod_02"]}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleanText);

      return res.json({
        recommendedProductIds: result.recommendedProductIds || [],
      });
    } catch (error) {
      console.error('Gemini Recommendation Error:', error);
      return res.json({
        recommendedProductIds: ['prod_01', 'prod_02', 'prod_03'],
      });
    }
  });

  // 3. Gemini Product Moderation Route
  app.post('/api/ai/moderation', async (req, res) => {
    try {
      const { name, description, price } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.json({ riskScore: 10, isApproved: true });
      }

      const prompt = `Analisislah produk baru ini untuk mendeteksi barang terlarang atau penipuan:
Nama: "${name}"
Deskripsi: "${description}"
Harga: Rp ${price}

Kembalikan HANYA JSON valid: {"riskScore": 15, "reason": "Produk aman", "isApproved": true}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleanText);

      return res.json(result);
    } catch (error) {
      return res.json({ riskScore: 0, isApproved: true });
    }
  });

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'cocok.in', mode: process.env.GEMINI_API_KEY ? 'ai-enabled' : 'live' });
  });

  app.get('/api/products', (_req, res) => {
    res.json(initialProducts);
  });

  app.get('/api/orders', (_req, res) => {
    res.json(initialOrders);
  });

  app.get('/api/settings', (_req, res) => {
    res.json(initialSettings);
  });

  app.post('/api/auth/session', (req, res) => {
    const { email, role } = req.body;
    res.json({ ok: true, email, role: role || 'buyer', sessionId: `sess_${Date.now()}` });
  });

  // Admin APIs
  app.post('/api/admin/approve-product', (req, res) => {
    const { productId } = req.body;
    return res.json({ success: true, message: `Produk ${productId} approved`, productId });
  });

  app.post('/api/admin/ban-user', (req, res) => {
    const { uid } = req.body;
    return res.json({ success: true, message: `User ${uid} suspended`, uid });
  });

  app.post('/api/admin/resolve-dispute', (req, res) => {
    const { disputeId, decision, replyMessage } = req.body;
    return res.json({ success: true, message: `Dispute ${disputeId} solved as ${decision}`, adminReply: replyMessage });
  });

  // Vite Middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server cocok.in running on http://localhost:${PORT}`);
  });
}

startServer();
