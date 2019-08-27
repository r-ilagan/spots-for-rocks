const express = require('express');
const commentController = require('../controller/comments');
const middleware = require('../middlewares/index');
const router = express.Router({ mergeParams: true });

// New route
router.get('/new', middleware.isLoggedIn, (req, res) => {
  commentController.newForm(req, res);
});

// Create route
router.post('/', (req, res) => {
  commentController.createComment(req, res);
});

// Edit route
router.get('/:comment_id/edit', (req, res) => {
  commentController.editComment(req, res);
});

// Update route
router.put('/:comment_id', (req, res) => {
  commentController.updateComment(req, res);
});

// Delete route
router.delete('/:comment_id', (req, res) => {
  commentController.deleteComment(req, res);
});

module.exports = router;
