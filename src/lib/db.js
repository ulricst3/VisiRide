import {MongoClient, ObjectId} from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import {DB_URI} from "$env/static/private";
import fs from "fs/promises";
import {join} from "path";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("VisiRideDB"); // select database

//////////////////////////////////////////
// User Functions
//////////////////////////////////////////

// Get all users
async function getUsers() {
    console.log(">>> db.js -> getUsers");
    let users = [];
    try {
        const collection = db.collection("User");

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        // Aggregation pipeline designed in MongoDB Compass
        const query = [
            {
                "$lookup": {
                    "from": "Appointment",
                    "localField": "_id",
                    "foreignField": "userId",
                    "as": "appointments"
                }
            }, {
                "$addFields": {
                    "appointmentCount": {
                        "$size": "$appointments"
                    }
                }
            }, {
                "$project": {
                    "appointments": 0
                }
            }
        ];

        // Get all objects that match the query
        users = await collection.aggregate(query).toArray();
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
    console.log(">>> db.js -> getUser");
    let user = null;
    try {
        const collection = db.collection("User");
        const query = {_id: new ObjectId(id)}; // filter by id
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
    console.log(">>> db.js -> createUser");
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
    console.log(">>> db.js -> updateUser");
    try {
        let id = user._id;
        delete user._id; // delete the _id from the object, because the _id cannot be updated
        const collection = db.collection("User");
        const query = {_id: new ObjectId(id)}; // filter by id
        const result = await collection.updateOne(query, {$set: user});

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
    console.log(">>> db.js -> deleteUser");
    try {
        const collection = db.collection("User");
        const query = {_id: new ObjectId(id)}; // filter by id
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

//////////////////////////////////////////
// Vehicle Functions
//////////////////////////////////////////

// Get all vehicles
async function getVehicles() {
    console.log(">>> db.js -> getVehicles");
    let vehicles = [];
    try {
        const collection = db.collection("Vehicle");

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        // Aggregation pipeline designed in MongoDB Compass
        const query = [
            {
                "$lookup": {
                    "from": "Appointment",
                    "localField": "_id",
                    "foreignField": "vehicleId",
                    "as": "appointments"
                }
            }, {
                "$addFields": {
                    "appointmentCount": {
                        "$size": "$appointments"
                    }
                }
            }, {
                "$project": {
                    "appointments": 0
                }
            }
        ];

        // Get all objects that match the query
        vehicles = await collection.aggregate(query).toArray();
        vehicles.forEach((vehicle) => {
            vehicle._id = vehicle._id.toString(); // convert ObjectId to String
        });
    } catch (error) {
        console.log(error);
        // TODO: errorhandling
    }
    return vehicles;
}

// Get vehicle by id
async function getVehicle(id) {
    console.log(">>> db.js -> getVehicle");
    let vehicle = null;
    try {
        const collection = db.collection("Vehicle");
        const query = {_id: new ObjectId(id)}; // filter by id
        vehicle = await collection.findOne(query);

        if (!vehicle) {
            console.log("No vehicle with id " + id);
            // TODO: errorhandling
        } else {
            vehicle._id = vehicle._id.toString(); // convert ObjectId to String
        }
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return vehicle;
}

//////////////////////////////////////////
// Appointment Functions
//////////////////////////////////////////

// Get all appointments
async function getAppointments() {
    console.log(">>> db.js -> getAppointments");
    let appointments = [];
    try {
        const collection = db.collection("Appointment");

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        // Aggregation pipeline designed in MongoDB Compass
        const query = [
            {
                "$lookup": {
                    "from": "User",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user"
                }
            }, {
                "$unwind": {
                    "path": "$user"
                }
            }, {
                "$lookup": {
                    "from": "Vehicle",
                    "localField": "vehicleId",
                    "foreignField": "_id",
                    "as": "vehicle"
                }
            }, {
                "$unwind": {
                    "path": "$vehicle"
                }
            }
        ];

        // Get all objects that match the query
        appointments = await collection.aggregate(query).toArray();
    } catch (error) {
        console.log(error);
        // TODO: errorhandling
    }
    // Parses all ObjectIds (even in nested objects such as vehicle/user to string)
    return JSON.parse(JSON.stringify(appointments));
}

// create appointment
async function createAppointment(appointment) {
    console.log(">>> db.js -> createAppointment");
    try {
        const collection = db.collection("Appointment");
        const result = await collection.insertOne(appointment);
        return result.insertedId.toString(); // convert ObjectId to String
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

// delete appointment by id
// returns: id of the deleted appointment or null, if appointment could not be deleted
async function deleteAppointment(id) {
    console.log(">>> db.js -> deleteAppointment");
    try {
        const collection = db.collection("Appointment");
        const query = {_id: new ObjectId(id)}; // filter by id
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            console.log("No appointment with id " + id);
        } else {
            console.log("Appointment with id " + id + " has been successfully deleted.");
            return id;
        }
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

async function clearAllCollections() {
    console.log(">>> db.js -> clearAllCollections");
    try {
        // List of all collections
        const collections = await db.listCollections().toArray();

        // Clear each collection
        for (const {name} of collections) {
            await db.collection(name).deleteMany();
        }
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
}

async function insertDataFromJSON() {
    console.log(">>> db.js -> insertDataFromJSON");

    const users = await loadJSON(join(process.cwd(), "static", "data", "Users.json"));
    await db.collection("User").insertMany(users);

    const vehicles = await loadJSON(join(process.cwd(), "static", "data", "Vehicles.json"));
    await db.collection("Vehicle").insertMany(vehicles);

}

async function loadJSON(filePath) {
    const raw = await fs.readFile(filePath, "UTF-8");
    return JSON.parse(raw);
}

async function getHomeScreenCounts() {
    console.log(">>> db.js -> getHomeScreenCounts");
    const homeScreenCounts = {};
    let total = 0;

    try {
        const collections = ["User", "Appointment", "Vehicle"];
        for (const name of collections) {
            const count = await db.collection(name).countDocuments();
            homeScreenCounts[name] = count;
            total += count;
        }
        homeScreenCounts.All = total;
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return homeScreenCounts;
}

// export all functions so that they can be used in other files
export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getVehicles,
    getVehicle,
    getAppointments,
    createAppointment,
    deleteAppointment,
    clearAllCollections,
    insertDataFromJSON,
    getHomeScreenCounts
};
