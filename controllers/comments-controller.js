const { updateCommentByCommentID, removeCommentByID } = require('../models/comments-model')

exports.patchCommentByCommentID = (req, res, next) => {
    updateCommentByCommentID(req.params, req.body)
        .then(comment => {
            res.status(200).send({ comment })
        })
        .catch(next)
}


exports.deleteCommentByID = (req, res, next) => {
    removeCommentByID(req.params)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next);
};





