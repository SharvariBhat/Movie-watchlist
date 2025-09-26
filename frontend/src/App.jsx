import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieRecommendations from './components/MovieRecommendations';
import Watchlist from './components/Watchlist';
import MovieDetails from './components/MovieDetails';
import { movieAPI } from './services/api';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterGenre, setFilterGenre] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'watchlist'
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      console.log('Fetching movies from API...');
      const data = await movieAPI.getAllMovies();
      console.log('Movies fetched:', data);
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      alert('Failed to load movies. Please check if the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (movieData) => {
    try {
      console.log('Adding movie:', movieData);
      const newMovie = await movieAPI.createMovie(movieData);
      console.log('Movie added successfully:', newMovie);
      setMovies(prevMovies => [...prevMovies, newMovie]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie. Please check if the backend server is running.');
    }
  };

  const handleUpdateMovie = async (id, movieData) => {
    try {
      const updatedMovie = await movieAPI.updateMovie(id, movieData);
      setMovies(movies.map(movie => movie._id === id ? updatedMovie : movie));
      setShowForm(false);
      setEditingMovie(null);
      setSelectedMovie(null);
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

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleViewDetails = (movie) => {
    console.log('Opening movie details for:', movie.title);
    setSelectedMovie(movie);
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = searchQuery === '' || 
                         movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.language?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || movie.status === filterStatus;
    const matchesGenre = filterGenre === 'All' || movie.genre === filterGenre;
    const matchesLanguage = filterLanguage === 'All' || movie.language === filterLanguage;
    return matchesSearch && matchesStatus && matchesGenre && matchesLanguage;
  });

  const featuredMovie = movies.find(movie => movie.status === 'Watching') || movies[0];

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-netflix-red">MovieWatch</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'home' 
                    ? 'bg-netflix-red text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('watchlist')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'watchlist' 
                    ? 'bg-netflix-red text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Watchlist
              </button>
               {currentView === 'home' && (
                 <>
                   <div className="relative">
                     <input
                       type="text"
                       placeholder="Search movies..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red w-64"
                     />
                   </div>
                   <select
                     value={filterStatus}
                     onChange={(e) => setFilterStatus(e.target.value)}
                     className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
                   >
                     <option value="All">All Status</option>
                     <option value="Will Watch">Will Watch</option>
                     <option value="Watching">Watching</option>
                     <option value="Watched">Watched</option>
                   </select>
                   <select
                     value={filterGenre}
                     onChange={(e) => setFilterGenre(e.target.value)}
                     className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
                   >
                     <option value="All">All Genres</option>
                     <option value="Action">Action</option>
                     <option value="Drama">Drama</option>
                     <option value="Sci-Fi">Sci-Fi</option>
                     <option value="Comedy">Comedy</option>
                     <option value="Thriller">Thriller</option>
                     <option value="Romance">Romance</option>
                     <option value="Crime">Crime</option>
                     <option value="Animation">Animation</option>
                     <option value="Fantasy">Fantasy</option>
                     <option value="Adventure">Adventure</option>
                     <option value="Musical">Musical</option>
                   </select>
                   <select
                     value={filterLanguage}
                     onChange={(e) => setFilterLanguage(e.target.value)}
                     className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
                   >
                     <option value="All">All Languages</option>
                     <option value="English">English</option>
                     <option value="Korean">Korean</option>
                     <option value="French">French</option>
                     <option value="Japanese">Japanese</option>
                     <option value="Portuguese">Portuguese</option>
                     <option value="Spanish">Spanish</option>
                   </select>
                 </>
               )}
              <button
                onClick={() => setShowForm(true)}
                className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Add Movie
              </button>
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showChatbot ? 'Close Chat' : 'Get Recommendations'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          {featuredMovie && (
            <Hero movie={featuredMovie} />
          )}

          {/* Home Content */}
          <div className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                {filterStatus === 'All' ? 'All Movies' : `${filterStatus} Movies`}
              </h2>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="spinner"></div>
                </div>
              ) : (
                <MovieList
                  movies={filteredMovies}
                  onEdit={handleEditMovie}
                  onDelete={handleDeleteMovie}
                  onViewDetails={handleViewDetails}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <Watchlist
          onBack={() => setCurrentView('home')}
        />
      )}

      {/* Movie Form Modal */}
      {showForm && (
        <MovieForm
          movie={editingMovie}
          onSubmit={editingMovie ? (data) => handleUpdateMovie(editingMovie._id, data) : handleAddMovie}
          onClose={() => {
            setShowForm(false);
            setEditingMovie(null);
          }}
        />
      )}

      {/* Chatbot Modal */}
      {showChatbot && (
        <MovieRecommendations
          movies={movies}
          onClose={() => setShowChatbot(false)}
        />
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onUpdate={handleUpdateMovie}
        />
      )}
    </div>
  );
}

export default App;
