// Routes to "/v1"

const Router = require("../../utils/Router");
const productRouter = require("./product");

const v1Router = new Router();

v1Router.use("/product", productRouter);

module.exports = v1Router.router;
