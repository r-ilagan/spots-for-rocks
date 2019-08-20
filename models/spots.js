const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    author: String,
    image: String
    // created: { type: Date, default: Date.now }
    // comment: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Spots', spotSchema);
