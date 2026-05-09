import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Heart, CreditCard, Award,
  Package, ChevronRight, LogOut, User, Settings, ClipboardList
} from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { useTransactions } from '@/hooks/useTransactions';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, language } = useStore();
  const { user, isLoggedIn, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { transactions } = useTransactions();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || !user) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(price);
  };

  const totalSpent = transactions.reduce((sum, tx) => tx.status !== 'cancelled' ? sum + tx.total_amount : sum, 0);
  const totalOrders = transactions.filter(tx => tx.status !== 'cancelled').length;
  const points = Math.floor(totalSpent / 100000);

  const stats = [
    { icon: ClipboardList, label: t('totalOrders'), value: totalOrders.toString(), color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' },
    { icon: CreditCard, label: t('totalSpent'), value: formatPrice(totalSpent), color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' },
    { icon: Heart, label: t('wishlist'), value: wishlistItems.length.toString(), color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' },
    { icon: Award, label: t('points'), value: points.toString(), color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' },
  ];

  const recentOrders = transactions.slice(0, 5);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* User Info */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Nav Links */}
              <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                  <User className="h-4 w-4" />
                  {t('overview')}
                </div>
                <Link to="/transactions" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <ClipboardList className="h-4 w-4" />
                  {t('transactions')}
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Heart className="h-4 w-4" />
                  {t('wishlist')}
                </Link>
                <Link to="/cart" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <ShoppingBag className="h-4 w-4" />
                  {t('cart')}
                </Link>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                  <Settings className="h-4 w-4" />
                  {t('settings')}
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center gap-3 px-5 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors border border-border"
              >
                <LogOut className="h-4 w-4" />
                {t('logout')}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border">
                  <div className={`inline-flex h-9 w-9 rounded-lg ${stat.bg} items-center justify-center mb-3`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">{t('recentOrders')}</h3>
                <Link to="/transactions" className="text-xs text-primary hover:underline flex items-center gap-1">
                  {t('viewAll')} <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-2">
                  {recentOrders.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{tx.order_number}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {tx.items.length} {language === 'id' ? 'item' : 'items'} - {tx.status}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">{formatPrice(tx.total_amount)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">
                  {language === 'id' ? 'Belum ada pesanan' : 'No orders yet'}
                </p>
              )}
            </div>

            {/* Quick Links */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">{t('quickLinks')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Link to="/products" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">{t('products')}</span>
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-medium text-foreground">{t('wishlist')}</span>
                </Link>
                <Link to="/help" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium text-foreground">{t('helpCenter')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
