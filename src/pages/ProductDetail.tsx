import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart, Star, Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive,
  Laptop, Tv, Headphones, Wifi, Mouse, Minus, Plus, ShoppingCart, ArrowLeft
} from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { ProductCard } from '@/components/ProductCard';
import { categories } from '@/data/categories';

const iconMap: Record<string, React.ElementType> = {
  Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive,
  Laptop, Tv, Headphones, Wifi, Mouse,
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, language } = useStore();
  const { getBySlug, products } = useProducts();
  const { add } = useCart();
  const { isInWishlist, toggle } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  const product = getBySlug(slug || '');

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center">
        <p className="text-lg text-muted-foreground">{language === 'id' ? 'Produk tidak ditemukan' : 'Product not found'}</p>
        <Link to="/products" className="mt-4 text-primary hover:underline">{t('viewAll')}</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.category_id);
  const CategoryIcon = iconMap[category?.icon || 'Cpu'] || Cpu;
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      add(product.id, 1);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'id' ? 'Kembali' : 'Back'}
        </button>

        {/* Product Info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image */}
          <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center border border-border">
            <CategoryIcon className="h-32 w-32 text-muted-foreground/30" strokeWidth={0.5} />
          </div>

          {/* Details */}
          <div className="space-y-5">
            <Link
              to={`/products?category=${category?.slug}`}
              className="inline-block text-xs font-medium text-primary hover:underline"
            >
              {language === 'id' ? category?.name_id : category?.name}
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.sold_count} {t('reviews')})
              </span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>

            {/* Stock */}
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              product.stock === 0
                ? 'bg-destructive/10 text-destructive'
                : product.stock < 5
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            }`}>
              {product.stock === 0 ? t('outOfStock') : `${t('stock')}: ${product.stock}`}
            </span>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'id' ? product.description_id : product.description}
            </p>

            {/* Specs */}
            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">{t('specifications')}</h3>
              <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center px-4 py-2.5 bg-card">
                    <span className="text-xs text-muted-foreground capitalize w-1/3">{key.replace(/_/g, ' ')}</span>
                    <span className="text-xs font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Quantity Selector */}
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-muted disabled:opacity-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-3 text-sm font-semibold min-w-[48px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="p-3 hover:bg-muted disabled:opacity-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {t('addToCart')}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggle(product.id)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'border-red-200 bg-red-50 text-red-500 dark:border-red-900 dark:bg-red-950'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">{t('relatedProducts')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
