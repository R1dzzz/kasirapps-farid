import { useMemo } from 'react';
import { products, getPopularProducts, getLatestProducts, searchProducts, filterProducts } from '@/data/products';
import { categories } from '@/data/categories';
import type { Product, Category } from '@/types';

export function useProducts() {
  const allProducts = useMemo(() => products, []);
  const allCategories = useMemo(() => categories, []);

  const getBySlug = (slug: string): Product | undefined => {
    return products.find(p => p.slug === slug);
  };

  const getByCategory = (categoryId: string): Product[] => {
    return products.filter(p => p.category_id === categoryId);
  };

  const getCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find(c => c.slug === slug);
  };

  const popular = useMemo(() => getPopularProducts(8), []);
  const latest = useMemo(() => getLatestProducts(8), []);

  return {
    products: allProducts,
    categories: allCategories,
    popular,
    latest,
    getBySlug,
    getByCategory,
    getCategoryBySlug,
    search: searchProducts,
    filter: filterProducts,
  };
}
