import { useState, useEffect, useCallback } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/stores/useStore';
import { useAuth } from './useAuth';
import type { Product } from '@/types';

export function useWishlist() {
  const [items, setItems] = useState<Product[]>([]);
  const { localWishlist, toggleLocalWishlist, isInLocalWishlist, showToast, language } = useStore();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn && user) {
      const stored = localStorage.getItem(`wishlist_${user.id}`);
      if (stored) {
        try {
          const ids: string[] = JSON.parse(stored);
          const prods = ids.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
          setItems(prods);
        } catch { /* ignore */ }
      } else {
        // Migrate from local wishlist
        const prods = localWishlist.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
        setItems(prods);
      }
    } else {
      const prods = localWishlist.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
      setItems(prods);
    }
  }, [isLoggedIn, user, localWishlist]);

  const persist = useCallback((productIds: string[]) => {
    if (isLoggedIn && user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(productIds));
    }
  }, [isLoggedIn, user]);

  const toggle = useCallback((productId: string) => {
    const isAdded = items.some(p => p.id === productId);
    if (isLoggedIn && user) {
      if (isAdded) {
        const newItems = items.filter(p => p.id !== productId);
        setItems(newItems);
        persist(newItems.map(p => p.id));
        showToast(language === 'id' ? 'Dihapus dari wishlist' : 'Removed from wishlist');
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          const newItems = [...items, product];
          setItems(newItems);
          persist(newItems.map(p => p.id));
          showToast(language === 'id' ? 'Ditambahkan ke wishlist' : 'Added to wishlist');
        }
      }
    } else {
      toggleLocalWishlist(productId);
      const wasInList = isInLocalWishlist(productId);
      showToast(
        wasInList
          ? (language === 'id' ? 'Dihapus dari wishlist' : 'Removed from wishlist')
          : (language === 'id' ? 'Ditambahkan ke wishlist' : 'Added to wishlist')
      );
    }
  }, [isLoggedIn, user, items, toggleLocalWishlist, isInLocalWishlist, showToast, language, persist]);

  const isInWishlist = useCallback((productId: string) => {
    return items.some(p => p.id === productId);
  }, [items]);

  return { items, toggle, isInWishlist };
}
