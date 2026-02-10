import { useMemo, useState } from "react";
import StyleCard from "../components/StyleCard";

export default function Styles({ styles }) {
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("All");

  const seasons = useMemo(() => {
    const set = new Set(styles.map((s) => s.season));
    return ["All", ...Array.from(set)];
  }, [styles]);

  const filtered = useMemo(() => {
    return styles.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase().trim()) ||
        s.description.toLowerCase().includes(search.toLowerCase().trim());
      const matchesSeason = season === "All" || s.season === season;
      return matchesSearch && matchesSeason;
    });
  }, [styles, search, season]);

  return (
    <div className="container py-4">
      <h1 className="text-center text-white mb-4">Stylepedia</h1>
      <p className="text-center text-white mb-4">
        Discover aesthetic styles and find inspiration for your lifestyle
      </p>

      <div className="d-flex flex-wrap gap-2 align-items-end mb-4 justify-content-center">
        <div>
          <label className="form-label text-white">Search Styles</label>
          <input
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g., cottagecore, minimalist"
          />
        </div>

        <div>
          <label className="form-label text-white">Season</label>
          <select
            className="form-select"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            {seasons.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filtered.map((style) => (
          <div key={style.id} className="col-lg-4 col-md-6">
            <StyleCard style={style} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-white mt-4">
          <p>No styles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}