import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("VisiRideDB"); // select database

//////////////////////////////////////////
// User Functions
//////////////////////////////////////////

// Get all users
async function getUsers() {
  console.log(">>> db.js -> getUsers")
  let users = [];
  try {
    const collection = db.collection("User");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    users = await collection.find(query).toArray();
    users.forEach((user) => {
      user._id = user._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return users;
}

// Get user by id
async function getUser(id) {
  console.log(">>> db.js -> getUser")
  let user = null;
  try {
    const collection = db.collection("User");
    const query = { _id: new ObjectId(id) }; // filter by id
    user = await collection.findOne(query);

    if (!user) {
      console.log("No user with id " + id);
      // TODO: errorhandling
    } else {
      user._id = user._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return user;
}

// create user
async function createUser(user) {
  console.log(">>> db.js -> createUser")
  try {
    const collection = db.collection("User");
    const result = await collection.insertOne(user);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// Update user
// returns: id of the updated user or null, if user could not be updated
async function updateUser(user) {
  console.log(">>> db.js -> updateUser")
  try {
    let id = user._id;
    delete user._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("User");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: user });

    if (result.matchedCount === 0) {
      console.log("No user with id " + id);
      // TODO: errorhandling
    } else {
      console.log("User with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete user by id
// returns: id of the deleted user or null, if user could not be deleted
async function deleteUser(id) {
  console.log(">>> db.js -> deleteUser")
  try {
    const collection = db.collection("User");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No user with id " + id);
    } else {
      console.log("User with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
