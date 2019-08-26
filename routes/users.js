const express = require('express');
const userController = require('../controller/users');

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

module.exports = router;
