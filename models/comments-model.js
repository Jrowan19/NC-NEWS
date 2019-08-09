const connection = require('../db/connection.js')


exports.updateCommentByCommentID = ({ comment_id }, { inc_votes = 0 }) => {

    return connection
        .select('*')
        .from('comments')
        .where('comment_id', comment_id)
        .increment('votes', inc_votes)
        .returning('*')
        .then(commentData => {
            if (!commentData.length) return Promise.reject({ status: 404, msg: "Comment Not Found" });
            else return commentData
        })
}

exports.removeCommentByID = ({ comment_id }) => {
    return connection("comments")
        .where({ comment_id })
        .delete()
        .then(result => {
            if (result === 0) return Promise.reject({ status: 404, msg: "No Comment to Delete" });
            else return result
        });
};


