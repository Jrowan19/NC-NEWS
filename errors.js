exports.routeError = (req, res) => {
    res.status(404).send({ msg: 'route not found' });
}

exports.customErrors = (err, req, res, next) => {
    if (err.status) res.status(err.status).send({ msg: err.msg });
    else next(err);
}

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code) {
        const codes = {
            "22P02": { status: 400, msg: 'Invalid text representation' },
            23502: { status: 400, msg: 'Not null violation' },
            23503: { status: 404, msg: 'Foreign key violation' },
            42703: { status: 400, msg: 'Undefined column' },
        }
        res.status(codes[err.code].status).send({ msg: codes[err.code].msg })
    }
    else next(err);
}

exports.methodNotFound = (req, res) => {
    res.status(405).send({ msg: 'method not allowed' });
}

exports.serverError = (err, req, res, next) => {
    res.status(500).send({
        msg: "internal server error"
    });
};