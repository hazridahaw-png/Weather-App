import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product, WishlistItem } from "../types";

interface ProductsProps {
  products: Product[];
  onAddToCart: (product: Product, qty: number) => void;
  onAddToWishlist: (product: Product) => void;
  wishlist: WishlistItem[];
}

export default function Products({ products, onAddToCart, onAddToWishlist, wishlist }: ProductsProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [veganOnly, setVeganOnly] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase().trim());
      const matchesCategory = category === "All" || p.category === category;
      const matchesVegan = !veganOnly || p.vegan;
      const matchesOrganic = !organicOnly || p.organic;
      return matchesSearch && matchesCategory && matchesVegan && matchesOrganic;
    });
  }, [products, search, category, veganOnly, organicOnly]);

  return (
    <div className="container py-4">
      <h1 className="text-center text-white mb-4">Our Products</h1>
      <div className="d-flex flex-wrap gap-2 align-items-end mb-3 justify-content-center">
        <div>
          <label className="form-label text-white">Search</label>
          <input
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g., shampoo"
          />
        </div>

        <div>
          <label className="form-label text-white">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-column">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="vegan"
              checked={veganOnly}
              onChange={(e) => setVeganOnly(e.target.checked)}
            />
            <label className="form-check-label text-white" htmlFor="vegan">
              Vegan Only
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="organic"
              checked={organicOnly}
              onChange={(e) => setOrganicOnly(e.target.checked)}
            />
            <label className="form-check-label text-white" htmlFor="organic">
              Organic Only
            </label>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="alert alert-info">No products match your filters.</div>
      ) : (
        <div className="row g-3">
          {filtered.map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
              <ProductCard 
                product={p} 
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                isInWishlist={wishlist.some(w => w.productId === p.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}