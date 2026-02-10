import { Link } from "wouter";

export default function ArticleCard({ article }) {
  return (
    <div className="card h-100">
      <img
        src={article.image}
        className="card-img-top"
        alt={article.title}
        style={{ objectFit: "cover", height: 180 }}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/640x360?text=Lifestyle+Article";
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <p className="text-muted mb-1">{article.category}</p>
        <p className="mb-3">{article.excerpt}</p>
        <small className="text-muted">{new Date(article.date).toLocaleDateString()}</small>

        <div className="mt-auto">
          <Link className="btn btn-primary btn-sm" href={`/articles/${article.id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}