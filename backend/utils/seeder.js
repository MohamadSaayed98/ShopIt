const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/products.json");

//setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seederProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All products are added");

    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

seederProducts();