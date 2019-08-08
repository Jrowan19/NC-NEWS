const connection = require('../db/connection.js')


exports.selectArticleByID = ({ article_id }) => {
    return connection
        .select('articles.*')
        .from('articles')
        .count("comment_id AS comment_count")
        .where("articles.article_id", article_id)
        .leftJoin("comments", "articles.article_id", "comments.article_id")
        .groupBy("articles.article_id")
        .then(articleData => {
            if (!articleData.length) return Promise.reject({ status: 404, msg: "Article Not Found" });
            else return articleData[0]
        });
};

exports.updateArticleByID = ({ article_id }, { inc_votes = 0 }) => {
    return connection
        .increment('votes', inc_votes)
        .from('articles')
        .where(' article_id', article_id)
        .returning('*')
        .then(articleData => {
            if (!articleData.length) return Promise.reject({ status: 404, msg: "Article Not Found" });
            else return articleData[0]
        })
}

exports.insertComment = ({ article_id }, { username, body }) => {
    return connection('comments')
        .insert({ article_id, author: username, body })
        .returning('*')
        .then(commentData => {
            if (!commentData) return Promise.reject({ status: 404, msg: "Comment Not Found" });
            else return commentData[0]
        })
}

exports.selectCommentByID = ({ article_id }, { sort_by = 'created_at', order = 'desc' }) => {
    return connection
        .select("comments.*")
        .from('comments')
        .join('articles', 'comments.article_id', 'articles.article_id')
        .orderBy(sort_by, order)
        .where('comments.article_id', article_id)
        .returning('*')
        .then(comments => {
            if (!comments.length) {
                return Promise.reject({ status: 404, msg: 'Comment not found' })
            } else return comments
        })
};


