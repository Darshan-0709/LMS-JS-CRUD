import table from "../Components/table.js";

const product = (() => {
  let products = [];

  try {
    products = JSON.parse(localStorage.getItem("products")) || [];
  } catch (e) {}

  let n = localStorage.getItem("id") || 100;

  const product = {
    id: "",
    name: "",
    description: "",
    price: "",
    images: [],
  };

  const populateObject = (values) => {
    const newProduct = { ...product };
    for (const key in newProduct) {
      product[key] = values[key];
    }
    return newProduct;
  };

  const updateId = () => {
    localStorage.setItem("id", n);
  };

  const pushProduct = (product) => {
    console.log({ products });
    products.push({ ...product, id: n++ });
    const productContainer = document.querySelector(
      "[data-table-container='product']"
    );
    if (productContainer) {
      const productsListElement = table(returnAllProducts());
      productContainer.replaceChildren(productsListElement);
      storeAllToLocalStorage();
      updateId();
    }
  };

  const storeAllToLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const handleDelete = (id) => {
    products = products.filter((product) => product.id !== id);
    storeAllToLocalStorage();
    return products;
  };

  const handleUpdate = (id, newProduct) => {
    const oldProduct = products.find((product) => id === product.id);

    if (!oldProduct) {
      return false;
    }
    for (let key in oldProduct) {
      oldProduct[key] = newProduct[key];
    }
    return true;
  };

  const returnAllProducts = (filter) => {
    if (!filter) {
      return products;
    }
    let filteredProducts = products;
    console.log(filteredProducts);
    for (let key in filter) {
      if (key == "images") continue;
      console.log({ key: [key], value: filter });
      filteredProducts = filteredProducts.filter((product) => {
        if (!product[key]) return false;
        return (
          product[key]
            .toString()
            .toLowerCase()
            .indexOf(filter[key].toLowerCase()) >= 0
        );
      });
    }
    console.log(filteredProducts);
    return filteredProducts;
  };

  const returnProduct = (id) => {
    return { ...products.find((product) => product.id == id) };
  };

  return {
    createEmptyProduct: () => {
      return { ...product, images: [] };
    },
    populateProduct: populateObject,
    addProduct: pushProduct,
    getAllProducts: returnAllProducts,
    deleteProduct: handleDelete,
    getProduct: returnProduct,
    updateProduct: handleUpdate,
  };
})();

export default product;
