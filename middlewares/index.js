/* eslint-disable consistent-return */
const Spot = require('../models/spots');
const Comment = require('../models/comments');

const middleware = {};

middleware.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please, login first before you can create a spot.');
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
        // eslint-disable-next-line no-underscore-dangle
        if (spot.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      })
      .catch(err => console.log(err));
  }
};

module.exports = middleware;
