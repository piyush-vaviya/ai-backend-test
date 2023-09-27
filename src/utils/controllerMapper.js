const { MAPPERS, HTTP_STATUS } = require("./constants");

const mappedController =
  (controllerFunc, ...args) =>
  async (req, res, _next) => {
    const mappers = {
      [MAPPERS.DATA]: req.body,
      [MAPPERS.QUERY]: req.query,
      [MAPPERS.PARAMS]: req.params,
      [MAPPERS.USER]: req.user,
      [MAPPERS.FILE]: req.file,
    };
    const data = await controllerFunc(...args.map((arg) => mappers[arg]));
    res.status(HTTP_STATUS.OKAY).send(data);
  };

module.exports = mappedController;
