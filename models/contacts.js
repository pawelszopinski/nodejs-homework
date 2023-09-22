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

export const getContactById = async (contactId) => {};

export const removeContact = async (contactId) => {};

export const addContact = async (body) => {};

export const updateContact = async (contactId, body) => {};
