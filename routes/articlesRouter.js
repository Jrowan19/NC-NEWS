const articlesRouter = require('express').Router()
const { sendArticleByID, patchArticleByID, postComment, sendCommentByID, sendArticles } = require('../controllers/articles-controller')
const { methodNotFound } = require('../errors')


articlesRouter.route('/')
    .get(sendArticles)
    .all(methhodNotFound)


articlesRouter.route('/:article_id')
    .get(sendArticleByID)
    .patch(patchArticleByID)
    .all(methodNotFound)

articlesRouter.route('/:article_id/comments')
    .post(postComment)
    .get(sendCommentByID)
    .all(methodNotFound)

module.exports = articlesRouter