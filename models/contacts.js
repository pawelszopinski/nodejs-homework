import path from "path";
import { readFile } from "fs/promises";

const contactsPath = path.join("models", "contacts.json");
export const listContacts = async () => {
  try {
    const data = await readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Can't read contacts properly");
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return false;
    }
    return contact;
  } catch (err) {
    console.error("Error while reading contacts by id");
    throw err;
  }
};

export const removeContact = async (contactId) => {};

export const addContact = async (body) => {};

export const updateContact = async (contactId, body) => {};
