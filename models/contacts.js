import path from "path"
import { readFile } from "fs/promises";

const contactsPath = path.join("models", "contacts.json" )
export const listContacts = async () => {
try {
  const data = await readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
} catch (error) {
  console.error("Can't read contacts properly")
  throw error
}
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
