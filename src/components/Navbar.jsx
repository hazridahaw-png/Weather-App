import { Link } from "wouter";

export default function Navbar({ cartCount, wishlistCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <Link className="navbar-brand" href="/">
          Daily <i className="bi bi-heart-fill text-danger"></i> Dose
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav me-auto">
            <Link className="nav-link" href="/products">
              Products
            </Link>
            <Link className="nav-link" href="/articles">
              Articles
            </Link>
            <Link className="nav-link" href="/styles">
              Stylepedia
            </Link>
            <Link className="nav-link" href="/hairstyle-changer">
              <i className="bi bi-magic"></i> AI Hairstyle
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" href="/wishlist">
              <i className="bi bi-heart"></i> Wishlist ({wishlistCount})
            </Link>
            <Link className="nav-link" href="/cart">
              Cart ({cartCount})
            </Link>
            <Link className="nav-link" href="/checkout">
              Checkout
            </Link>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </a>
              <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                <li><Link className="dropdown-item" href="/registration">Register</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}