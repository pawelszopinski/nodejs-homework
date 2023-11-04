import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

import routerAPI from "./routing/index.js";
app.use("/api/contacts", routerAPI);

app.use((_, res, __) => {
  res.json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
const password = encodeURIComponent(process.env.PASSWORD);
const user = process.env.USER;
const hostDB = process.env.HOST;
const dbName = process.env.DB_NAME;

const uriDb = `mongodb+srv://${user}:${password}@${hostDB}/?retryWrites=true&w=majority`;

const connection = async () => {
  try {
    await mongoose.connect(uriDb, { dbName });
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

connection();
