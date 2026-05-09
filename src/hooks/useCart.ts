import { useState, useEffect, useCallback } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/stores/useStore';
import { useAuth } from './useAuth';
interface CartItemWithProduct {
  id: string;
  product_id: string;
  quantity: number;
  name: string;
  price: number;
  slug: string;
  category_id: string;
  stock: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const { localCart, addToLocalCart, removeFromLocalCart, updateLocalCartQuantity, clearLocalCart, showToast, language } = useStore();
  const { user, isLoggedIn } = useAuth();

  // Load cart items
  useEffect(() => {
    if (isLoggedIn && user) {
      // For demo, use localStorage as "server" cart for logged-in users
      const stored = localStorage.getItem(`cart_${user.id}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const withProducts = parsed.map((item: { product_id: string; quantity: number }) => {
            const product = products.find(p => p.id === item.product_id);
            return {
              id: item.product_id,
              product_id: item.product_id,
              quantity: item.quantity,
              name: product?.name || '',
              price: product?.price || 0,
              slug: product?.slug || '',
              category_id: product?.category_id || '',
              stock: product?.stock || 0,
            };
          }).filter((item: CartItemWithProduct) => item.name);
          setItems(withProducts);
        } catch { /* ignore */ }
      }
    } else {
      const withProducts = localCart.map(item => {
        const product = products.find(p => p.id === item.product_id);
        return {
          id: item.product_id,
          product_id: item.product_id,
          quantity: item.quantity,
          name: product?.name || '',
          price: product?.price || 0,
          slug: product?.slug || '',
          category_id: product?.category_id || '',
          stock: product?.stock || 0,
        };
      }).filter(item => item.name);
      setItems(withProducts);
    }
  }, [isLoggedIn, user, localCart]);

  // Persist cart when it changes
  useEffect(() => {
    if (isLoggedIn && user && items.length > 0) {
      const toStore = items.map(item => ({ product_id: item.product_id, quantity: item.quantity }));
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(toStore));
    }
  }, [items, isLoggedIn, user]);

  const add = useCallback((productId: string, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (isLoggedIn && user) {
      const existing = items.find(item => item.product_id === productId);
      let newItems;
      if (existing) {
        newItems = items.map(item =>
          item.product_id === productId
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      } else {
        newItems = [...items, {
          id: productId,
          product_id: productId,
          quantity,
          name: product.name,
          price: product.price,
          slug: product.slug,
          category_id: product.category_id,
          stock: product.stock,
        }];
      }
      setItems(newItems);
      const toStore = newItems.map(item => ({ product_id: item.product_id, quantity: item.quantity }));
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(toStore));
    } else {
      addToLocalCart(productId, quantity);
    }
    showToast(language === 'id' ? 'Ditambahkan ke keranjang' : 'Added to cart');
  }, [isLoggedIn, user, items, addToLocalCart, showToast, language]);

  const remove = useCallback((productId: string) => {
    if (isLoggedIn && user) {
      const newItems = items.filter(item => item.product_id !== productId);
      setItems(newItems);
      const toStore = newItems.map(item => ({ product_id: item.product_id, quantity: item.quantity }));
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(toStore));
    } else {
      removeFromLocalCart(productId);
    }
    showToast(language === 'id' ? 'Dihapus dari keranjang' : 'Removed from cart');
  }, [isLoggedIn, user, items, removeFromLocalCart, showToast, language]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      remove(productId);
      return;
    }
    if (isLoggedIn && user) {
      const newItems = items.map(item =>
        item.product_id === productId ? { ...item, quantity: Math.min(quantity, item.stock) } : item
      );
      setItems(newItems);
      const toStore = newItems.map(item => ({ product_id: item.product_id, quantity: item.quantity }));
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(toStore));
    } else {
      updateLocalCartQuantity(productId, quantity);
    }
  }, [isLoggedIn, user, items, remove, updateLocalCartQuantity]);

  const clear = useCallback(() => {
    if (isLoggedIn && user) {
      localStorage.removeItem(`cart_${user.id}`);
    }
    clearLocalCart();
    setItems([]);
  }, [isLoggedIn, user, clearLocalCart]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, add, remove, updateQuantity, clear, totalItems, totalPrice };
}
