import type { Product } from "../types/product";

export function searchProducts(products: Product[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.category,
      product.routineStep,
      product.shortBenefit,
      product.texture,
      ...product.concerns,
      ...product.keyIngredients,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function getMatchReason(product: Product, query: string) {
  const q = query.trim().toLowerCase();
  const concern = product.concerns.find((item) => item.toLowerCase().includes(q));
  if (concern) return `Matches: ${concern}`;
  const ingredient = product.keyIngredients.find((item) => item.toLowerCase().includes(q));
  if (ingredient) return `Matches: ${ingredient}`;
  if (product.category.toLowerCase().includes(q)) return `Category: ${product.category}`;
  if (product.routineStep.toLowerCase().includes(q)) return `Routine: ${product.routineStep}`;
  return `Matches: ${product.name}`;
}
