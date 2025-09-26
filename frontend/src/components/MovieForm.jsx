import React, { useEffect, useState } from 'react';

// Modal form for adding or editing a movie
// Props:
// - movie: optional movie object to edit
// - onSubmit: function(formData) to create or update a movie
// - onClose: function() to close the modal
const MovieForm = ({ movie, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    posterURL: '',
    description: '',
    rating: 0,
    status: 'Will Watch',
    genre: '',
    language: 'English',
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || '',
        posterURL: movie.posterURL || '',
        description: movie.description || '',
        rating: movie.rating ?? 0,
        status: movie.status || 'Will Watch',
        genre: movie.genre || '',
        language: movie.language || 'English',
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a movie title');
      return;
    }
    try {
      await onSubmit({ ...formData, rating: Number(formData.rating) || 0 });
    } catch (err) {
      console.error('Error submitting movie form:', err);
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
          className={`text-2xl ${i <= rating ? 'text-yellow-400' : 'text-gray-500'} hover:text-yellow-300 transition-colors`}
          aria-label={`Set rating ${i}`}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">{movie ? 'Edit Movie' : 'Add Movie'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
              placeholder="Movie title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Poster URL</label>
            <input
              type="url"
              name="posterURL"
              value={formData.posterURL}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
              placeholder="Brief synopsis"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
                placeholder="e.g. Action"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
              >
                <option value="English">English</option>
                <option value="Korean">Korean</option>
                <option value="French">French</option>
                <option value="Japanese">Japanese</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
              >
                <option value="Will Watch">Will Watch</option>
                <option value="Watching">Watching</option>
                <option value="Watched">Watched</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <div className="flex items-center space-x-2">
                {renderStars(formData.rating)}
                <span className="text-gray-400 ml-2">{formData.rating}/5</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              {movie ? 'Save Changes' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;


