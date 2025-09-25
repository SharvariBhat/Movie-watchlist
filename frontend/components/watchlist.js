import axios from 'axios';
import { useEffect, useState } from 'react';

function Watchlist({ status }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/movies/${status}`)
      .then(res => setMovies(res.data));
  }, [status]);

  return (
    <div>
      <h2>{status} Movies</h2>
      {movies.map(movie => <div key={movie._id}>{movie.title}</div>)}
    </div>
  );
}
