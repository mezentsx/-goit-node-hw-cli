const fs = require("fs/promises");
const path = require("path");
const { generate } = require("shortid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};
  
const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    console.log(`contact`, contact);
    return contact ? contact : null;
};
  
const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find((el) => {
        return el.id === contactId;
      });
    const newContactsList = contacts.filter((el) => {
        return el.id !== contactId;
      });
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    console.log(contact);
    return contact;
};
  
const addContact= async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { id: generate(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`Contact ${name} was add to contacts!`);
    console.table(contacts);
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};