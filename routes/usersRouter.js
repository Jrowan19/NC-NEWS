const usersRouter = require('express').Router();
const { sendUserByID, sendUsers } = require('../controllers/users-controller');
const { methodNotFound } = require('../errors');

usersRouter
  .route('/')
  .get(sendUsers)
  .all(methodNotFound);

usersRouter
  .route('/:username')
  .get(sendUserByID)
  .all(methodNotFound);

module.exports = usersRouter;
