const connection = require('../db/connection.js');

exports.selectArticleByID = ({ article_id }) => {
  return connection
    .select('articles.*')
    .from('articles')
    .count('comment_id AS comment_count')
    .where('articles.article_id', article_id)
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .then((articleData) => {
      if (!articleData.length)
        return Promise.reject({
          status: 404,
          msg: `Article ${article_id} Not Found`,
        });
      else return articleData[0];
    });
};

exports.updateArticleByID = ({ article_id }, { inc_votes = 0 }) => {
  return connection
    .select('*')
    .from('articles')
    .where(' article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then((articleData) => {
      if (!articleData.length)
        return Promise.reject({
          status: 404,
          msg: `Article ${article_id} Not Found`,
        });
      else return articleData;
    });
};

exports.insertComment = ({ article_id }, { username, body }) => {
  return connection('comments')
    .insert({ article_id, author: username, body })
    .returning('*')
    .then((commentData) => {
      if (!commentData)
        return Promise.reject({ status: 404, msg: 'Comment Not Found' });
      else return commentData[0];
    });
};

exports.selectCommentByID = (
  { article_id },
  { sort_by = 'created_at', order = 'desc' }
) => {
  return connection
    .select('comments.*')
    .from('comments')
    .join('articles', 'comments.article_id', 'articles.article_id')
    .orderBy(sort_by, order)
    .limit(limit)
    .offset(p * limit - limit)
    .where('comments.article_id', article_id)
    .returning('*');
};

exports.selectAllArticles = ({
  sort_by = 'created_at',
  order = 'desc',
  author,
  topic,
  limit = 10,
  p,
}) => {
  if (!Number(limit) || limit < 0)
    return Promise.reject({
      status: 400,
      msg: 'Limit must be a positive number',
    });
  if ((p && !Number(p)) || (p && p < 0))
    return Promise.reject({ status: 400, msg: 'p must be a positive number' });
  if (order === 'asc' || order === 'desc') {
    return connection('articles')
      .select(
        'articles.author',
        'title',
        'articles.article_id',
        'topic',
        'articles.created_at',
        'articles.votes'
      )
      .count({ comment_count: 'comments' })
      .leftJoin('comments', 'articles.article_id', 'comments.article_id')
      .groupBy('articles.article_id')
      .orderBy(sort_by, order)
      .limit(limit)
      .offset(p * limit - limit)
      .modify((query) => {
        if (author) {
          query.where('articles.author', author);
        }
        if (topic) {
          query.where('articles.topic', topic);
        }
      })
      .then((articles) => {
        if (!articles.length && author) {
          return Promise.reject({ status: 404, msg: 'Author not found' });
        } else if (!articles.length && topic) {
          return Promise.reject({ status: 404, msg: 'Topic not found' });
        }
        return articles;
      });
  }
};
