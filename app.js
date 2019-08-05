const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
    routeError,
    serverError,
    handlePsqlErrors,
    customErrors
} = require("./errors.js");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePsqlErrors);
app.use(customErrors);
app.use(serverError);
app.all("/*", routeError);

module.exports = app;
