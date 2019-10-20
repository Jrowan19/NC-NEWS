const { getUserByID, insertUser } = require('../models/users-model');

//getUsers,
exports.sendUserByID = (req, res, next) => {
  getUserByID(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

// exports.sendUsers = (req, res, next) => {
//   getUsers()
//     .then(users => {
//       res.status(200).send({ users });
//     })
//     .catch(next);
// };

exports.postUser = (req, res, next) => {
  insertUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(next);
};
