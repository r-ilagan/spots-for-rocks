const Spot = require('../models/spots');
const Comment = require('../models/comments');
const User = require('../models/users');

function handleError(err, req, res) {
  req.flash('error', err.message);
  res.redirect('back');
}

module.exports.newForm = (req, res) => {
  Spot.findById(req.params.id)
    .exec()
    .then(spot => res.render('comments/new', { spot: spot }))
    .catch(err => handleError(err, req, res));
};

module.exports.createComment = (req, res) => {
  User.findById(req.user._id).then(user => {
    Spot.findById(req.params.id)
      .then(spot => {
        const promise = Comment.create(req.body);
        promise.then(comment => {
          // Add comment to user profile
          user.comments.push(comment);
          user.save().catch(err => handleError(err, req, res));
          comment.text = req.body.text;
          comment.author = { id: req.user._id, username: req.user.username };
          comment.save().catch(err => handleError(err, req, res));
          // Add comment to spot
          spot.comment.push(comment);
          spot
            .save()
            .then(() => res.redirect(`/spots/${req.params.id}`))
            .catch(err => handleError(err, req, res));
        });
      })
      .catch(err => handleError(err, req, res));
  });
};

module.exports.editComment = (req, res) => {
  Spot.findById(req.params.id)
    .then(spot =>
      Comment.findById(req.params.comment_id)
        .then(comment => {
          res.render('comments/edit', { spot: spot, comment: comment });
        })
        .catch(err => handleError(err, req, res))
    )
    .catch(err => handleError(err, req, res));
};

module.exports.updateComment = (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, {
    author: req.body.author,
    text: req.body.text,
    wasEdited: true
  })
    .exec()
    .then(() => res.redirect(`/spots/${req.params.id}`))
    .catch(err => handleError(err, req, res));
};

module.exports.deleteComment = (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id)
    .then(() => res.redirect(`/spots/${req.params.id}`))
    .catch(err => handleError(err, req, res));
};
