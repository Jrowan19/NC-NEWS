const json = require("../endpoints.json");

const getApiJson = (req, res, next) => {
    res.status(200).send(json);
};

module.exports = getApiJson;