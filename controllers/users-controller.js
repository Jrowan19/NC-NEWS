const {
  getUserByID,
  getUsers,
  insertUser,
  removeUser
} = require('../models/users-model');

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

exports.postUser = (req, res, next) => {
  insertUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.deleteUser = (req, res, next) => {
  removeUser(req.params)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
