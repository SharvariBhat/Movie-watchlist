import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const movieAPI = {
  // Get all movies
  getAllMovies: async () => {
    const response = await api.get('/movies');
    return response.data;
  },

  // Create a new movie
  createMovie: async (movieData) => {
    const response = await api.post('/movies', movieData);
    return response.data;
  },

  // Update a movie
  updateMovie: async (id, movieData) => {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
  },

  // Delete a movie
  deleteMovie: async (id) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  },

  // Search movies
  searchMovies: async (query, genre) => {
    const response = await api.get('/movies/search', {
      params: { q: query, genre }
    });
    return response.data;
  },
};

export default api;
