import { Link } from "wouter";

export default function StyleCard({ style }) {
  return (
    <div className="card h-100">
      <img
        src={style.image}
        className="card-img-top"
        alt={style.name}
        style={{ objectFit: "cover", height: 180 }}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/640x360?text=Aesthetic+Style";
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{style.name}</h5>
        <p className="text-muted mb-1">{style.mood} • {style.season}</p>
        <p className="mb-3">{style.description.substring(0, 120)}...</p>

        <div className="mb-3">
          <small className="text-muted">Color Palette:</small>
          <div className="d-flex gap-1 mt-1">
            {style.colorPalette.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="rounded"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  border: '1px solid #dee2e6'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <Link className="btn btn-primary btn-sm" href={`/styles/${style.id}`}>
            Explore Style
          </Link>
        </div>
      </div>
    </div>
  );
}