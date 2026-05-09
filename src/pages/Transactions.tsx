import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useTransactions } from '@/hooks/useTransactions';
import type { Transaction } from '@/types';

export default function Transactions() {
  const { t, language } = useStore();
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState<Transaction['status'] | 'all'>('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const statusConfig: Record<string, { icon: React.ElementType; label: string; className: string }> = {
    processing: { icon: Clock, label: language === 'id' ? 'Diproses' : 'Processing', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    completed: { icon: CheckCircle, label: language === 'id' ? 'Selesai' : 'Completed', className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    cancelled: { icon: XCircle, label: language === 'id' ? 'Dibatalkan' : 'Cancelled', className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
  };

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.status === filter);

  const tabs: { key: Transaction['status'] | 'all'; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'processing', label: t('processing') },
    { key: 'completed', label: t('completed') },
    { key: 'cancelled', label: t('cancelled') },
  ];

  if (transactions.length === 0) {
    return (
      <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">{t('noTransactions')}</h2>
        <Link to="/products" className="mt-4 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
          {t('startShopping') || (language === 'id' ? 'Mulai Belanja' : 'Start Shopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{t('transactionHistory')}</h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transaction Cards */}
        <div className="space-y-3">
          {filtered.map(tx => {
            const status = statusConfig[tx.status];
            const StatusIcon = status.icon;
            return (
              <div key={tx.id} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{tx.order_number}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(tx.created_at)}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.className}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </span>
                </div>

                <div className="space-y-1.5 mb-3">
                  {tx.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                      <span className="font-medium text-foreground">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  {tx.items.length > 3 && (
                    <p className="text-xs text-muted-foreground">+{tx.items.length - 3} {language === 'id' ? 'item lainnya' : 'more items'}</p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-lg font-bold text-primary">{formatPrice(tx.total_amount)}</span>
                  <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                    {t('detail')} <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {language === 'id' ? 'Tidak ada transaksi dengan status ini' : 'No transactions with this status'}
          </div>
        )}
      </div>
    </div>
  );
}
