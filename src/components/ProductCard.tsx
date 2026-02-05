import { Link } from "wouter";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, qty: number) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export default function ProductCard({ product, onAddToCart, onAddToWishlist, isInWishlist }: ProductCardProps) {
  return (
    <div className="card h-100">
      <div className="position-relative">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ objectFit: "cover", height: 180 }}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/640x360?text=Lifestyle+Product";
          }}
        />
        <button
          className={`btn btn-sm position-absolute top-0 end-0 m-2 ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={() => onAddToWishlist(product)}
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="text-muted mb-1">{product.category}</p>
        <div className="mb-2">
          {product.vegan && <span className="badge bg-success me-1">Vegan</span>}
          {product.organic && <span className="badge bg-info me-1">Organic</span>}
          <span className="badge bg-secondary">Sustainability: {product.sustainability_score}/10</span>
        </div>
        <p className="mb-3">${product.price.toFixed(2)}</p>

        <div className="mt-auto d-flex gap-2">
          <Link className="btn btn-outline-secondary btn-sm" href={`/products/${product.id}`}>
            View
          </Link>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onAddToCart(product, 1)}
            disabled={product.stock <= 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}