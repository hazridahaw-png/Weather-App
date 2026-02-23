import { Link } from "wouter";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/recommendations', {
        mood: parseInt(mood),
        energy: parseInt(energy),
        timeOfDay,
        // Add weather if available
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Fallback mock
      setRecommendations({
        read: "A cozy mystery novel.",
        wear: "Comfortable loungewear.",
        cook: "Simple pasta dish."
      });
    }
    setLoading(false);
  };

  return (
    <div className="hero-section text-center text-white py-5">
      <div className="container">
        <h1 className="display-4 mb-3">Welcome to Daily Dose</h1>
        <p className="lead mb-4">
          Your AI-powered lifestyle curator. Discover what to read, wear, or cook today based on your mood and aesthetic preferences.
        </p>
        <div className="d-flex justify-content-center gap-3 mb-5">
          <Link className="btn btn-warning btn-lg px-5 py-3 fw-bold" href="/curator">
            <i className="bi bi-stars"></i> Daily Curator
          </Link>
          <Link className="btn btn-light btn-lg px-4 py-2" href="/products">
            Shop Products
          </Link>
          <Link className="btn btn-outline-light btn-lg px-4 py-2" href="/articles">
            Read Articles
          </Link>
        </div>

        {/* Mood Input Widgets */}
        <div className="mood-section bg-white bg-opacity-10 rounded p-4 mt-4 shadow-lg">
          <h3 className="mb-4 text-center">How are you feeling today? <i className="bi bi-heart-fill text-danger"></i></h3>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="card bg-light border-0 h-100">
                <div className="card-body text-center">
                  <label className="form-label fw-bold mb-3">
                    <i className="bi bi-emoji-smile fs-4 me-2"></i>Mood
                  </label>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">😢</span>
                    <span className="badge bg-primary fs-6">{mood}/5</span>
                    <span className="text-muted">😊</span>
                  </div>
                  <input 
                    type="range" 
                    className="form-range" 
                    min="1" 
                    max="5" 
                    value={mood} 
                    onChange={(e) => setMood(e.target.value)} 
                    style={{cursor: 'pointer'}}
                  />
                  <small className="text-muted">
                    {mood <= 2 ? 'Feeling down' : mood >= 4 ? 'Feeling great!' : 'Neutral mood'}
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light border-0 h-100">
                <div className="card-body text-center">
                  <label className="form-label fw-bold mb-3">
                    <i className="bi bi-lightning-charge fs-4 me-2"></i>Energy Level
                  </label>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">🪫</span>
                    <span className="badge bg-success fs-6">{energy}/5</span>
                    <span className="text-muted">⚡</span>
                  </div>
                  <input 
                    type="range" 
                    className="form-range" 
                    min="1" 
                    max="5" 
                    value={energy} 
                    onChange={(e) => setEnergy(e.target.value)} 
                    style={{cursor: 'pointer'}}
                  />
                  <small className="text-muted">
                    {energy <= 2 ? 'Low energy' : energy >= 4 ? 'High energy!' : 'Moderate energy'}
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light border-0 h-100">
                <div className="card-body text-center">
                  <label className="form-label fw-bold mb-3">
                    <i className="bi bi-clock fs-4 me-2"></i>Time of Day
                  </label>
                  <select 
                    className="form-select form-select-lg" 
                    value={timeOfDay} 
                    onChange={(e) => setTimeOfDay(e.target.value)}
                  >
                    <option value="Morning">🌅 Morning</option>
                    <option value="Afternoon">☀️ Afternoon</option>
                    <option value="Evening">🌆 Evening</option>
                    <option value="Night">🌙 Night</option>
                  </select>
                  <small className="text-muted mt-2 d-block">
                    {timeOfDay === 'Morning' ? 'Fresh start' : 
                     timeOfDay === 'Afternoon' ? 'Midday boost' : 
                     timeOfDay === 'Evening' ? 'Wind down' : 'Late night'}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button 
              className="btn btn-primary btn-lg px-5 py-3 fw-bold" 
              onClick={getRecommendations} 
              disabled={loading}
              style={{borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,123,255,0.3)'}}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Generating Your Daily Dose...
                </>
              ) : (
                <>
                  <i className="bi bi-stars me-2"></i>Get Personalized Recommendations
                </>
              )}
            </button>
          </div>

          {recommendations && (
            <div className="mt-5 animate-fade-in-up">
              <div className="card bg-gradient border-0 shadow-lg">
                <div className="card-body p-4">
                  <h4 className="card-title text-center mb-4">
                    <i className="bi bi-gift-fill text-warning me-2"></i>Your Daily Dose
                  </h4>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="text-center">
                        <i className="bi bi-book fs-1 text-primary mb-2"></i>
                        <h6 className="fw-bold">Read</h6>
                        <p className="mb-0">{recommendations.read}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center">
                        <i className="bi bi-tshirt fs-1 text-success mb-2"></i>
                        <h6 className="fw-bold">Wear</h6>
                        <p className="mb-0">{recommendations.wear}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center">
                        <i className="bi bi-cup-hot fs-1 text-danger mb-2"></i>
                        <h6 className="fw-bold">Cook</h6>
                        <p className="mb-0">{recommendations.cook}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-share me-1"></i>Share
                    </button>
                    <button className="btn btn-outline-success btn-sm">
                      <i className="bi bi-heart me-1"></i>Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}