const fs= require ("file-system");
const { MongoClient } = require("mongodb");
require("dotenv").config({path: "../.env"}
);
const { MONGO_URI } = process.env;
console.log(process.env.MONGO_URI)

const companies = JSON.parse(fs.readFileSync("./data/companies.json"));
const items = JSON.parse(fs.readFileSync("./data/items.json"));




//================================================

const batchImport = async () => {

  try {
    
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
   // console.log(client)


    await client.connect();
    const db = client.db("E-Commerce");


    // creating the companies collection in E-Commerce DB
    const result =  await db.collection("companies").insertMany(companies);
console.log(result)
     // creating the items collection in E-Commerce DB
     await db.collection("items").insertMany(items);
     console.log("finished")


      //colose
    //  client.close();

} catch(err) {
console.log("Error")
     console.log(err.message);
}


}

 batchImport();