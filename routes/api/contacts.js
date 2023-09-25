import express from "express";
import Joi from "joi";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";
const router = express.Router();

const contactSchemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$"))
    .required(),
});
const contactSchemaPut = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")),
});

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
      return res
        .status(404)
        .json({ message: "Not Found", status: "error", code: 404 });
    }
    res.json({
      message: "contact found",
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (err) {
    console.error("Error while reading contacts", err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    const { error } = contactSchemaPost.validate(body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        status: 'error',
        code: 400,
        details: error.details,
      });
    }
    const contact = await addContact(body);
    res.json({
      message: "contact added",
      status: "success",
      code: 201,
      data: { contact },
    });
  } catch (err) {
    console.error("Error while posting contacts");
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await removeContact(id);
    if (!contact) {
      return res.json({ message: "Not Found", status: "error", code: 404 });
    }
    res.json({ message: "contact deleted" });
  } catch (err) {
    console.error("Error while deleting contacts");
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const { error } = contactSchemaPut.validate(body);

    if (error) {
      return res.status(400).json({
        message: `missing required field`,
        status: "error",
        code: 400,
      });
    }

    const contact = await getContactById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
        status: "error",
        code: 404,
      });
    }

    const updatedContact = await updateContact(id, body);
    console.log("Contact updated:", updatedContact);

    res.json({
      message: "Contact updated",
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (err) {
    console.error("Error while updating contacts:", err);
    next(err);
  }
});

export default router;
