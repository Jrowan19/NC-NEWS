const connection = require('../db/connection.js')


exports.getUsersByUsername = () => {
    return connection()

}