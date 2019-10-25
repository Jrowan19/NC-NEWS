const connection = require('../db/connection.js');

exports.getUserByID = ({ username }) => {
  return connection
    .select('*')
    .from('users')
    .where('username', username)
    .returning('*')
    .then(usernameData => {
      if (usernameData.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `${username} does not exist`
        });
      } else return usernameData[0];
    });
};

exports.getUsers = () => {
  return connection('users')
    .select('*')
    .from('users');
};

exports.insertUser = ({ username, name, avatar_url }) => {
  return connection('users')
    .insert({ username, name, avatar_url })
    .returning('*')
    .then(userData => {
      if (!userData)
        return Promise.reject({ status: 404, msg: 'User Not Found' });
      else return userData[0];
    });
};

exports.removeUser = ({ username }) => {
  return connection('users')
    .where({ username })
    .delete()
    .then(result => {
      return result;
    });
};
