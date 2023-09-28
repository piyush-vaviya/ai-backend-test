// Routes to "/v1/product"

const { productController } = require("../../controllers");
const Router = require("../../utils/Router");
const { MAPPERS } = require("../../utils/constants");
const mappedController = require("../../utils/controllerMapper");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    return cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const productRouter = new Router();
const upload = multer({ storage });

productRouter.get(
  "/:id",
  mappedController(productController.getProduct, MAPPERS.PARAMS)
);
productRouter.post(
  "/",
  mappedController(productController.createProduct, MAPPERS.DATA)
);
productRouter.post(
  "/:id/upload",
  upload.single("file"),
  mappedController(productController.uploadFile, MAPPERS.PARAMS, MAPPERS.FILE)
);
productRouter.put(
  "/:id",
  mappedController(
    productController.updateProduct,
    MAPPERS.PARAMS,
    MAPPERS.DATA
  )
);
productRouter.delete(
  "/:id",
  mappedController(productController.deleteProduct, MAPPERS.PARAMS)
);
productRouter.get(
  "/",
  mappedController(productController.listProducts, MAPPERS.QUERY)
);

module.exports = productRouter.router;
