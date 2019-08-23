const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    author: String,
    text: String,
    wasEdited: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
