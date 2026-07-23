// Firebase Cloud Functions Entry Point for cocok.in
import { generateProductRecommendations } from './ai/recommendation.js';
import { moderateProductContent } from './ai/moderation.js';
import { detectFraudulentTransactions } from './ai/fraud_detection.js';

// Middleware for Admin validation
export function validateAdmin(authContext: any) {
  if (!authContext || (!authContext.token?.admin && !authContext.roles?.includes('admin'))) {
    throw new Error('UNAUTHORIZED_ADMIN_ACCESS: Hanya user dengan role admin yang diizinkan');
  }
}

// Callable Function: processPayment
export async function processPayment(data: { orderId: string; amount: number; userId: string }, userWallet: number) {
  if (userWallet < data.amount) {
    return { success: false, message: 'Saldo Wallet tidak mencukupi' };
  }
  const newBalance = userWallet - data.amount;
  return {
    success: true,
    message: 'Pembayaran berhasil ditahan di Escrow Rekening Bersama cocok.in',
    orderId: data.orderId,
    amountPaid: data.amount,
    newWalletBalance: newBalance,
    status: 'paid',
  };
}

// Callable Function: releasePayment
export async function releasePayment(data: { orderId: string; subtotal: number; platformFee: number }) {
  const sellerEarnings = data.subtotal - data.platformFee;
  return {
    success: true,
    message: `Saldo Rp ${sellerEarnings.toLocaleString('id-ID')} berhasil dicairkan ke Wallet Penjual (Komisi Platform: Rp ${data.platformFee.toLocaleString('id-ID')})`,
    orderId: data.orderId,
    sellerEarned: sellerEarnings,
    status: 'completed',
  };
}

// Callable Function: assignCourier
export async function assignCourier(data: { orderId: string; latitude: number; longitude: number }) {
  return {
    success: true,
    message: 'Kurir terdekat berhasil ditugaskan ke pesanan',
    orderId: data.orderId,
    assignedCourierId: 'courier_express_01',
    courierName: 'Budi Santoso (Honda Vario - B 4821 KIN)',
    status: 'shipping',
  };
}

// ADMIN Callable Function: adminApproveProduct
export async function adminApproveProduct(data: { productId: string }, authContext: any) {
  validateAdmin(authContext);
  return {
    success: true,
    message: `Produk ${data.productId} berhasil disetujui & tampil di katalog marketplace`,
    productId: data.productId,
    isApproved: true,
  };
}

// ADMIN Callable Function: adminBanUser
export async function adminBanUser(data: { uid: string; reason?: string }, authContext: any) {
  validateAdmin(authContext);
  return {
    success: true,
    message: `User ${data.uid} telah dinonaktifkan (suspended) oleh Admin`,
    uid: data.uid,
    status: 'suspended',
  };
}

// ADMIN Callable Function: adminResolveDispute
export async function adminResolveDispute(data: { disputeId: string; decision: 'refund' | 'rejected'; replyMessage: string }, authContext: any) {
  validateAdmin(authContext);
  return {
    success: true,
    message: data.decision === 'refund' 
      ? `Komplain ${data.disputeId} disetujui: Dana dikembalikan ke Wallet Pembeli` 
      : `Komplain ${data.disputeId} ditolak: Dana diserahkan ke Penjual`,
    disputeId: data.disputeId,
    status: data.decision === 'refund' ? 'refunded' : 'rejected',
    adminReply: data.replyMessage,
  };
}

export { generateProductRecommendations, moderateProductContent, detectFraudulentTransactions };
