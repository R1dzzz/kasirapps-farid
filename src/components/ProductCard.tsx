import { Link } from 'react-router-dom';
import { Heart, Star, Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive, Laptop, Tv, Headphones, Wifi, Mouse } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { categories } from '@/data/categories';
import type { Product } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive, Laptop, Tv, Headphones, Wifi, Mouse,
};

interface ProductCardProps {
  product: Product;
  showNew?: boolean;
}

export function ProductCard({ product, showNew = false }: ProductCardProps) {
  const { t, language } = useStore();
  const { add } = useCart();
  const { isInWishlist, toggle } = useWishlist();

  const category = categories.find(c => c.id === product.category_id);
  const CategoryIcon = iconMap[category?.icon || 'Cpu'] || Cpu;
  const inWishlist = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-250">
      {/* Image Area */}
      <Link to={`/product/${product.slug}`} className="block relative h-48 bg-muted flex items-center justify-center">
        <CategoryIcon className="h-16 w-16 text-muted-foreground/40" strokeWidth={1} />
        {showNew && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
            {t('new')}
          </span>
        )}
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(product.id); }}
        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-sm hover:bg-background transition-colors"
      >
        <Heart className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
      </button>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium mb-2">
          {language === 'id' ? category?.name_id : category?.name}
        </span>

        {/* Product Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${star <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{product.rating}</span>
        </div>

        {/* Price */}
        <p className="text-base font-bold text-primary mb-1">{formatPrice(product.price)}</p>

        {/* Stock */}
        <p className={`text-xs mb-3 ${
          product.stock === 0 ? 'text-destructive' : product.stock < 5 ? 'text-yellow-500' : 'text-green-600 dark:text-green-400'
        }`}>
          {product.stock === 0 ? t('outOfStock') : `${t('stock')}: ${product.stock}`}
        </p>

        {/* Add to Cart */}
        <button
          onClick={() => add(product.id, 1)}
          disabled={product.stock === 0}
          className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
}
