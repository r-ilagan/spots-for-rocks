const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      username: String
    },
    image: String,
    wasUpdated: Boolean,
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Spots', spotSchema);
