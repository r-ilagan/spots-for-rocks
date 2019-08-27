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
        comment.author = { id: req.user._id, username: req.user.username };
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

module.exports.editComment = (req, res) => {
  Spot.findById(req.params.id)
    .then(spot =>
      Comment.findById(req.params.comment_id)
        .then(comment => {
          res.render('comments/edit', { spot: spot, comment: comment });
        })
        .catch(err =>
          console.log('Editing comment (find comment): ', err.message)
        )
    )
    .catch(err => console.log('Editing comment (find spot): ', err.message));
};

module.exports.updateComment = (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, {
    author: req.body.author,
    text: req.body.text,
    wasEdited: true
  })
    .exec()
    .then(() => res.redirect(`/spots/${req.params.id}`))
    .catch(err => console.log('Update comment: ', err.message));
};

module.exports.deleteComment = (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id)
    .then(() => res.redirect(`/spots/${req.params.id}`))
    .catch(err => console.log('Deleting commment: ', err.message));
};
