const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      username: String
    },
    text: String,
    wasEdited: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
