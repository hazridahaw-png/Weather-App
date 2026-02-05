import { Link } from "wouter";
import type { Article } from "../types";

interface ArticleDetailsProps {
  id: string;
  articles: Article[];
}

export default function ArticleDetails({ id, articles }: ArticleDetailsProps) {
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="alert alert-warning">
        Article not found. <Link href="/articles">Back to articles</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link href="/articles" className="btn btn-secondary mb-3">
        ← Back to Articles
      </Link>

      <div className="row">
        <div className="col-md-8">
          <img
            src={article.image}
            className="img-fluid rounded mb-3"
            alt={article.title}
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/900x600?text=Lifestyle+Article";
            }}
          />
          <h1>{article.title}</h1>
          <p className="text-muted">{article.category} • {new Date(article.date).toLocaleDateString()}</p>
          <p className="lead">{article.excerpt}</p>
          <div>{article.content}</div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Related Articles</h5>
              {articles
                .filter((a) => a.id !== article.id && a.category === article.category)
                .slice(0, 3)
                .map((a) => (
                  <div key={a.id} className="mb-2">
                    <Link href={`/articles/${a.id}`} className="text-decoration-none">
                      {a.title}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}