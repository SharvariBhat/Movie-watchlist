import React from 'react';

const MovieCard = ({ movie, onEdit, onDelete, onViewDetails }) => {
  const normalizeRating = (r) => {
    if (r == null || isNaN(r)) return 0;
    const num = Number(r);
    const scaled = num > 5 ? num / 2 : num;
    return Math.max(0, Math.min(5, scaled));
  };

  const renderStars = (ratingRaw) => {
    const rating = normalizeRating(ratingRaw);
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star text-yellow-400">☆</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-400">★</span>
      );
    }

    return stars;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Watched': return 'bg-green-600';
      case 'Watching': return 'bg-blue-600';
      case 'Will Watch': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="movie-card group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterURL}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            <button
              onClick={() => onEdit(movie)}
              className="bg-netflix-red text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(movie._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
          {movie.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-3">
          {movie.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(movie.rating)}
            <span className="text-gray-400 text-sm ml-1">
              {normalizeRating(movie.rating).toFixed(1)}/5
            </span>
          </div>
          <span className={`${getStatusColor(movie.status)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
            {movie.status}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">{movie.genre}</span>
          <button 
            onClick={() => onViewDetails && onViewDetails(movie)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
