import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "./config/config-passport.js";
import "dotenv/config";
import contactsRouter from "./routing/contacts.js";
import usersRouter from "./routing/users.js";
import fs from "fs/promises";

import { uploadDir } from "./config/config-multer.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use(express.static("public"));

app.use((_, res, __) => {
  res.json({
    status: "error",
    code: 404,
    message: "404 not found",
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
// const uriDb = `mongodb://${user}:${password}@mongo:27017/${dbName}`; To ścieżka dla kontenera
const uriDb = `mongodb+srv://${user}:${password}@${hostDB}/?retryWrites=true&w=majority`;

const isAccessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const connection = async () => {
  try {
    await mongoose.connect(uriDb, { dbName });
    console.log("Database connection successful");

    app.listen(PORT, () => {
      createFolderIsNotExist(uploadDir);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

connection();
