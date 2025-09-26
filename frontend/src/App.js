import React, { useState, useEffect } from "react";
import axios from "axios";

// Categories for watchlist
const CATEGORIES = ["Will Watch", "Watching", "Watched"];

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [status, setStatus] = useState(CATEGORIES[0]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [recommendation, setRecommendation] = useState("");

  // Fetch movies from backend
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies");
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Add new movie
  const addMovie = async (e) => {
    e.preventDefault();
    if (!title || !director) return alert("Please fill all fields");
    try {
      await axios.post("http://localhost:5000/api/movies", {
        title,
        director,
        status,
      });
      setTitle("");
      setDirector("");
      setStatus(CATEGORIES[0]);
      fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // Delete movie
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Mark as watched
  const markAsWatched = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/movies/${id}`, {
        status: "Watched",
      });
      fetchMovies();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  // Recommendation bot (simple random pick from "Will Watch" or "Watching")
  const getRecommendation = () => {
    const pool = movies.filter(
      (m) => m.status === "Will Watch" || m.status === "Watching"
    );
    if (pool.length === 0) {
      setRecommendation("No recommendations available. Add more movies!");
    } else {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setRecommendation(
        `How about watching "${pick.title}" directed by ${pick.director}?`
      );
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Filter movies by category and search
  const filteredMovies = movies
    .filter((m) => m.status === activeCategory)
    .filter(
      (m) =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        (m.director && m.director.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Movie Watchlist Manager</h1>

      {/* Category Selector */}
      <div style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.categoryBtn,
              background: activeCategory === cat ? "#e11d48" : "#f3f4f6",
              color: activeCategory === cat ? "#fff" : "#222",
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or director..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* Add Movie Form */}
      <form onSubmit={addMovie} style={styles.form}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          style={styles.input}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" style={styles.button}>
          Add Movie
        </button>
      </form>

      {/* Movie List */}
      <ul style={styles.list}>
        {filteredMovies.map((movie) => (
          <li key={movie._id} style={styles.listItem}>
            <span>
              <b>{movie.title}</b> (Director: {movie.director})
              <span style={styles.statusTag}>{movie.status}</span>
            </span>
            <div>
              {movie.status !== "Watched" && (
                <button
                  onClick={() => markAsWatched(movie._id)}
                  style={styles.markWatchedBtn}
                >
                  Mark as Watched
                </button>
              )}
              <button
                onClick={() => deleteMovie(movie._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Recommendation Bot */}
      <div style={styles.recommendBox}>
        <h3>🤖 Movie Recommendation Bot</h3>
        <button style={styles.button} onClick={getRecommendation}>
          Recommend Me a Movie
        </button>
        {recommendation && (
          <div style={styles.recommendation}>{recommendation}</div>
        )}
      </div>
    </div>
  );
}

// Inline CSS styles
const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "24px",
    fontFamily: "Inter, Arial, sans-serif",
    textAlign: "center",
    border: "2px solid #e11d48",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#18181b 60%,#e11d48 100%)",
    color: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  heading: {
    color: "#fff",
    fontWeight: 800,
    fontSize: "2.2rem",
    marginBottom: "18px",
    letterSpacing: "1px",
    textShadow: "0 2px 8px #e11d48",
  },
  categories: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "18px",
  },
  categoryBtn: {
    padding: "8px 18px",
    borderRadius: "999px",
    border: "none",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #e11d48",
    width: "180px",
    marginBottom: "8px",
    background: "#222",
    color: "#fff",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#e11d48",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 2px 8px #e11d48",
    transition: "background 0.2s",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    marginTop: "10px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 15px",
    borderBottom: "1px solid #e11d48",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "8px",
    marginBottom: "8px",
    transition: "background 0.2s",
  },
  deleteButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#f44336",
    color: "white",
    cursor: "pointer",
    marginLeft: "8px",
    fontWeight: 600,
  },
  markWatchedBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#22d3ee",
    color: "#222",
    cursor: "pointer",
    marginRight: "8px",
    fontWeight: 600,
  },
  statusTag: {
    marginLeft: "10px",
    fontSize: "0.9em",
    color: "#e11d48",
    fontWeight: 700,
    background: "#fff",
    borderRadius: "6px",
    padding: "2px 10px",
    marginRight: "4px",
  },
  recommendBox: {
    marginTop: "32px",
    padding: "18px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "12px",
    boxShadow: "0 2px 8px #e11d48",
  },
  recommendation: {
    marginTop: "14px",
    fontSize: "1.1rem",
    color: "#fff",
    background: "#e11d48",
    borderRadius: "8px",
    padding: "10px",
    fontWeight: 600,
    boxShadow: "0 2px 8px #e11d48",
    animation: "fadeIn 0.5s",
  },
};

export default App;