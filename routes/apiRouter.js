const apiRouter = require('express').Router();
const articlesRouter = require('./articlesRouter')
const { methodNotFound } = require("../errors");

apiRouter.use('/articles', articlesRouter)

apiRouter.get('/', (req, res, next) => {
    res.status(200).send({ msg: 'you have reached the api router' })
        .all(methodNotFound)
})

module.exports = apiRouter
