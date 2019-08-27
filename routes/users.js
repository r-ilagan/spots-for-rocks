const express = require('express');
const passport = require('passport');
const userController = require('../controller/users');
const middleware = require('../middlewares/index');

const router = express.Router();

// Login route
router.get('/login', (req, res) => res.render('auth/login'));

// Register route
router.get('/register', (req, res) => res.render('auth/register'));

// Create new user
router.post('/', (req, res) => {
  const { email, username, password, password2 } = req.body;
  const errors = userController.validateCred(
    email,
    username,
    password,
    password2
  );
  userController.createUser(errors, email, username, password, req, res);
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/spots',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
