import React from 'react';

const Hero = ({ movie }) => {
  if (!movie) return null;

  const normalizeRating = (r) => {
    if (r == null || isNaN(r)) return 0;
    const num = Number(r);
    // If rating seems to be on a 10-point scale, convert to 5
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
        <span key={i} className="star text-yellow-400 text-xl">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star text-yellow-400 text-xl">☆</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-400 text-xl">★</span>
      );
    }

    return stars;
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${movie.posterURL})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex justify-center items-center mb-6 space-x-4">
            <div className="flex items-center space-x-2">
              {renderStars(movie.rating)}
              <span className="text-white text-lg ml-2">
                {normalizeRating(movie.rating).toFixed(1)}/5
              </span>
            </div>
            <span className="bg-netflix-red text-white px-3 py-1 rounded-full text-sm font-semibold">
              {movie.status}
            </span>
            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
              {movie.genre}
            </span>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {movie.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-netflix-red text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Now
            </button>
            
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
