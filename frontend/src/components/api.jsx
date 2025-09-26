import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all movies
export const getMovies = async () => {
  try {
    const res = await api.get("/movies");
    return res.data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
};

// Add a new movie
export const addMovie = async (movie) => {
  try {
    const res = await api.post("/movies", movie);
    return res.data;
  } catch (err) {
    console.error("Error adding movie:", err);
    throw err;
  }
};

// Update a movie (by id)
export const updateMovie = async (id, updates) => {
  try {
    const res = await api.patch(`/movies/${id}`, updates);
    return res.data;
  } catch (err) {
    console.error("Error updating movie:", err);
    throw err;
  }
};

// Delete a movie (by id)
export const deleteMovie = async (id) => {
  try {
    const res = await api.delete(`/movies/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting movie:", err);
    throw err;
  }
};

export default {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};