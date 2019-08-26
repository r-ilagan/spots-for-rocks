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

module.exports = router;
