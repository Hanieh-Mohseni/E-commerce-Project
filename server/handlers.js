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

    //find user with a provided email
    const data = await db.collection("users").findOne({ email });

    data
      ? res.status(200).json({ status: 200, data })
      : res.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

//signup logic
const signUp = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, firstName, lastName } = req.body;
  try {
    await client.connect();
    const db = client.db(DB_NAME);

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
    await client.close();
  }
};

//get paginated items
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { page } = req.query;
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    // get 10 items at once
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
    await client.close();
  }
};

//get single item
const getItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;
  try {
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
    await client.close();
  }
};

//get all companies
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("E-Commerce");

    const data = await db.collection("companies").find().toArray();

    data
      ? res.status(200).json({ status: 200, data })
      : res.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

//get single company
const getCompany = async (req, res) => {
  // declare the client
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;
  try {
    await client.connect();
    const db = client.db("E-Commerce");

    // get a single company
    const data = await db.collection("companies").findOne({ _id: Number(_id) });

    data
      ? res.status(200).json({ status: 200, data })
      : res.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

//add item in cart to user data
const addItemToCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId, item } = req.body;
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    //update user doc
    //this item already exists in user.cart arr
    //simple increment the amount of item by 1
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
      //this item doesn't exist in user.cart arr yet
      //push the item with the amount value of 1
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
    await client.close();
  }
};

//delete item from cart
const deleteItemFromCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId, itemId } = req.body;
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    //find an item and remove it from the cart arr
    const { modifiedCount } = await db.collection("users").updateOne(
      { _id: userId },
      {
        $pull: { cart: { _id: Number(itemId) } },
      }
    );

    modifiedCount
      ? res.status(200).json({
          status: 200,
          data: { ...req.body },
          message: "item removed from user cart",
        })
      : res.status(404).json({ status: 500, data: "Server Error" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

//buy item
const buyItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId, itemIds } = req.body;

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    // updating the number of item in stock
    const result = await Promise.all(
      itemIds.map(async (itemId) => {
        const { value: decValue } = await db
          .collection("items")
          .findOneAndUpdate(
            { _id: Number(itemId) },
            { $inc: { numInStock: -1 } }
          );
        // adding purchase prop
        const { value } = await db
          .collection("users")
          .findOneAndUpdate({ _id: userId }, { $push: { purchased: itemId } });

        return decValue && value;
      })
    );

    //reset user.cart value to emply arr
    const { value: cartVal } = await db
      .collection("users")
      .findOneAndUpdate({ _id: userId }, { $set: { cart: [] } });

    result && cartVal
      ? res.status(200).json({
          status: 200,
          data: { ...req.body },
          message: "Item Purchased",
        })
      : res.status(404).json({ status: 500, data: "Server Error" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

module.exports = {
  getItems,
  getItem,
  getCompanies,
  getCompany,
  signIn,
  signUp,
  addItemToCart,
  buyItem,
  deleteItemFromCart,
};
