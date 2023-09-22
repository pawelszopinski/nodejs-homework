const express = require("express");
import { listContacts } from "../../models/contacts";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      message: "ok",
      status: "success",
      code: 200,
      data: contacts
    })
  } catch (error) {
    console.error("Can't read your contacts (routing)")
    next(error)
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default router
