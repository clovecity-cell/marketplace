export type UserRole = 'buyer' | 'seller' | 'courier' | 'admin';

export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  roles: UserRole[];
  walletBalance: number;
  address: string;
  isVerified: boolean;
  ktpImageUrl?: string;
  status: 'active' | 'suspended';
  avatarUrl?: string;
}

export interface Product {
  productId: string;
  sellerId: string;
  sellerName: string;
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
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: string;
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

export interface Order {
  orderId: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  platformFee: number;
  grandTotal: number;
  status: 'pending' | 'paid' | 'processing' | 'shipping' | 'delivered' | 'completed' | 'cancelled';
  courierId?: string;
  courierName?: string;
  courierType?: 'platform' | 'personal_seller';
  deliveryProofImage?: string;
  trackingHistory: TrackingStep[];
  createdAt: string;
}

export interface Transaction {
  transactionId: string;
  userId: string;
  userName?: string;
  type: 'topup' | 'payment' | 'payout' | 'refund';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  timestamp: string;
  description: string;
}

export interface CourierTask {
  courierId: string;
  orderId: string;
  distanceKm: number;
  pickupAddress: string;
  deliveryAddress: string;
  itemsCount: number;
  shippingFeeEarned: number;
  status: 'available' | 'picked_up' | 'delivering' | 'delivered';
}

export interface Dispute {
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

export interface PlatformSettings {
  platformFeePercentage: number; // e.g. 5%
  minWithdrawAmount: number; // e.g. Rp 50.000
  baseShippingFee: number; // e.g. Rp 10.000
}
