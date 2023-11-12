import express from "express";
import { create } from "../controllers/contacts/createContact.js";
import { get } from "../controllers/contacts/indexContacts.js";
import { getById } from "../controllers/contacts/showContact.js";
import {update} from "../controllers/contacts/updateContact.js"
import {updateStatus} from "../controllers/contacts/updateStatus.js";
import {remove} from "../controllers/contacts/deleteContact.js"
const router = express.Router();

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", create);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatus);

router.delete("/:contactId", remove);

export default router;
