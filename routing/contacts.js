import express from "express";
const router = express.Router();
import * as ctrlContact from "../controller/contacts.js";
import { get } from "../controllers/contacts/indexContacts.js";

router.get("/", get);

router.get("/:contactId", ctrlContact.getById);

router.post("/", ctrlContact.create);

router.put("/:contactId", ctrlContact.update);

router.patch("/:contactId/favorite", ctrlContact.updateStatus);

router.delete("/:contactId", ctrlContact.remove);

export default router;
