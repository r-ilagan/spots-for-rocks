const Spot = require('../models/spots');
const Comment = require('../models/comments');

module.exports.newForm = (req, res) => {
  Spot.findById(req.params.id)
    .exec()
    .then(spot => res.render('comments/new', { spot: spot }))
    .catch(err => console.log(err.message));
};

module.exports.createComment = (req, res) => {
  Spot.findById(req.params.id)
    .then(spot => {
      const promise = Comment.create(req.body);
      promise.then(comment => {
        comment.text = req.body.text;
        comment.author = req.body.author;
        console.log(comment);
        comment
          .save()
          .catch(err => console.log('Saving comment: ', err.message));
        spot.comment.push(comment);
        spot
          .save()
          .then(() => res.redirect(`/spots/${req.params.id}`))
          .catch(err => console.log('Saving spot with comment: ', err.message));
      });
    })
    .catch(err => console.log(err.message));
};
