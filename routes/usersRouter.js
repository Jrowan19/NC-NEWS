const usersRouter = require('express').Router()
const { sendUserByID } = require('../controllers/users-controller')
const { methodNotFound } = require('../errors')

usersRouter.route('/:username')
    .get(sendUserByID)
    .all(methodNotFound);

module.exports = usersRouter