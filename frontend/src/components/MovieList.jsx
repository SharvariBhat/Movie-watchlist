import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onEdit, onDelete, onViewDetails }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">No movies found</div>
        <p className="text-gray-500">Try adjusting your search or add some movies to your watchlist!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default MovieList;
