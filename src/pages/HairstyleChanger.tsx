import React, { useState } from 'react';
import axios from 'axios';

const HairstyleChanger: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedHairstyle, setSelectedHairstyle] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hairstyles = [
    { id: 'long_wavy', name: 'Long Wavy Hair', description: 'Flowing waves for a romantic look' },
    { id: 'short_pixie', name: 'Short Pixie Cut', description: 'Edgy and modern short style' },
    { id: 'bob_straight', name: 'Bob with Straight Hair', description: 'Classic and elegant bob' },
    { id: 'curly_afro', name: 'Curly Afro', description: 'Natural curls and volume' },
    { id: 'ponytail_high', name: 'High Ponytail', description: 'Sporty and sleek updo' },
    { id: 'braids_cornrows', name: 'Cornrow Braids', description: 'Traditional braided style' },
    { id: 'blonde_highlights', name: 'Blonde Highlights', description: 'Sun-kissed golden tones' },
    { id: 'red_curly', name: 'Red Curly Hair', description: 'Vibrant red with natural curls' },
    { id: 'black_straight', name: 'Jet Black Straight', description: ' Sleek and shiny straight hair' },
    { id: 'brown_layers', name: 'Brown Layered Cut', description: 'Rich brown with face-framing layers' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHairstyleChange = async () => {
    if (!selectedImage || !selectedHairstyle) {
      setError('Please select an image and hairstyle');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/hairstyle-change', {
        image: selectedImage,
        hairstyle: selectedHairstyle
      });

      setResultImage(response.data.resultImage);
    } catch (err) {
      setError('Failed to process hairstyle change. Please try again.');
      console.error('Hairstyle change error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">AI Hairstyle Changer</h1>
          <p className="text-center text-muted mb-5">
            Upload a photo and try different hairstyles virtually using AI technology
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h5>Upload Your Photo</h5>
            </div>
            <div className="card-body text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control mb-3"
                id="imageUpload"
              />
              {selectedImage && (
                <div>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h5>Choose Hairstyle</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {hairstyles.map((style) => (
                  <div key={style.id} className="col-6 mb-3">
                    <div
                      className={`card h-100 cursor-pointer ${
                        selectedHairstyle === style.id ? 'border-primary' : ''
                      }`}
                      onClick={() => setSelectedHairstyle(style.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body p-2">
                        <h6 className="card-title small">{style.name}</h6>
                        <p className="card-text small text-muted">{style.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 text-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleHairstyleChange}
            disabled={!selectedImage || !selectedHairstyle || loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Processing...
              </>
            ) : (
              'Change Hairstyle'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="alert alert-danger text-center">{error}</div>
          </div>
        </div>
      )}

      {resultImage && (
        <div className="row mt-5">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Result</h5>
              </div>
              <div className="card-body text-center">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Original</h6>
                    <img
                      src={selectedImage!}
                      alt="Original"
                      className="img-fluid rounded"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h6>With New Hairstyle</h6>
                    <img
                      src={resultImage}
                      alt="Result"
                      className="img-fluid rounded"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-success me-2">Download</button>
                  <button className="btn btn-outline-primary">Share</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-info">
            <h6><i className="fas fa-info-circle me-2"></i>About AI Hairstyle Changer</h6>
            <p className="mb-0">
              This feature uses advanced AI technology to virtually change your hairstyle.
              Currently showing mock results - full AI integration coming soon with premium APIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairstyleChanger;