const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 4 },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true },
    profPic: String,
    spots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spots' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
