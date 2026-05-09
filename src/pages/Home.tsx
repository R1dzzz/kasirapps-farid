import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive, Laptop, Tv, Headphones, Wifi, Mouse, TrendingUp, Clock } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';

const iconMap: Record<string, React.ElementType> = {
  Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive, Laptop, Tv, Headphones, Wifi, Mouse,
};

export default function Home() {
  const { t, language } = useStore();
  const { categories, popular, latest } = useProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <TrendingUp className="h-3.5 w-3.5" />
                {language === 'id' ? 'Platform Terpercaya' : 'Trusted Platform'}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {t('startShopping')}
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                >
                  {t('learnMore')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">100+</p>
                  <p className="text-xs text-muted-foreground">{language === 'id' ? 'Produk' : 'Products'}</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-2xl font-bold text-foreground">10</p>
                  <p className="text-xs text-muted-foreground">{language === 'id' ? 'Kategori' : 'Categories'}</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-2xl font-bold text-foreground">24/7</p>
                  <p className="text-xs text-muted-foreground">{language === 'id' ? 'Layanan' : 'Service'}</p>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-3xl blur-2xl" />
                <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 4).map((cat) => {
                      const Icon = iconMap[cat.icon] || Cpu;
                      return (
                        <div key={cat.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{language === 'id' ? cat.name_id : cat.name}</p>
                            <p className="text-[10px] text-muted-foreground">{cat.product_count} items</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-foreground">{language === 'id' ? 'Penjualan Hari Ini' : 'Today Sales'}</span>
                      <span className="text-xs text-green-600 font-medium">+24.5%</span>
                    </div>
                    <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full" />
                    </div>
                    <p className="text-lg font-bold text-primary mt-2">Rp 12.5M</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">1,234 {language === 'id' ? 'Pesanan' : 'Orders'}</p>
                      <p className="text-[10px] text-muted-foreground">{language === 'id' ? 'Bulan ini' : 'This month'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">{t('productCategories')}</h2>
            <Link to="/categories" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              {t('viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{t('popularProducts')}</h2>
            </div>
            <Link to="/products?sort=popular" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              {t('viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {popular.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{t('latestProducts')}</h2>
            </div>
            <Link to="/products?sort=newest" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              {t('viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {latest.map((product) => (
              <ProductCard key={product.id} product={product} showNew />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-10">
            {language === 'id' ? 'Mengapa Memilih Kami?' : 'Why Choose Us?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShoppingBag, title: language === 'id' ? 'Produk Lengkap' : 'Complete Products', desc: language === 'id' ? '100+ produk elektronik dari 10 kategori' : '100+ electronic products from 10 categories' },
              { icon: TrendingUp, title: language === 'id' ? 'Harga Kompetitif' : 'Competitive Prices', desc: language === 'id' ? 'Harga terbaik dengan kualitas terjamin' : 'Best prices with guaranteed quality' },
              { icon: Clock, title: language === 'id' ? 'Pengiriman Cepat' : 'Fast Shipping', desc: language === 'id' ? 'Pengiriman dalam 1-3 hari kerja' : 'Delivery within 1-3 business days' },
              { icon: Monitor, title: language === 'id' ? 'Garansi Resmi' : 'Official Warranty', desc: language === 'id' ? 'Semua produk bergaransi resmi' : 'All products come with official warranty' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
