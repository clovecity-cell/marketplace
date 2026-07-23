import React, { useState, useEffect } from 'react';
import { initialUsers, initialProducts, initialOrders, initialDisputes, initialTransactions, initialSettings } from './data/mockData';
import { User, Product, CartItem, Order, Dispute, Transaction, PlatformSettings, UserRole } from './types';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminDisputes } from './components/admin/AdminDisputes';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminLogin } from './components/admin/AdminLogin';

import { MobileShell } from './components/mobile/MobileShell';
import { HomeScreen } from './components/mobile/HomeScreen';
import { SearchScreen } from './components/mobile/SearchScreen';
import { CartScreen } from './components/mobile/CartScreen';
import { CheckoutScreen } from './components/mobile/CheckoutScreen';
import { WishlistScreen } from './components/mobile/WishlistScreen';
import { ProfileScreen } from './components/mobile/ProfileScreen';
import { WalletScreen } from './components/mobile/WalletScreen';
import { SellerDashboard } from './components/mobile/SellerDashboard';
import { CourierDashboard } from './components/mobile/CourierDashboard';

import { Smartphone, Monitor, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  // App View Mode: 'mobile' or 'admin'
  const [viewMode, setViewMode] = useState<'mobile' | 'admin'>('mobile');

  // Active Role in Mobile App
  const [currentRole, setCurrentRole] = useState<UserRole>('buyer');

  // Shared Core State
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [disputes, setDisputes] = useState<Dispute[]>(initialDisputes);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [settings, setSettings] = useState<PlatformSettings>(initialSettings);

  // Mobile App State
  const [mobileTab, setMobileTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: initialProducts[0],
      quantity: 2,
      selectedVariant: 'Normal',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod_01', 'prod_03']);
  const [isCheckoutView, setIsCheckoutView] = useState<boolean>(false);
  const [isWalletView, setIsWalletView] = useState<boolean>(false);
  const [isSellerView, setIsSellerView] = useState<boolean>(false);
  const [isCourierView, setIsCourierView] = useState<boolean>(false);

  // Admin Web State
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true);
  const [adminAccessDeniedMsg, setAdminAccessDeniedMsg] = useState<string>('');

  // Active user object based on role
  const currentUser = users.find((u) => u.roles.includes(currentRole)) || users[0];

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.productId === product.productId);
      if (existing) {
        return prev.map((item) =>
          item.product.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedVariant: product.variants[0] || 'Normal' }];
    });
  };

  const handleUpdateQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.product.productId !== productId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.product.productId === productId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.productId)
        ? prev.filter((id) => id !== product.productId)
        : [...prev, product.productId]
    );
  };

  // Payment Handler
  const handlePaySuccess = (orderId: string, grandTotal: number) => {
    // 1. Deduct Buyer Wallet
    setUsers((prev) =>
      prev.map((u) => (u.uid === currentUser.uid ? { ...u, walletBalance: u.walletBalance - grandTotal } : u))
    );

    // 2. Add Order to Orders List
    const newOrder: Order = {
      orderId,
      buyerId: currentUser.uid,
      buyerName: currentUser.name,
      sellerId: cart[0]?.product.sellerId || 'usr_seller_01',
      sellerName: cart[0]?.product.sellerName || 'Toko Berkah Utama',
      items: cart.map((c) => ({
        productId: c.product.productId,
        productName: c.product.name,
        variant: c.selectedVariant,
        quantity: c.quantity,
        price: c.product.price,
        image: c.product.images[0],
      })),
      subtotal: cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
      shippingCost: settings.baseShippingFee,
      platformFee: Math.round((cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0) * settings.platformFeePercentage) / 100),
      grandTotal,
      status: 'paid',
      trackingHistory: [
        { status: 'Order Placed', description: 'Pesanan berhasil dibuat', timestamp: new Date().toLocaleString() },
        { status: 'Paid', description: 'Pembayaran ditahan di Escrow Rekening Bersama cocok.in', timestamp: new Date().toLocaleString() },
      ],
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // 3. Log Wallet Transaction
    const newTx: Transaction = {
      transactionId: `TX-${Date.now().toString().slice(-4)}`,
      userId: currentUser.uid,
      userName: currentUser.name,
      type: 'payment',
      amount: grandTotal,
      balanceBefore: currentUser.walletBalance,
      balanceAfter: currentUser.walletBalance - grandTotal,
      timestamp: new Date().toLocaleString('id-ID'),
      description: `Pembayaran Pesanan #${orderId}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Clear Cart & Navigate Back to Orders
    setCart([]);
    setIsCheckoutView(false);
    setMobileTab('profile');
    alert(`Pembayaran Rp ${grandTotal.toLocaleString('id-ID')} Berhasil! Saldo ditahan di Escrow cocok.in.`);
  };

  // Top Up Wallet Handler
  const handleTopUp = (amount: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.uid === currentUser.uid ? { ...u, walletBalance: u.walletBalance + amount } : u))
    );
    const newTx: Transaction = {
      transactionId: `TX-${Date.now().toString().slice(-4)}`,
      userId: currentUser.uid,
      userName: currentUser.name,
      type: 'topup',
      amount,
      balanceBefore: currentUser.walletBalance,
      balanceAfter: currentUser.walletBalance + amount,
      timestamp: new Date().toLocaleString('id-ID'),
      description: 'Top Up Saldo via Bank Transfer BCA',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Admin Actions
  const handleApproveProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.productId === productId ? { ...p, isApproved: true } : p))
    );
  };

  const handleRejectProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.productId !== productId));
  };

  const handleBanUser = (uid: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.uid === uid ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
      )
    );
  };

  const handleVerifyUser = (uid: string) => {
    setUsers((prev) => prev.map((u) => (u.uid === uid ? { ...u, isVerified: true } : u)));
  };

  const handleResolveDispute = (disputeId: string, decision: 'refund' | 'rejected', replyMessage: string) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.disputeId === disputeId
          ? {
              ...d,
              status: decision === 'refund' ? 'refunded' : 'rejected',
              adminResponse: replyMessage,
            }
          : d
      )
    );
  };

  const handleAddProduct = (newProd: Partial<Product>) => {
    const created: Product = {
      productId: `prod_${Date.now()}`,
      sellerId: currentUser.uid,
      sellerName: currentUser.name,
      name: newProd.name || 'Produk Baru',
      description: newProd.description || 'Deskripsi produk',
      price: newProd.price || 50000,
      stock: newProd.stock || 20,
      variants: newProd.variants || ['Normal'],
      images: newProd.images || ['https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'],
      category: newProd.category || 'Kuliner & Makanan',
      isApproved: false,
      rating: 0,
      moderationScore: 10,
    };
    setProducts((prev) => [created, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'processing' | 'shipping' | 'completed') => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Global Top Platform Switcher Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
            c
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
              <span>cocok.in Monorepo Workspace</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Firebase & Gemini Integrated
              </span>
            </h1>
          </div>
        </div>

        {/* View Switcher: Mobile App vs Admin Web */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setViewMode('mobile');
              setAdminAccessDeniedMsg('');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>📱 Mobile App (/mobile_app)</span>
          </button>

          <button
            onClick={() => setViewMode('admin')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'admin'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>💻 Admin Web (/admin_web)</span>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1">
        {viewMode === 'mobile' ? (
          <MobileShell
            currentRole={currentRole}
            onChangeRole={(role) => {
              setCurrentRole(role);
              setIsSellerView(false);
              setIsCourierView(false);
              setIsCheckoutView(false);
              setIsWalletView(false);
            }}
            activeTab={mobileTab}
            setActiveTab={(tab) => {
              setMobileTab(tab);
              setIsCheckoutView(false);
              setIsWalletView(false);
              setIsSellerView(false);
              setIsCourierView(false);
            }}
            cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
          >
            {isCheckoutView ? (
              <CheckoutScreen
                cart={cart}
                user={currentUser}
                settings={settings}
                onBack={() => setIsCheckoutView(false)}
                onPaySuccess={handlePaySuccess}
              />
            ) : isWalletView ? (
              <WalletScreen
                user={currentUser}
                transactions={transactions.filter((t) => t.userId === currentUser.uid)}
                onTopUp={handleTopUp}
                onBack={() => setIsWalletView(false)}
              />
            ) : isSellerView ? (
              <SellerDashboard
                sellerProducts={products.filter((p) => p.sellerId === currentUser.uid)}
                sellerOrders={orders.filter((o) => o.sellerId === currentUser.uid)}
                onAddProduct={handleAddProduct}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onBack={() => setIsSellerView(false)}
              />
            ) : isCourierView ? (
              <CourierDashboard onBack={() => setIsCourierView(false)} />
            ) : (
              <>
                {mobileTab === 'home' && (
                  <HomeScreen
                    products={products}
                    aiRecommendations={products.filter((p) => p.isApproved).slice(0, 3)}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    wishlistIds={wishlistIds}
                  />
                )}
                {mobileTab === 'search' && (
                  <SearchScreen products={products} onAddToCart={handleAddToCart} />
                )}
                {mobileTab === 'cart' && (
                  <CartScreen
                    cart={cart}
                    onUpdateQty={handleUpdateQty}
                    onProceedToCheckout={() => setIsCheckoutView(true)}
                  />
                )}
                {mobileTab === 'wishlist' && (
                  <WishlistScreen
                    wishlistProducts={products.filter((p) => wishlistIds.includes(p.productId))}
                    onAddToCart={handleAddToCart}
                    onRemoveWishlist={handleToggleWishlist}
                  />
                )}
                {mobileTab === 'profile' && (
                  <ProfileScreen
                    user={currentUser}
                    onOpenWallet={() => setIsWalletView(true)}
                    onOpenSeller={() => setIsSellerView(true)}
                    onOpenCourier={() => setIsCourierView(true)}
                    onOpenOrders={() => setMobileTab('home')}
                    onLogout={() => alert('Logout berhasil')}
                  />
                )}
              </>
            )}
          </MobileShell>
        ) : (
          /* Admin Web View */
          <div>
            {!isAdminLoggedIn ? (
              <AdminLogin
                onSuccess={() => {
                  setIsAdminLoggedIn(true);
                  setAdminAccessDeniedMsg('');
                }}
                onDenyAccess={(reason) => setAdminAccessDeniedMsg(reason)}
              />
            ) : adminAccessDeniedMsg ? (
              <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
                <div className="max-w-md bg-slate-900 border border-red-500/30 p-6 rounded-2xl text-center space-y-4">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Akses Ditolak</h3>
                  <p className="text-xs text-red-400">{adminAccessDeniedMsg}</p>
                  <button
                    onClick={() => setAdminAccessDeniedMsg('')}
                    className="px-4 py-2 bg-slate-800 text-slate-200 text-xs rounded-lg hover:bg-slate-700"
                  >
                    Coba Login Ulang
                  </button>
                </div>
              </div>
            ) : (
              <AdminLayout
                activeTab={adminTab}
                setActiveTab={setAdminTab}
                onLogout={() => setIsAdminLoggedIn(false)}
                adminEmail="admin@cocok.in"
              >
                {adminTab === 'dashboard' && <AdminDashboard orders={orders} users={users} />}
                {adminTab === 'users' && (
                  <AdminUsers users={users} onBanUser={handleBanUser} onVerifyUser={handleVerifyUser} />
                )}
                {adminTab === 'products' && (
                  <AdminProducts
                    products={products}
                    onApproveProduct={handleApproveProduct}
                    onRejectProduct={handleRejectProduct}
                  />
                )}
                {adminTab === 'orders' && <AdminDashboard orders={orders} users={users} />}
                {adminTab === 'couriers' && (
                  <AdminUsers
                    users={users.filter((u) => u.roles.includes('courier'))}
                    onBanUser={handleBanUser}
                    onVerifyUser={handleVerifyUser}
                  />
                )}
                {adminTab === 'disputes' && (
                  <AdminDisputes disputes={disputes} onResolveDispute={handleResolveDispute} />
                )}
                {adminTab === 'settings' && (
                  <AdminSettings settings={settings} onUpdateSettings={setSettings} />
                )}
              </AdminLayout>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
