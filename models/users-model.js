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
