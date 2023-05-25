const { Command } = require("commander");
const program = new Command();
const products = require("./products/index");

// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);

// console.log(arr);

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "product id")
  .option("-t, --type <type>", "product type")
  .option("-p, --price <type>", "product price")
  .option("-n, --name <type>", "product name")
  .option("-c, --category <type>", "product category")
  .option("-b, --isBestseller <type>", "product isBestseller");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({
  action,
  id,
  type,
  price,
  name,
  category,
  isBestseller,
}) => {
  switch (action) {
    case "list":
      const data = await products.listProducts();
      console.log(data);
      break;

    case "get":
      const productId = String(id);
      const product = await products.getProductById(productId);
      console.log(product);
      break;

    case "add":
      const newProduct = await products.addProduct(
        type,
        Number(price),
        name,
        category,
        Boolean(isBestseller)
      );
      console.log(newProduct);
      break;

    case "delete":
      const deleteProduct = await products.removeProduct(id);
      console.log(deleteProduct);
      break;

    case "update":
      const updateProduct = await products.updateById(id, {
        name,
        email,
        phone,
      });
      console.log(updateProduct);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
