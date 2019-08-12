const apiRouter = require('express').Router();
const articlesRouter = require('./articlesRouter')
const topicsRouter = require('../routes/topicsRouter')
const commentsRouter = require('../routes/commentsRouter')
const usersRouter = require('../routes/usersRouter')
const { methodNotFound } = require("../errors");
const getApiJson = require("../controllers/api-controller");

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)


apiRouter.route('/')
    .get(getApiJson)
    .all(methodNotFound)


module.exports = apiRouter
