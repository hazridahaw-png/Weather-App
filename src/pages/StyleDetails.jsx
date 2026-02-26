import { Link } from "wouter";

export default function StyleDetails({ style }) {
  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/styles">Stylepedia</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {style.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <img
              src={style.image}
              className="card-img-top"
              alt={style.name}
              style={{ objectFit: "cover", height: 400 }}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/800x400?text=Aesthetic+Style";
              }}
            />
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="card-title mb-0">{style.name}</h1>
                <div>
                  <span className="badge bg-primary me-2">{style.season}</span>
                  <span className="badge bg-secondary">{style.mood}</span>
                </div>
              </div>

              <p className="card-text lead">{style.description}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Color Palette */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Color Palette</h5>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                {style.colorPalette.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="rounded mx-auto mb-2"
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: color,
                        border: '2px solid #dee2e6'
                      }}
                    />
                    <small className="text-muted d-block">{color}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outfit Ideas */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Outfit Ideas</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {style.outfitIdeas.map((outfit, index) => (
                  <li key={index} className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {outfit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Book Recommendations */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Book Recommendations</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {style.bookRecommendations.map((book, index) => (
                  <li key={index} className="mb-2">
                    <i className="bi bi-book-fill text-primary me-2"></i>
                    {book}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recipe Pairings */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recipe Pairings</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {style.recipePairings.map((recipe, index) => (
                  <li key={index} className="mb-2">
                    <i className="bi bi-cup-hot-fill text-warning me-2"></i>
                    {recipe}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}