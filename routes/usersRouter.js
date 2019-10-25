const usersRouter = require('express').Router();
const {
  sendUserByID,
  sendUsers,
  postUser,
  deleteUser
} = require('../controllers/users-controller');
const { methodNotFound } = require('../errors');

usersRouter
  .route('/')
  .post(postUser)
  .get(sendUsers)
  .all(methodNotFound);

usersRouter
  .route('/:username')
  .get(sendUserByID)
  .delete(deleteUser)
  .all(methodNotFound);

module.exports = usersRouter;
