import { User, Product, Order, Dispute, Transaction, PlatformSettings } from '../types';

export interface PersistedMarketplaceState {
  users: User[];
  products: Product[];
  orders: Order[];
  disputes: Dispute[];
  transactions: Transaction[];
  settings: PlatformSettings;
}

const STORAGE_KEY = 'cocok-marketplace-state';

export const marketplaceDataService = {
  load(): PersistedMarketplaceState | null {
    if (typeof window === 'undefined') return null;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PersistedMarketplaceState) : null;
    } catch {
      return null;
    }
  },

  save(state: PersistedMarketplaceState) {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore persistence failures so the app still works offline.
    }
  },

  clear() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
  },

  async syncToRemote(_state: PersistedMarketplaceState) {
    return Promise.resolve({ ok: true, mode: 'local-preview' });
  },
};
