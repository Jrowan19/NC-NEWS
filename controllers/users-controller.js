const { getUsersByUsername } = require('../models/users-model')

exports.sendUsersByusername = (req, res, next) => {
    getUsersByUsername()
        .then()

}