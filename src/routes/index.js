// Routes to "/"

const Router = require("../utils/Router");
const v1Router = require("./v1");

const appRouter = new Router();

appRouter.use("/v1", v1Router);

module.exports = appRouter.router;
