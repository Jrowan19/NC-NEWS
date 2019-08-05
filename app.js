const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const {
    routeError,
    serverError,
    SQLerrors,
    customErrors
} = require("./errors.js");

app.use(express.json());

app.use("/api", apiRouter);

app.use(SQLerrors);
app.use(customErrors);
app.use(serverError);
app.all("/*", routeError);

module.exports = app;
