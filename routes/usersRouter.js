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
  .delete(deleteUser)
  .all(methodNotFound);

usersRouter
  .route('/:username')
  .get(sendUserByID)

  .all(methodNotFound);

module.exports = usersRouter;
