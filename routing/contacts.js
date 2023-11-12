import express from "express";
import * as ctrlContact from "../controller/contacts.js";
import { create } from "../controllers/contacts/createContact.js";
import { get } from "../controllers/contacts/indexContacts.js";
import { getById } from "../controllers/contacts/showContact.js";
import * as updateStatusJs from "../controllers/contacts/updateStatus.js";
const router = express.Router();

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", create);

router.put("/:contactId", ctrlContact.update);

router.patch("/:contactId/favorite", updateStatusJs.updateStatus);

router.delete("/:contactId", ctrlContact.remove);

export default router;
