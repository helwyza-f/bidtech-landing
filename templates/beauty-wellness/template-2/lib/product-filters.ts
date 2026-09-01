import type { Product } from "../types/product";

export type ProductFilters = {
  category?: string;
  concern?: string;
  ingredient?: string;
  routine?: string;
};

export function filterProducts(items: Product[], filters: ProductFilters) {
  return items.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.concern && !product.concerns.includes(filters.concern)) return false;
    if (filters.ingredient && !product.keyIngredients.includes(filters.ingredient)) return false;
    if (filters.routine && product.routineStep !== filters.routine) return false;
    return true;
  });
}
