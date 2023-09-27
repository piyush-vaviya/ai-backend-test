const mongoose = require("mongoose");

let db = null;
const connectToDb = async () => {
  if (db) return db;

  db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });
  console.log("Connected to DB", db.connection.name);

  return db;
};

module.exports = { connectToDb, db };
