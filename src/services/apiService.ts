const getJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    return { ok: false, fallback: true } as T;
  }
};

export const apiService = {
  async healthCheck() {
    return getJson<{ ok: boolean; service?: string; mode?: string; fallback?: boolean }>('/api/health');
  },

  async getProducts() {
    return getJson<any[]>('/api/products');
  },

  async getOrders() {
    return getJson<any[]>('/api/orders');
  },

  async createSession(email: string, role: string) {
    return getJson<{ ok: boolean; email?: string; role?: string; sessionId?: string; fallback?: boolean }>('/api/auth/session', {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    });
  },

  async processPayment(orderId: string, amount: number, userWallet: number) {
    return getJson<{ success: boolean; message?: string; orderId?: string; amountPaid?: number; newWalletBalance?: number; provider?: string; fallback?: boolean }>('/api/payment/process', {
      method: 'POST',
      body: JSON.stringify({ orderId, amount, userWallet }),
    });
  },
};
