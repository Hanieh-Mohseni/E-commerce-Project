const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

// fetch uri from .env
require("dotenv").config({ path: "../.env" });
const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//signin logic
const signIn = async (req, res) => {
  // declare the client
  const client = new MongoClient(MONGO_URI, options);
  const { email } = req.body;
  try {
    //connect on every request
    await client.connect();
    const db = client.db(DB_NAME);

    // get all the items
    // we might need to retrieve only item ids or implement pagination
    const data = await db.collection("users").findOne({ email });

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

//signup logic
const signUp = async (req, res) => {
  // declare the client
  const client = new MongoClient(MONGO_URI, options);
  const { email, firstName, lastName } = req.body;
  try {
    //connect on every request
    await client.connect();
    const db = client.db(DB_NAME);

    // add a new reservation
    const id = uuidv4();
    const { acknowledged } = await db.collection("users").insertOne({
      _id: id,
      email,
      firstName,
      lastName,
    });

    acknowledged
      ? res.status(200).json({
          status: 200,
          data: { ...req.body, id },
          message: "created new user",
        })
      : res.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    // close the connection to the database server
    await client.close();
  }
};

//get all items
const getItems = async (req, res) => {
  // declare the client
  const client = new MongoClient(MONGO_URI, options);
  const { page } = req.query;
  try {
    //connect on every request
    await client.connect();
    const db = client.db(DB_NAME);

    // get all the items
    // we might need to retrieve only item ids or implement pagination
    const data = await db
      .collection("items")
      .find()
      .skip(page > 0 ? (page - 1) * 10 : 0)
      .limit(10)
      .toArray();

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
  const _id = req.params.id;
  try {
    //connect on every request
    await client.connect();
    const db = client.db("E-Commerce");

    // get one item
    const data = await db.collection("items").findOne({ _id: Number(_id) });

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
  const _id = req.params.id;

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

//add item in cart to user data
const addItemToCart = async (req, res) => {
  // declare the client
  const client = new MongoClient(MONGO_URI, options);
  const { userId, item } = req.body;
  try {
    //connect on every request
    await client.connect();
    const db = client.db(DB_NAME);

    const { value } = await db.collection("users").findOneAndUpdate(
      { _id: userId, "cart._id": item._id },
      {
        $inc: { "cart.$.amount": 1 },
      }
    );

    if (value) {
      res.status(200).json({
        status: 200,
        data: { ...req.body },
        message: "item added to user cart",
      });
    } else {
      const { value } = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: userId },
          { $push: { cart: { ...item, amount: 1 } } }
        );

      value
        ? res.status(200).json({
            status: 200,
            data: { ...req.body },
            message: "item added to user cart",
          })
        : res.status(404).json({ status: 500, data: "Server Error" });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    // close the connection to the database server
    await client.close();
  }
};

//buy item
const buyItem = async (req, res) => {
  // declare the client
  const client = new MongoClient(MONGO_URI, options);
  const { userId, itemId } = req.body;
  console.log(userId, itemId);
  try {
    //connect on every request
    await client.connect();
    const db = client.db(DB_NAME);

    // updating the number of item in stock
    const { value: decValue } = await db
      .collection("items")
      .findOneAndUpdate({ _id: Number(itemId) }, { $inc: { numInStock: -1 } });

    // adding purchase prop
    const { value } = await db
      .collection("users")
      .findOneAndUpdate({ _id: userId }, { $push: { purchased: itemId } });

    decValue && value
      ? res.status(200).json({
          status: 200,
          data: { ...req.body },
          message: "Item Purchased",
        })
      : res.status(404).json({ status: 500, data: "Server Error" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    // close the connection to the database server
    await client.close();
  }
};

//=============================================================

module.exports = {
  getItems,
  getItem,
  getCompanies,
  getCompany,
  signIn,
  signUp,
  addItemToCart,
  buyItem,
};
