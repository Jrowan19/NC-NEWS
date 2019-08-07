const articlesRouter = require('express').Router()
const { sendArticleByID, patchArticleByID } = require('../controllers/articles-controller')
const { methodNotFound } = require('../errors')


articlesRouter.route('/:article_id')
    .get(sendArticleByID)
    .patch(patchArticleByID)
    .all(methodNotFound);

module.exports = articlesRouter