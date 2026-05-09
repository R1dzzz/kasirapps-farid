import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import type { Transaction, ShippingInfo } from '@/types';

function generateOrderNumber(): string {
  const prefix = 'KSA';
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user, isLoggedIn } = useAuth();

  // Load transactions from localStorage
  useEffect(() => {
    if (isLoggedIn && user) {
      const stored = localStorage.getItem(`transactions_${user.id}`);
      if (stored) {
        try {
          setTransactions(JSON.parse(stored));
        } catch { /* ignore */ }
      }
    } else {
      const stored = localStorage.getItem('transactions_guest');
      if (stored) {
        try {
          setTransactions(JSON.parse(stored));
        } catch { /* ignore */ }
      }
    }
  }, [isLoggedIn, user]);

  const persist = useCallback((txs: Transaction[]) => {
    if (isLoggedIn && user) {
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(txs));
    } else {
      localStorage.setItem('transactions_guest', JSON.stringify(txs));
    }
  }, [isLoggedIn, user]);

  const createTransaction = useCallback(({
    items,
    total_amount,
    shipping_info,
    payment_method,
  }: {
    items: Transaction['items'];
    total_amount: number;
    shipping_info: ShippingInfo;
    payment_method: Transaction['payment_method'];
  }) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      user_id: user?.id || 'guest',
      order_number: generateOrderNumber(),
      items,
      total_amount,
      shipping_info,
      payment_method,
      status: 'processing',
      created_at: new Date().toISOString(),
    };

    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    persist(updated);
    return newTransaction;
  }, [transactions, persist, user]);

  const getById = useCallback((id: string) => {
    return transactions.find(t => t.id === id);
  }, [transactions]);

  return { transactions, createTransaction, getById };
}
