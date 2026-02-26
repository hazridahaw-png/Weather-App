import { useMemo, useState } from "react";
import { Link } from "wouter";

export default function ProductDetails({ id, products, onAddToCart, onAddToWishlist, isInWishlist }) {
  const productId = Number(id);
  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId]
  );

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="alert alert-warning">
        Product not found. <Link href="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="row g-3">
      <div className="col-12 col-md-5">
        <img
          src={product.image}
          className="img-fluid rounded"
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/900x600?text=Lifestyle+Product";
          }}
        />
      </div>

      <div className="col-12 col-md-7">
        <h2>{product.name}</h2>
        <div className="text-muted mb-2">{product.category}</div>
        <div className="mb-3">
          {product.vegan && <span className="badge bg-success me-2">Vegan</span>}
          {product.organic && <span className="badge bg-info me-2">Organic</span>}
          <span className="badge bg-secondary">Sustainability: {product.sustainability_score}/10</span>
        </div>
        <h4 className="mb-3">${Number(product.price).toFixed(2)}</h4>
        <p>{product.description}</p>
        <p className="text-muted">Stock: {product.stock}</p>
        <p className="text-muted">Ingredients: {product.ingredients}</p>

        <div className="d-flex gap-2 align-items-end">
          <div style={{ maxWidth: 120 }}>
            <label className="form-label">Quantity</label>
            <input
              className="form-control"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={() => onAddToCart(product, qty)}
            disabled={product.stock <= 0}
          >
            Add to Cart
          </button>

          <button
            className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => onAddToWishlist(product)}
          >
            <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>

          <Link className="btn btn-outline-secondary" href="/products">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}