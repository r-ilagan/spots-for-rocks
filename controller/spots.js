const Spots = require('../models/spots');

module.exports.findSpots = (req, res) => {
  Spots.find({})
    .then(foundSpots => {
      res.render('index/spots', { spots: foundSpots });
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports.createSpot = (req, res, newSpot) => {
  Spots.create(newSpot, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/spots');
    }
  });
};
