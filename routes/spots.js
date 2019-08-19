const express = require('express');
const router = express.Router();
const spotsController = require('../controller/spots');

// Index route
router.get('/', (req, res) => {
  spotsController.findAllSpots(req, res);
});

// New route
router.get('/new', (req, res) => {
  res.render('index/new');
});

// Create route
router.post('/', (req, res) => {
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

// Show route
router.get('/:id', (req, res) => {
  res.render('index/show');
});
module.exports = router;
