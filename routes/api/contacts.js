import express from "express";
import { listContacts } from "../../models/contacts.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      message: "ok",
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    console.error("Can't read your contacts");
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.json({ message: "Not Found", status: "error", code: 404 });
    }
    res.json({
      message: "contact found",
      status: "success",
      code: 200,
      data: contact,
    });
  } catch {
    console.error("Error while reading contacts");
    next(err);
  }
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

export default router;
