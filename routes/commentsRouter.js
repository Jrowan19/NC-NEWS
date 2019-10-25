const commentsRouter = require('express').Router();
const {
  patchCommentByCommentID,
  deleteCommentByID
} = require('../controllers/comments-controller');
const { methodNotFound } = require('../errors');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentByCommentID)
  .delete(deleteCommentByID)
  .all(methodNotFound);

module.exports = commentsRouter;
