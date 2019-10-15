const {
  selectArticleByID,
  updateArticleByID,
  selectCommentByID,
  insertComment,
  selectAllArticles
} = require('../models/articles-model');

exports.sendArticleByID = (req, res, next) => {
  selectArticleByID(req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleByID = (req, res, next) => {
  updateArticleByID(req.params, req.body)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  insertComment(req.params, req.body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.sendCommentByID = (req, res, next) => {
  selectArticleByID(req.params)
    .then()
    .catch(next);
  selectCommentByID(req.params, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.sendAllArticles = (req, res, next) => {
  selectAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
