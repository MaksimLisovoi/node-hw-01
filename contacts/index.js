const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.find((contact) => contactId === contact.id);

  return result || null;
};

// const removeContact = async (contactId) => {};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return [result];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateById = async (id, { name, email, phone }) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id, name, email, phone };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, (err, data) => {
//     if (err) {
//       throw new Error(err);
//     }

//     const contacts = JSON.parse(data);
//     const newContact = { id: uuidv4(), name, email, phone };
//     const newContacts = [...contacts, newContact];

//     changeContacts(contactsPath, newContacts);

//     console.log(`The contact ${newContact.name} was sucсessfully added!`);
//   });
// }

function changeContacts(path, newArray) {
  const contacts = JSON.stringify(newArray);
  fs.writeFile(path, contacts, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
