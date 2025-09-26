// src/App.jsx
import './App.css';
import Hero from './components/Hero';
import MovieCard from './components/MovieCard';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import MovieRecommendations from './components/MovieRecommendations';

function App() {
  return (
    <div className="App">
      {/* Hero section */}
      <Hero />

      {/* Form to add a new movie */}
      <MovieForm />

      {/* List of movies */}
      <MovieList />

      {/* Movie recommendations */}
      <MovieRecommendations />
    </div>
  );
}

export default App;
