const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// set toJson (to convert _id to String and to delete _id and _v from response)

module.exports = mongoose.model('Blog', blogSchema);
