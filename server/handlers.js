const { MongoClient } = require("mongodb");

// fetch uri from .env
require("dotenv").config({ path: "../.env" });
const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//===================================================
//get all items
const getItems = async (req, res) => {
  // declare the client
  const client = new MongoClient(MONGO_URI, options);
  try {
    //connect on every request
    await client.connect();
    const db = client.db("E-Commerce");

    // get all the items
    // we might need to retrieve only item ids or implement pagination
    const data = await db.collection("items").find().toArray();

    data
      ? res.status(200).json({ status: 200, data })
      : res.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    // close the connection to the database server
    await client.close();
  }
};

//=========================================================//

//get single item
const getItem = async (req, res) => {
  
    // declare the client
    const client = new MongoClient(MONGO_URI, options);
    const _id= req.params.id;
    try {
      //connect on every request
      await client.connect();
      const db = client.db("E-Commerce");
  
      // get one item
      const data = await db.collection("items").findOne({ _id: Number(_id) });
  
      data
        ? res.status(200).json({ status: 200, data })
        : res.status(404).json({ status: 404, data: "Not Found"});
    } catch (err) {
      console.log(err.stack);
    } finally {
      // close the connection to the database server
      await client.close();
    }
  };
  


//==============================================================
//get all companies
const getCompanies = async (req, res) => {

    // declare the client
    const client = new MongoClient(MONGO_URI, options);
    try {
      //connect on every request
      await client.connect();
      const db = client.db("E-Commerce");
  
      // get one item
      const data = await db.collection("companies").find().toArray();
  
      data
        ? res.status(200).json({ status: 200, data })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
      console.log(err.stack);
    } finally {
      // close the connection to the database server
      await client.close();
    }
  };
  



//=============================================================

//get single company
const getCompany = async (req, res) => {

  
         // declare the client
      const client = new MongoClient(MONGO_URI, options);
      const _id= req.params.id;

      try {
        //connect on every request
        await client.connect();
        const db = client.db("E-Commerce");
    
        // get one item
        const data = await db.collection("companies").findOne({ _id: Number(_id) });
    
        data
          ? res.status(200).json({ status: 200, data })
          : res.status(404).json({ status: 404, data: "Not Found" });
      } catch (err) {
        console.log(err.stack);
      } finally {
        // close the connection to the database server
        await client.close();
      }
    };
    


//=============================================================

module.exports = { getItems,getItem,getCompanies,getCompany };
