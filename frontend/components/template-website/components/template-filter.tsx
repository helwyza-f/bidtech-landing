import type { TEMPLATE_CATEGORIES } from "@/lib/data/template";

interface TemplateFilterProps {
  categories: typeof TEMPLATE_CATEGORIES;
  selectedCategory: string;
  onSelect: (name: string) => void;
}

export function TemplateFilter({ categories, selectedCategory, onSelect }: TemplateFilterProps) {
  return (
    <div className="mx-auto mt-9 flex max-w-5xl flex-wrap items-center justify-center gap-3">
      {categories.map((category) => (
        <button
          onClick={() => onSelect(category.name)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition cursor-pointer ${
            selectedCategory === category.name
              ? "border-slate-950 bg-brand-primary text-white"
              : "border-emerald-100 bg-white/80 text-slate-600 hover:border-brand-primary/40 hover:text-slate-950"
          }`}
          key={category.name}
        >
          {category.name}
          <span className={selectedCategory === category.name ? "ml-2 text-white" : "ml-2 text-slate-500"}>
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}
