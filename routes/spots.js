const express = require('express');
const router = express.Router();
const spotsController = require('../controller/spots');

// Index route
router.get('/spots', (req, res) => {
  spotsController.findSpots(req, res);
});

// New route
router.get('/spots/new', (req, res) => {
  res.render('index/new');
});

// Create route
router.post('/spots', (req, res) => {
  const author = req.body.author;
  const image = req.body.image;
  const place = req.body.place;
  const description = req.body.description;
  const newSpot = {
    name: place,
    description: description,
    author: author,
    image: image
  };
  spotsController.createSpot(req, res, newSpot);
});

module.exports = router;
