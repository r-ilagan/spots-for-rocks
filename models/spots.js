const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: String,
  image: String,
  comment: [String]
});

module.exports = mongoose.model('Spots', spotSchema);
