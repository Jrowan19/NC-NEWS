const articlesRouter = require('express').Router()

articlesRouter.get('/', (req, res, next) => {
    console.log({ msg: 'you have reached the article router' })
})

module.exports = articlesRouter