const express = require('express');
const commentController = require('../controller/comments');
const middleware = require('../middlewares/index');
const router = express.Router({ mergeParams: true });

// New route
router.get('/new', middleware.isLoggedIn, (req, res) => {
  commentController.newForm(req, res);
});

// Create route
router.post('/', middleware.isLoggedIn, (req, res) => {
  commentController.createComment(req, res);
});

// Edit route
router.get(
  '/:comment_id/edit',
  middleware.checkCommentOwnership,
  (req, res) => {
    commentController.editComment(req, res);
  }
);

// Update route
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  commentController.updateComment(req, res);
});

// Delete route
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  commentController.deleteComment(req, res);
});

module.exports = router;
