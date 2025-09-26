import React, { useState } from 'react';

const MovieDetails = ({ movie, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: movie?.title || '',
    posterURL: movie?.posterURL || '',
    description: movie?.description || '',
    rating: movie?.rating || 0,
    status: movie?.status || 'Will Watch',
    genre: movie?.genre || ''
  });

  // Update form data when movie prop changes
  React.useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        posterURL: movie.posterURL,
        description: movie.description,
        rating: movie.rating,
        status: movie.status,
        genre: movie.genre
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(movie._id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, rating: i }))}
          className={`star text-2xl ${
            i <= rating ? 'text-yellow-400' : 'text-gray-400'
          } hover:text-yellow-300 transition-colors`}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Will Watch': return 'bg-blue-600';
      case 'Watching': return 'bg-yellow-600';
      case 'Watched': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const normalizeRating = (r) => {
    if (r == null || isNaN(r)) return 0;
    const num = Number(r);
    const scaled = num > 5 ? num / 2 : num;
    return Math.max(0, Math.min(5, scaled));
  };

  if (!movie) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex">
          {/* Movie Poster */}
          <div className="w-1/3 p-6">
            <img
              src={movie.posterURL}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Movie Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Poster URL
                  </label>
                  <input
                    type="url"
                    name="posterURL"
                    value={formData.posterURL}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {renderStars(formData.rating)}
                    <span className="text-gray-400 ml-2">
                      {formData.rating}/5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  >
                    <option value="Will Watch">Will Watch</option>
                    <option value="Watching">Watching</option>
                    <option value="Watched">Watched</option>
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="bg-netflix-red text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(movie.status)}`}>
                    {movie.status}
                  </span>
                  <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < Math.min(Math.max(normalizeRating(movie.rating), 0), 5) ? 'text-yellow-400' : 'text-gray-400'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-400 ml-2">{Math.min(Math.max(normalizeRating(movie.rating), 0), 5).toFixed(1)}/5</span>
                </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-netflix-red text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Edit Movie
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
