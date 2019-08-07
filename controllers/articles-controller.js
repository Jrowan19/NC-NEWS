const { getArticleByID, updateArticleByID } = require('../models/articles-model')


exports.sendArticleByID = (req, res, next) => {
    getArticleByID(req.params)
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

