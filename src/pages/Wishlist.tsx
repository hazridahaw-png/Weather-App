import type { WishlistItem, Product } from "../types";

interface WishlistProps {
  wishlist: WishlistItem[];
  onRemove: (productId: number) => void;
  onAddToCart: (product: Product, qty?: number) => void;
  products: Product[];
}

export default function Wishlist({ wishlist, onRemove, onAddToCart, products }: WishlistProps) {
  const getProductDetails = (productId: number) => {
    return products.find(p => p.id === productId);
  };

  return (
    <div>
      <h1 className="mb-4">
        <i className="bi bi-heart-fill text-danger me-2"></i>
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-heart" style={{ fontSize: '4rem', color: '#ccc' }}></i>
          <h3 className="mt-3 text-muted">Your wishlist is empty</h3>
          <p className="text-muted">Add items you love to your wishlist!</p>
          <a href="/products" className="btn btn-primary">Browse Products</a>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((item) => {
            const product = getProductDetails(item.productId);
            return (
              <div key={item.productId} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-primary fw-bold">${item.price}</p>
                    <div className="mt-auto">
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          if (product) onAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onRemove(item.productId)}
                      >
                        <i className="bi bi-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}