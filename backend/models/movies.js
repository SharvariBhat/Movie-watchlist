const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  status: String, // watched, watching, will watch
  userId: String,
});

module.exports = mongoose.model('Movie', movieSchema);
