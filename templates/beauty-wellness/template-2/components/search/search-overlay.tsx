"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { products } from "../../data/products";
import { getMatchReason, searchProducts } from "../../lib/product-search";
import { ArrowRight, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const suggestions = ["Barrier Support", "Dullness", "Ceramides", "Daily Protection"];

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchProducts(products, query).slice(0, 8), [query]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    document.documentElement.classList.add("search-open");
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.classList.remove("search-open");
    };
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  if (!open) return null;

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(0, results.length - 1)));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(0, index - 1));
    }
    if (event.key === "Enter" && results[activeIndex]) {
      window.location.href = `/products/${results[activeIndex].slug}`;
    }
  }

  return (
    <div className="searchOverlay" role="dialog" aria-modal="true" aria-label="Search Chulla products">
      <div className="searchOverlay__top">
        <span className="eyebrow">Product discovery</span>
        <button className="iconButton flex flex-row gap-2 items-center" onClick={onClose} aria-label="Close search">
          <span>Close</span>
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div className="searchOverlay__inner">
        <label className="searchField">
          <span className="srOnly">Search products</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search product, concern, ingredient, texture…"
          />
        </label>

        {!query && (
          <div className="searchSuggestions">
            <span>Try</span>
            {suggestions.map((suggestion) => (
              <button key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>
            ))}
          </div>
        )}

        {query && results.length > 0 && (
          <div className="searchResults" aria-live="polite">
            {results.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className={`searchResult ${index === activeIndex ? "is-active" : ""}`}
                onClick={onClose}
              >
                <div className="searchResult__media">
                  <img src={product.images[0]} alt="" />
                </div>
                <div>
                  <span className="eyebrow">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.shortBenefit}</p>
                  <small>{getMatchReason(product, query)}</small>
                </div>
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="searchEmpty">
            <h2>No product matched “{query}”.</h2>
            <p>Try Barrier Support, Dullness, Ceramides, Serum, or Daily Protection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
