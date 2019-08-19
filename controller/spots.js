const Spots = require('../models/spots');

module.exports.findAllSpots = (req, res) => {
  Spots.find({})
    .then(foundSpots => {
      res.render('index/spots', { spots: foundSpots });
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports.createSpot = (req, res, newSpot) => {
  Spots.create(newSpot)
    .then(() => {
      res.redirect('/spots');
    })
    .catch(err => {
      console.log(err);
    });
};

// module.exports.findSpot = ();
