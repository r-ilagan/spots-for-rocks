const express = require('express');
const commentController = require('../controller/comments');
const router = express.Router({ mergeParams: true });

// New route
router.get('/new', (req, res) => {
  commentController.newForm(req, res);
});

// Create route
router.post('/', (req, res) => {
  commentController.createComment(req, res);
});

module.exports = router;
