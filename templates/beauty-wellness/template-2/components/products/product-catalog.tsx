"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "../../data/products";
import { ProductCard } from "./product-card";
import { RotateCcw } from "lucide-react";

const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))] as string[];
const concerns = ["All", ...Array.from(new Set(products.flatMap((product) => product.concerns))).sort()] as string[];
const routines = ["All", "Cleanse", "Prep", "Treat", "Moisturize", "Protect"];

export function ProductCatalog() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("category") ?? "All");
  const [concern, setConcern] = useState(params.get("concern") ?? "All");
  const [routine, setRoutine] = useState(params.get("routine") ?? "All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      if (category !== "All" && product.category !== category) return false;
      if (concern !== "All" && !product.concerns.includes(concern)) return false;
      if (routine !== "All" && product.routineStep !== routine) return false;
      if (!q) return true;
      return [
        product.name,
        product.category,
        product.routineStep,
        product.shortBenefit,
        product.texture,
        ...product.concerns,
        ...product.keyIngredients,
      ].join(" ").toLowerCase().includes(q);
    });
  }, [query, category, concern, routine]);

  const clear = () => {
    setQuery("");
    setCategory("All");
    setConcern("All");
    setRoutine("All");
  };

  return (
    <>
      <div className="catalogControls">
        <label className="catalogSearch">
          <span className="srOnly">Search products</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search formula, ingredient, concern…" />
        </label>
        <div className="catalogFilters">
          <label>Type<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Concern<select value={concern} onChange={(event) => setConcern(event.target.value)}>{concerns.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Routine<select value={routine} onChange={(event) => setRoutine(event.target.value)}>{routines.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <div className="catalogStatus"><span>{filtered.length} formulations</span><button onClick={clear}>Clear all</button></div>
      </div>

      <div className="productGrid productGrid--catalog">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {filtered.length === 0 && <div className="catalogEmpty"><h2>No formulation matched this combination.</h2>
        <button className="textLink" onClick={clear}>
          Reset discovery
          <RotateCcw size={15} strokeWidth={1.5} />
        </button>
      </div>}
    </>
  );
}
