const { getUserByID } = require('../models/users-model')

exports.sendUserByID = (req, res, next) => {
    getUserByID(req.params)
        .then(user => {
            res.status(200).send({ user });
        })
        .catch(next);
};