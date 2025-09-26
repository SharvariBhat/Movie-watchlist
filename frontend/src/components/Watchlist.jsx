import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import { movieAPI } from '../services/api';

const Watchlist = ({ onBack }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await movieAPI.getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMovie = async (id, movieData) => {
    try {
      const updatedMovie = await movieAPI.updateMovie(id, movieData);
      setMovies(movies.map(movie => movie._id === id ? updatedMovie : movie));
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await movieAPI.deleteMovie(id);
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const filteredMovies = movies.filter(movie => {
    const title = movie.title?.toLowerCase() || '';
    const genre = movie.genre?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    const matchesSearch = title.includes(query) || genre.includes(query);
    const matchesStatus = filterStatus === 'All' || movie.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      all: movies.length,
      willWatch: movies.filter(m => m.status === 'Will Watch').length,
      watching: movies.filter(m => m.status === 'Watching').length,
      watched: movies.filter(m => m.status === 'Watched').length
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-white">My Watchlist</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{counts.all}</div>
            <div className="text-gray-400">Total Movies</div>
          </div>
          <div className="bg-blue-600 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{counts.willWatch}</div>
            <div className="text-blue-200">Will Watch</div>
          </div>
          <div className="bg-yellow-600 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{counts.watching}</div>
            <div className="text-yellow-200">Watching</div>
          </div>
          <div className="bg-green-600 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{counts.watched}</div>
            <div className="text-green-200">Watched</div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'All'
                ? 'bg-netflix-red text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilterStatus('Will Watch')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'Will Watch'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Will Watch ({counts.willWatch})
          </button>
          <button
            onClick={() => setFilterStatus('Watching')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'Watching'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Watching ({counts.watching})
          </button>
          <button
            onClick={() => setFilterStatus('Watched')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'Watched'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Watched ({counts.watched})
          </button>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No movies found</div>
            <p className="text-gray-500">
              {searchQuery ? 'Try adjusting your search' : 'Add some movies to your watchlist!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
                onViewDetails={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onUpdate={handleEditMovie}
        />
      )}
    </div>
  );
};

export default Watchlist;
