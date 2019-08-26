const express = require('express');
const User = require('../models/users');

const router = express.Router();

// Login route
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Register route
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// Create new user
router.post('/', (req, res) => {
  const { email, username, password, password2 } = req.body;
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

  if (errors.length > 0) {
    res.render('auth/register', {
      errors,
      email,
      username,
      password,
      password2
    });
  } else {
    res.send('pass');
  }

  // res.send(req.body);
});
module.exports = router;
