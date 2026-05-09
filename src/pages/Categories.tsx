import { useStore } from '@/stores/useStore';
import { useProducts } from '@/hooks/useProducts';
import { CategoryCard } from '@/components/CategoryCard';

export default function Categories() {
  const { language } = useStore();
  const { categories } = useProducts();

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
          {language === 'id' ? 'Semua Kategori' : 'All Categories'}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} large />
          ))}
        </div>
      </div>
    </div>
  );
}
