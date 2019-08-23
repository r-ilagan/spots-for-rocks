const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    author: String,
    text: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
