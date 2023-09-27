require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db");
const appRouter = require("./routes");

const initializeServer = async () => {
  await connectToDb();

  const app = express();
  const port = process.env.PORT;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", appRouter);

  app.listen(port, () => {
    console.log(`Server running successfully at ${port}`);
  });
};

initializeServer().catch(console.error);
