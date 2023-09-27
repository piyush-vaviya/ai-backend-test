// This router implements out of the box error handling for all of the synchronous and asynchronous middlewares and handlers!

const express = require("express");

const withError = (middleware) => async (req, res, next) => {
  try {
    const data = await middleware(req, res, next);

    return data;
  } catch (error) {
    console.log("Router experienced an error:", error);
    next(error);
  }
};

class Router {
  constructor(router) {
    router ??= express.Router();
    this.router = router;
  }

  #getHandledRouter(method, args) {
    const path = args[0];
    const hasPath = typeof path === "string";
    const middlewares = hasPath ? args.slice(1) : args;
    const mappedMiddlewares = middlewares.map((middleware, index) =>
      withError(middleware)
    );
    this.router?.[method]?.(
      ...(hasPath ? [path, ...mappedMiddlewares] : mappedMiddlewares)
    );
  }

  get(...args) {
    this.#getHandledRouter("get", args);
  }

  post(...args) {
    this.#getHandledRouter("post", args);
  }

  put(...args) {
    this.#getHandledRouter("put", args);
  }

  patch(...args) {
    this.#getHandledRouter("patch", args);
  }

  delete(...args) {
    this.#getHandledRouter("delete", args);
  }

  use(...args) {
    this.#getHandledRouter("use", args);
  }
}

module.exports = Router;
