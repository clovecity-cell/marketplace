// AI Fraud Detection Module (Hourly Cron Task)
import { ai, getGeminiModel } from './gemini_client.js';

export async function detectFraudulentTransactions(recentTransactions: any[]) {
  try {
    const prompt = `Anda adalah AI Fraud Detection Engine untuk cocok.in payment platform.
Analisislah daftar transaksi terbaru berikut untuk mendeteksi indikasi fraud/mencurigakan (seperti perubahan alamat mendadak, nominal sangat besar dari user baru, multiple failed payments):

${JSON.stringify(recentTransactions, null, 2)}

Identifikasi transaksi mana yang mencurigakan dan berikan alert_level ("HIGH", "MEDIUM", "LOW").

Kembalikan HANYA JSON valid:
{
  "alerts": [
    {
      "transactionId": "tx_123",
      "userId": "usr_456",
      "alertLevel": "HIGH",
      "reason": "Nominal transaksi Rp 25.000.000 dari user baru terdaftar 1 jam lalu",
      "recommendedAction": "Hold settlement & minta verifikasi KTP"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: getGeminiModel(),
      contents: prompt,
    });

    const text = response.text || '';
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanText);

    return {
      scannedCount: recentTransactions.length,
      alerts: result.alerts || [],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Gemini Fraud Detection Error:', error);
    return {
      scannedCount: recentTransactions.length,
      alerts: [],
      timestamp: new Date().toISOString(),
    };
  }
}
