export type ProductCategory =
  | "Cleanser"
  | "Serum"
  | "Moisturizer"
  | "Sunscreen"
  | "Toner"
  | "Mask"
  | "Set";

export type RoutineStep = "Cleanse" | "Prep" | "Treat" | "Moisturize" | "Protect";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  routineStep: RoutineStep;
  concerns: string[];
  keyIngredients: string[];
  price?: number;
  size: string;
  shortBenefit: string;
  benefitHighlights: string[];
  description: string;
  texture: string;
  finish?: string;
  usage: string;
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
};
