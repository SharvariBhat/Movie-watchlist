const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Add movie
router.post('/add', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.send(movie);
});

// Get movies by status
router.get('/:status', async (req, res) => {
  const movies = await Movie.find({ status: req.params.status });
  res.send(movies);
});

module.exports = router;
