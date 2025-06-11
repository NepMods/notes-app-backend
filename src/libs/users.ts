import { MongoClient } from "mongodb";
import { getMongoClient } from "../components/mongodb";
import { configDotenv } from "dotenv";
import { UserWithoutToken } from "../models/user";
configDotenv();

export async function checkUser(username: string) {
    const client: MongoClient = await getMongoClient();
    const db = client.db(process.env.DB ?? "notes-app")
    const collection = db.collection("users");

    const userData = await collection.findOne({ username: username });

    if (userData) {
        return true;
    } else {
        return false;
    }
}

export async function registerUser(user : UserWithoutToken) {
    const client: MongoClient = await getMongoClient();
    const db = client.db(process.env.DB ?? "notes-app")
    const collection = db.collection("users");
    
    const result = await collection.insertOne(user);
    if (result.acknowledged) {
        return true;
    } else {
        return false;
    }
}