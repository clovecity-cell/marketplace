// Shared TypeScript Types for admin_web (matching Dart models)

export type UserRole = 'buyer' | 'seller' | 'courier' | 'admin';

export interface UserModel {
  uid: string;
  name: string;
  email: string;
  phone: string;
  roles: UserRole[];
  walletBalance: number;
  address: string;
  isVerified: boolean;
  ktpImageUrl?: string;
  status?: 'active' | 'suspended' | 'banned';
  createdAt?: string;
}

export interface ProductModel {
  productId: string;
  sellerId: string;
  sellerName?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  variants: string[];
  images: string[];
  category: string;
  isApproved: boolean;
  rating: number;
  moderationScore?: number;
  createdAt?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
}

export interface TrackingStep {
  status: string;
  description: string;
  timestamp: string;
}

export interface OrderModel {
  orderId: string;
  buyerId: string;
  buyerName?: string;
  sellerId: string;
  sellerName?: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  platformFee: number;
  grandTotal: number;
  status: 'pending' | 'paid' | 'processing' | 'shipping' | 'delivered' | 'completed' | 'cancelled';
  courierId?: string;
  courierName?: string;
  trackingHistory: TrackingStep[];
  createdAt?: string;
}

export interface TransactionModel {
  transactionId: string;
  userId: string;
  userName?: string;
  type: 'topup' | 'payment' | 'payout' | 'refund';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  timestamp: string;
}

export interface CourierModel {
  courierId: string;
  userId: string;
  userName?: string;
  vehicleType: 'motorcycle' | 'car' | 'van';
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  isActive: boolean;
  rating?: number;
  completedDeliveries?: number;
}

export interface DisputeModel {
  disputeId: string;
  orderId: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  reason: string;
  description: string;
  evidenceImages: string[];
  status: 'open' | 'under_review' | 'refunded' | 'rejected';
  adminResponse?: string;
  createdAt: string;
}

export interface PlatformSettingsModel {
  platformFeePercentage: number;
  minWithdrawAmount: number;
  baseShippingFee: number;
  updatedAt: string;
  updatedBy: string;
}
