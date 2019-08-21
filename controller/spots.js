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

module.exports.createSpot = (res, newSpot) => {
  Spots.create(newSpot)
    .then(() => {
      res.redirect('/spots');
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.showSpot = (res, id) => {
  Spots.findById(id)
    .then(foundSpot => {
      res.render('index/show', { spot: foundSpot });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.editSpot = (res, id) => {
  Spots.findById(id).then(foundSpot => {
    res.render('index/edit', { spot: foundSpot });
  });
};

module.exports.updateSpot = (req, res, id) => {
  Spots.findByIdAndUpdate(id, {
    name: req.body.place,
    description: req.body.description,
    author: req.body.author,
    image: req.body.image,
    wasUpdated: true
  })
    .exec()
    .then(() => {
      res.redirect(`/spots/${id}`);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.deleteSpot = (res, id) => {
  Spots.findByIdAndRemove(id)
    .exec()
    .then(() => {
      res.redirect('/spots');
    })
    .catch(err => {
      console.log(err);
    });
};
