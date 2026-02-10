import { useMemo, useState } from "react";
import ArticleCard from "../components/ArticleCard";

export default function Articles({ articles }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ["All", ...Array.from(set)];
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(search.toLowerCase().trim());
      const matchesCategory = category === "All" || a.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [articles, search, category]);

  return (
    <div className="container py-4">
      <h1 className="text-center text-white mb-4">Latest Articles</h1>
      <div className="d-flex flex-wrap gap-2 align-items-end mb-3 justify-content-center">
        <div>
          <label className="form-label text-white">Search</label>
          <input
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g., fashion"
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
      </div>

      {filtered.length === 0 ? (
        <div className="alert alert-info">No articles match your filters.</div>
      ) : (
        <div className="row g-3">
          {filtered.map((a) => (
            <div className="col-12 col-md-6 col-lg-4" key={a.id}>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}