const express = require('express');
const router = express.Router();
const spotsController = require('../controller/spots');
const middleware = require('../middlewares/index');

// Index route
router.get('/', (req, res) => {
  console.log(req.user);
  spotsController.findAllSpots(req, res);
});

// New route
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('index/new');
});

// Create route
router.post('/', middleware.isLoggedIn, (req, res) => {
  const author = req.user;
  const image = req.body.image;
  const place = req.body.place;
  const description = req.body.description;
  const newSpot = {
    name: place,
    description: description,
    author: author,
    image: image
  };
  spotsController.createSpot(res, newSpot);
});

// Show route
router.get('/:id', (req, res) => {
  spotsController.showSpot(res, req.params.id);
});

// Edit route
router.get('/:id/edit', middleware.isLoggedIn, (req, res) => {
  spotsController.editSpot(res, req.params.id);
});

// Update route
router.put('/:id', middleware.isLoggedIn, (req, res) => {
  spotsController.updateSpot(req, res, req.params.id);
});

// Delete route
router.delete('/:id', middleware.isLoggedIn, (req, res) => {
  spotsController.deleteSpot(res, req.params.id);
});

module.exports = router;
