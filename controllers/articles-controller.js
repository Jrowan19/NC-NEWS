const { selectArticleByID, updateArticleByID, selectCommentByID, insertComment } = require('../models/articles-model')



exports.sendArticleByID = (req, res, next) => {
    selectArticleByID(req.params)
        .then(article => {
            res.status(200).send({ article });
        })
        .catch(next)
}

exports.patchArticleByID = (req, res, next) => {
    updateArticleByID(req.params, req.body)
        .then(article => {
            res.status(200).send({ article })
        })
        .catch(next)
}

exports.postComment = (req, res, next) => {
    insertComment(req.params, req.body)
        .then(comment => {
            res.status(201).send({ comment });
        })
        .catch(next);
}


exports.sendCommentByID = (req, res, next) => {
    selectCommentByID(req.params, req.query)
        .then(comments => {
            res.status(200).send({ comments })
        })
        .catch(next)

}

exports.sendArticles = (req, res, next) => {
    selectArticles()

}
