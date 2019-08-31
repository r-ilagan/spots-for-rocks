/* eslint-disable consistent-return */
const Spots = require('../models/spots');

module.exports.findAllSpots = (req, res) => {
  Spots.find({})
    .then(foundSpots => {
      res.render('index/spots', { spots: foundSpots });
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('/spots');
    });
};

module.exports.createSpot = (req, res, newSpot) => {
  Spots.create(newSpot)
    .then(() => {
      req.flash('success', 'New Spot created successfully.');
      res.redirect('/spots');
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('/spots');
    });
};

module.exports.showSpot = (req, res, id) => {
  Spots.findById(id)
    .populate('comment')
    .exec()
    .then(foundSpot => {
      res.render('index/show', { spot: foundSpot });
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('/spots');
    });
};

module.exports.editSpot = (req, res, id) => {
  Spots.findById(id)
    .then(foundSpot => {
      if (!foundSpot) {
        req.flash('error', 'The spot you are looking for does not exist.');
        return res.redirect('back');
      }
      res.render('index/edit', { spot: foundSpot });
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('/spots');
    });
};

module.exports.updateSpot = (req, res, id) => {
  Spots.findByIdAndUpdate(id, {
    name: req.body.place,
    description: req.body.description,
    image: req.body.image,
    wasUpdated: true
  })
    .exec()
    .then(spot => {
      if (!spot) {
        req.flash('error', 'The spot you are looking for does not exist.');
        return res.redirect('back');
      }
      res.redirect(`/spots/${id}`);
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('/spots');
    });
};

module.exports.deleteSpot = (req, res, id) => {
  Spots.findByIdAndRemove(id)
    .exec()
    .then(spot => {
      if (!spot) {
        req.flash('error', 'The spot you are looking for does not exist.');
        return res.redirect('back');
      }
      res.redirect('/spots');
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('/spots');
    });
};
