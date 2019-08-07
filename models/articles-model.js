const connection = require('../db/connection.js')


exports.getArticleByID = ({ article_id }) => {
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
    //req.params && req.body

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


