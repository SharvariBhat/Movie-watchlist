const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie"); // Make sure this path is correct

// GET all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET a movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// POST a movie
router.post("/", async (req, res) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      posterURL: req.body.posterURL,
      description: req.body.description,
      genre: req.body.genre,
      language: req.body.language,
      status: req.body.status,
      rating: req.body.rating,
      year: req.body.year,
      review: req.body.review,
    });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update a movie
router.patch("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Replace a movie (PUT)
router.put("/:id", async (req, res) => {
  try {
    const replacement = {
      title: req.body.title,
      posterURL: req.body.posterURL,
      description: req.body.description,
      genre: req.body.genre,
      language: req.body.language,
      status: req.body.status,
      rating: req.body.rating,
      year: req.body.year,
      review: req.body.review,
    };
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, replacement, {
      new: true,
      runValidators: true,
      overwrite: false,
    });
    if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a movie
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Seed database with sample movies (with poster images)
router.post("/seed", async (_req, res) => {
  try {
    const count = await Movie.countDocuments();
    if (count > 0) {
      return res.json({ message: "Movies already seeded", count });
    }

    const sampleMovies = [
      {
        title: "The Dark Knight",
        posterURL: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description: "Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy.",
        genre: "Action",
        language: "English",
        status: "Will Watch",
        rating: 4.8,
      },
      {
        title: "Inception",
        posterURL: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        description: "A thief who steals corporate secrets through dream-sharing technology is given a task of inception.",
        genre: "Sci-Fi",
        language: "English",
        status: "Watching",
        rating: 4.7,
      },
      {
        title: "Pulp Fiction",
        posterURL: "https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg",
        description: "The lives of two hitmen, a boxer, and a gangster's wife intertwine in tales of violence and redemption.",
        genre: "Crime",
        language: "English",
        status: "Watched",
        rating: 4.6,
      },
      {
        title: "The Shawshank Redemption",
        posterURL: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        description: "Two imprisoned men bond over years, finding solace and eventual redemption.",
        genre: "Drama",
        language: "English",
        status: "Will Watch",
        rating: 4.9,
      },
      {
        title: "Interstellar",
        posterURL: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        genre: "Sci-Fi",
        language: "English",
        status: "Watching",
        rating: 4.8,
      },
    ];

    const created = await Movie.insertMany(sampleMovies);
    res.status(201).json({ message: "Seeded successfully", count: created.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed additional movies without wiping existing ones
router.post("/seed-more", async (_req, res) => {
  try {
    const moreMovies = [
      {
        title: "The Godfather",
        posterURL: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
        genre: "Crime",
        language: "English",
        status: "Watched",
        rating: 4.9,
      },
      {
        title: "Spirited Away",
        posterURL: "https://image.tmdb.org/t/p/w500/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg",
        description: "A young girl enters the world of spirits and must save her parents.",
        genre: "Animation",
        language: "Japanese",
        status: "Will Watch",
        rating: 4.7,
      },
      {
        title: "Parasite",
        posterURL: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy and poor.",
        genre: "Thriller",
        language: "Korean",
        status: "Watching",
        rating: 4.6,
      },
      {
        title: "Your Name",
        posterURL: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
        description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
        genre: "Romance",
        language: "Japanese",
        status: "Will Watch",
        rating: 4.5,
      },
      {
        title: "Whiplash",
        posterURL: "https://image.tmdb.org/t/p/w500/oPxnRhyAIzJKGUEdSiwTJQBa3NM.jpg",
        description: "A promising young drummer enrolls at a cut-throat music conservatory.",
        genre: "Drama",
        language: "English",
        status: "Watched",
        rating: 4.6,
      },
      {
        title: "The Matrix",
        posterURL: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        description: "A hacker discovers reality is a simulation and joins a rebellion against the machines.",
        genre: "Sci-Fi",
        language: "English",
        status: "Watching",
        rating: 4.7,
      }
    ];

    let inserted = 0;
    for (const m of moreMovies) {
      const exists = await Movie.findOne({ title: m.title });
      if (!exists) {
        await Movie.create(m);
        inserted += 1;
      }
    }
    const total = await Movie.countDocuments();
    return res.status(201).json({ message: "Additional movies seeded", inserted, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
