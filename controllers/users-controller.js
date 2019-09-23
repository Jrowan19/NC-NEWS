const { getUserByID, getUsers } = require('../models/users-model');

exports.sendUserByID = (req, res, next) => {
  getUserByID(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};
