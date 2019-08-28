/* eslint-disable consistent-return */
const Spot = require('../models/spots');
const Comment = require('../models/comments');

const middleware = {};

middleware.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('warn', 'Please, login first before you can create a spot.');
  return res.redirect('/users/login');
};

middleware.checkSpotOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Spot.findById(req.params.id)
      .then(spot => {
        if (!spot) {
          req.flash('error', 'Spot not found!');
          return res.redirect('back');
        }
        if (spot.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      })
      .catch(err => req.flash('error', err.message));
  } else {
    req.flash('warn', 'You need to be logged to create a Spot.');
    res.redirect('back');
  }
};

middleware.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id)
      .then(comment => {
        if (!comment) {
          req.flash('error', 'Comment does not exist.');
          return res.redirect('back');
        }
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that.');
          res.redirect('back');
        }
      })
      .catch(err => req.flash('error', err.message));
  } else {
    req.flash('warn', 'You need to be logged to comment.');
    res.redirect('back');
  }
};
module.exports = middleware;
