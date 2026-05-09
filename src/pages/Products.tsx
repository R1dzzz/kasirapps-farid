import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import type { SortOption } from '@/types';

export default function Products() {
  const { t, language } = useStore();
  const { categories, filter } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categorySlug = searchParams.get('category') || '';
  const sortParam = (searchParams.get('sort') as SortOption) || 'newest';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categorySlug);
  const [sort, setSort] = useState<SortOption>(sortParam);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const pageSize = 12;

  useEffect(() => {
    if (categorySlug) setSelectedCategory(categorySlug);
  }, [categorySlug]);

  const selectedCategoryId = useMemo(() => {
    if (!selectedCategory) return undefined;
    return categories.find(c => c.slug === selectedCategory)?.id;
  }, [selectedCategory, categories]);

  const filteredProducts = useMemo(() => {
    let result = filter(
      selectedCategoryId,
      minPrice ? parseInt(minPrice) : undefined,
      maxPrice ? parseInt(maxPrice) : undefined,
      sort
    );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [filter, selectedCategoryId, minPrice, maxPrice, sort, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setPage(1);
    if (slug) {
      setSearchParams({ category: slug, sort });
    } else {
      setSearchParams(sort !== 'newest' ? { sort } : {});
    }
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setPage(1);
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (newSort !== 'newest') params.sort = newSort;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
    setSort('newest');
    setPage(1);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || minPrice || maxPrice || searchQuery;

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: language === 'id' ? 'Terbaru' : 'Newest' },
    { value: 'price_asc', label: language === 'id' ? 'Harga Rendah-Tinggi' : 'Price Low-High' },
    { value: 'price_desc', label: language === 'id' ? 'Harga Tinggi-Rendah' : 'Price High-Low' },
    { value: 'rating', label: language === 'id' ? 'Rating Tertinggi' : 'Highest Rating' },
    { value: 'popular', label: language === 'id' ? 'Terpopuler' : 'Most Popular' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{t('products')}</h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder={t('searchPlaceholder')}
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {language === 'id' ? 'Filter' : 'Filters'}
            {hasActiveFilters && <span className="h-2 w-2 rounded-full bg-primary" />}
          </button>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {language === 'id' ? 'Semua' : 'All'}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {language === 'id' ? cat.name_id : cat.name}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="p-4 rounded-xl bg-card border border-border mb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  {language === 'id' ? 'Harga Min' : 'Min Price'}
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                  placeholder="0"
                  className="w-32 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  {language === 'id' ? 'Harga Max' : 'Max Price'}
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                  placeholder="Max"
                  className="w-32 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto text-sm text-destructive hover:underline flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  {language === 'id' ? 'Hapus Filter' : 'Clear Filters'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredProducts.length} {language === 'id' ? 'produk ditemukan' : 'products found'}
        </p>

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Search className="h-12 w-12 mb-4 opacity-40" />
            <p className="text-lg font-medium">{t('noProducts')}</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-primary hover:underline"
            >
              {language === 'id' ? 'Hapus filter' : 'Clear filters'}
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                  p === page ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-muted'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
