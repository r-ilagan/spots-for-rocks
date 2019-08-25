const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  spots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spots' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.Model('User', userSchema);
