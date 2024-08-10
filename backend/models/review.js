const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
