const { Command } = require("commander");
const program = new Command();
const contacts = require("./contacts/index");

console.log(contacts);

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const data = await contacts.listContacts();
      console.log(data);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "delete":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    case "update":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      console.log(updateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
