const fs = require("file-system");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const companies = JSON.parse(fs.readFileSync("./data/companies.json"));
const items = JSON.parse(fs.readFileSync("./data/items.json"));

//================================================

const batchImport = async () => {
  try {
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db("E-Commerce");

    // creating the companies collection in E-Commerce DB
    const result = await db.collection("companies").insertMany(companies);
    // creating the items collection in E-Commerce DB
    await db.collection("items").insertMany(items);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

batchImport();
