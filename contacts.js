const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      throw new Error(err);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      throw new Error(err);
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (contact) => String(contact.id) === contactId
    );
    console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      throw new Error(err);
    }
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => String(contact.id) !== contactId
    );
    changeContacts(contactsPath, filteredContacts);
    console.log(`The contact with id: ${contactId} was deleted!`);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      throw new Error(err);
    }

    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    const newContacts = [...contacts, newContact];

    changeContacts(contactsPath, newContacts);

    console.log(`The contact ${newContact.name} was sucсessfully added!`);
  });
}

function changeContacts(path, newArray) {
  const contacts = JSON.stringify(newArray);
  fs.writeFile(path, contacts, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
