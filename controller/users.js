const passport = require('passport');
const User = require('../models/users');

const userController = {};

function renderError(req, res, errors, email, username, password) {
  res.render('auth/register', {
    errors,
    email,
    username,
    password
  });
}

userController.validateCred = (email, username, password, password2) => {
  const errors = [];

  if (!email || !username || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match!' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should at least be 6 characters' });
  }

  if (username.length < 4) {
    errors.push({ msg: 'Username should at least be 4 characters' });
  }

  if (username.length > 12) {
    errors.push({ msg: 'Username should cannot be more than 12 characters' });
  }
  return errors;
};

userController.createUser = (errors, email, username, password, req, res) => {
  if (errors.length > 0) {
    renderError(req, res, errors, email, username, password);
  } else {
    // Check if user exists
    User.findOne({ email: email }).then(account => {
      if (!account) {
        // Validation and registration
        const user = new User({
          username,
          email: email
        });
        User.register(user, password)
          .then(() => {
            passport.authenticate('local')(req, res, () => {
              req.flash(
                'success',
                'You are now registered! Be sure to validate your email address.'
              );
              res.redirect('/spots');
            });
          })
          .catch(err => {
            errors.push({ msg: err.message });
            renderError(req, res, errors, email, username, password);
          });
      } else {
        errors.push({ msg: 'Email already exists' });
        renderError(req, res, errors, email, username, password);
      }
    });
  }
};

userController.findProfile = (req, res) => {
  User.findById(req.params.user_id)
    .populate('spots')
    .populate('comments')
    .exec()
    .then(user => {
      res.render('auth/dashboard', { user: user });
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('back');
    });
};

module.exports = userController;
