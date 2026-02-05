import { Link } from "wouter";

export default function Home() {
  return (
    <div className="hero-section text-center text-white py-5">
      <div className="container">
        <h1 className="display-4 mb-3">Welcome to Lifestyle Hub</h1>
        <p className="lead mb-4">
          A lifestyle platform blending eco-friendly gems & gentle reading. Shop our curated products and read inspiring articles.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link className="btn btn-light btn-lg px-4 py-2" href="/products">
            Shop Products
          </Link>
          <Link className="btn btn-outline-light btn-lg px-4 py-2" href="/articles">
            Read Articles
          </Link>
        </div>
      </div>
    </div>
  );
}