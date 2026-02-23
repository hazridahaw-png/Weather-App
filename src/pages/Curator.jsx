import { useState } from "react";

export default function Curator() {
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [recommendations, setRecommendations] = useState(null);

  const getRecommendations = () => {
    // Mock AI recommendations based on inputs
    const recs = {
      read: "A Dark Academia novel about ancient mysteries.",
      wear: "Minimalist outfit with neutral tones.",
      cook: "A cozy Cottagecore herbal tea recipe."
    };
    setRecommendations(recs);
  };

  const enableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Register service worker for push notifications
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('Service Worker registered');
            // Subscribe to push notifications (requires VAPID keys from backend)
            // This is a demo; in production, integrate with your server
          });
        }
        // Show a test notification
        new Notification('Daily Dose', {
          body: 'Notifications enabled! You\'ll get daily recommendations.',
          icon: '/favicon.ico'
        });
      }
    } else {
      alert('Notifications not supported in this browser.');
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center text-white mb-4">Your Daily Curator</h1>
      <p className="text-center text-white mb-4">
        Tell us about your day, and we'll suggest what to read, wear, or cook.
      </p>

      <div className="text-center mb-4">
        <button className="btn btn-info" onClick={enableNotifications}>
          <i className="bi bi-bell"></i> Enable Daily Notifications
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">Mood & Preferences</h5>
              <div className="mb-3">
                <label>Mood: 😢 Sad <input type="range" min="1" max="5" value={mood} onChange={(e) => setMood(e.target.value)} /> 😊 Happy</label>
              </div>
              <div className="mb-3">
                <label>Energy: 🪫 Low <input type="range" min="1" max="5" value={energy} onChange={(e) => setEnergy(e.target.value)} /> ⚡ High</label>
              </div>
              <div className="mb-3">
                <label>Time of Day</label>
                <select className="form-select" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                  <option>Night</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={getRecommendations}>Get My Daily Dose</button>
            </div>
          </div>

          {recommendations && (
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Your Personalized Recommendations</h5>
                <p><strong>Read:</strong> {recommendations.read}</p>
                <p><strong>Wear:</strong> {recommendations.wear}</p>
                <p><strong>Cook:</strong> {recommendations.cook}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}