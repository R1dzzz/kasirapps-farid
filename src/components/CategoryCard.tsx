import { Link } from 'react-router-dom';
import {
  Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive,
  Laptop, Tv, Headphones, Wifi, Mouse
} from 'lucide-react';
import { useStore } from '@/stores/useStore';
import type { Category } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive,
  Laptop, Tv, Headphones, Wifi, Mouse,
};

interface CategoryCardProps {
  category: Category;
  large?: boolean;
}

export function CategoryCard({ category, large = false }: CategoryCardProps) {
  const { language } = useStore();
  const Icon = iconMap[category.icon] || Cpu;

  if (large) {
    return (
      <Link
        to={`/products?category=${category.slug}`}
        className="group flex flex-col items-start p-8 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary hover:-translate-y-0.5 transition-all duration-250 h-[180px]"
      >
        <Icon className="h-12 w-12 text-primary mb-3 group-hover:scale-110 transition-transform" />
        <h3 className="text-lg font-bold text-foreground">
          {language === 'id' ? category.name_id : category.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {category.product_count} {language === 'id' ? 'Produk' : 'Products'}
        </p>
      </Link>
    );
  }

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group flex flex-col items-start p-5 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary hover:-translate-y-0.5 transition-all duration-250"
    >
      <Icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
      <h3 className="text-sm font-semibold text-foreground">
        {language === 'id' ? category.name_id : category.name}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5">
        {category.product_count} {language === 'id' ? 'Produk' : 'Products'}
      </p>
    </Link>
  );
}
