exports.methodNotFound = (req, res, next) => {
    res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code) {
        const psqlBadRequestCodes = {
            42703: err.message,
            23503: err.message,
            "22P02": err.message
        }
        res.status(400).send({
            message: psqlBadRequestCodes[err.code] || 'Bad Request'
        });
    }
    else next(err)
}
exports.routeError = (req, res, next) => {
    res.status(404).send({
        msg: "Route Not Found"
    });
};

exports.customErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({
            message: err.msg
        });
    } else {
        next(err);
    }
};
exports.serverError = (err, req, res, next) => {
    res.status(500).send({
        msg: "internal server error"
    });
};
