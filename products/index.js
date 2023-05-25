const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const productsPath = path.join(__dirname, "products.json");

const listProducts = async () => {
  const data = await fs.readFile(productsPath, "utf-8");

  return JSON.parse(data);
};

const getProductById = async (productId) => {
  const products = await listProducts();

  const result = products.find((product) => productId === product.id);

  return result || null;
};

// const removeproduct = async (productId) => {};

const removeProduct = async (productId) => {
  const products = await listProducts();

  const index = products.findIndex((item) => item.id === productId);

  if (index === -1) {
    return null;
  }

  const [result] = products.splice(index, 1);

  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));

  return [result];
};

const addProduct = async (type, price, name, category, isBestseller) => {
  const products = await listProducts();
  const newproduct = {
    id: uuidv4(),
    type,
    price,
    name,
    category,
    isBestseller,
  };
  products.push(newproduct);

  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));

  return newproduct;
};

const updateById = async (id, { name, email, phone }) => {
  const products = await listProducts();

  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = { id, name, email, phone };

  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));

  return products[index];
};

function changeProducts(path, newArray) {
  const products = JSON.stringify(newArray);
  fs.writeFile(path, products, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}

module.exports = {
  listProducts,
  getProductById,
  removeProduct,
  addProduct,
  updateById,
};
