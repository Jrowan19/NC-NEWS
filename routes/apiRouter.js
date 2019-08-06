const apiRouter = require('express').Router();
//const articlesRouter = require('./articlesRouter')
const topicsRouter = require('../routes/topicsRouter')
//const commentsRouter = require('../routes/commentsRouter')
const usersRouter = require('../routes/usersRouter')
const { methodNotFound } = require("../errors");

apiRouter.use('/topics', topicsRouter)
// apiRouter.use('/articles', articlesRouter)
// apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)


apiRouter.get('/', (req, res, next) => {
    res.status(200).send({ msg: 'you have reached the api router' })
        .all(methodNotFound)
})

module.exports = apiRouter
