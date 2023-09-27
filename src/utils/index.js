const queryParamsMongo = require("query-params-mongo");
const { NOT_VALID } = require("./messages");
const { default: mongoose } = require("mongoose");

const transformQuery = queryParamsMongo({
  autoDetect: [{ fieldPattern: /_id$/, dataType: "objectId" }],
  converters: { objectId: mongoose.Schema.ObjectId },
});

const validateValues = (data) => {
  for (const arg of Object.keys(data)) {
    if (!data?.[arg]?.trim?.()?.length) throw new Error(NOT_VALID(arg));
  }

  return true;
};

module.exports = { validateValues, transformQuery };
