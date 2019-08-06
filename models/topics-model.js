const connection = require('../db/connection.js')

exports.getTopics = () => {
    return connection('topics')
        .select('*')
        .from('topics')

}

