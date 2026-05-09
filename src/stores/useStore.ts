import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, Theme } from '@/types';

interface AppState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // Language
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // Cart (local for guests)
  localCart: { product_id: string; quantity: number }[];
  addToLocalCart: (productId: string, quantity?: number) => void;
  removeFromLocalCart: (productId: string) => void;
  updateLocalCartQuantity: (productId: string, quantity: number) => void;
  clearLocalCart: () => void;

  // Wishlist (local for guests)
  localWishlist: string[];
  toggleLocalWishlist: (productId: string) => void;
  isInLocalWishlist: (productId: string) => boolean;

  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;

  // Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

import { translations } from '@/data/translations';

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },

      // Language
      language: 'id',
      toggleLanguage: () => {
        const newLang = get().language === 'id' ? 'en' : 'id';
        set({ language: newLang });
      },
      setLanguage: (language) => set({ language }),
      t: (key: string) => {
        const lang = get().language;
        return (translations as Record<string, Record<string, string>>)[lang]?.[key] ?? key;
      },

      // Cart
      localCart: [],
      addToLocalCart: (productId, quantity = 1) => {
        set((state) => {
          const existing = state.localCart.find((item) => item.product_id === productId);
          if (existing) {
            return {
              localCart: state.localCart.map((item) =>
                item.product_id === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { localCart: [...state.localCart, { product_id: productId, quantity }] };
        });
      },
      removeFromLocalCart: (productId) => {
        set((state) => ({
          localCart: state.localCart.filter((item) => item.product_id !== productId),
        }));
      },
      updateLocalCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromLocalCart(productId);
          return;
        }
        set((state) => ({
          localCart: state.localCart.map((item) =>
            item.product_id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearLocalCart: () => set({ localCart: [] }),

      // Wishlist
      localWishlist: [],
      toggleLocalWishlist: (productId) => {
        set((state) => {
          const exists = state.localWishlist.includes(productId);
          if (exists) {
            return { localWishlist: state.localWishlist.filter((id) => id !== productId) };
          }
          return { localWishlist: [...state.localWishlist, productId] };
        });
      },
      isInLocalWishlist: (productId) => get().localWishlist.includes(productId),

      // Toast
      toast: null,
      showToast: (message, type = 'success') => {
        set({ toast: { message, type } });
        setTimeout(() => set({ toast: null }), 3000);
      },
      clearToast: () => set({ toast: null }),

      // Search
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
    }),
    {
      name: 'kasirapps-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        localCart: state.localCart,
        localWishlist: state.localWishlist,
      }),
    }
  )
);
