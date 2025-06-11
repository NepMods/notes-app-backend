import { MongoClient } from "mongodb";
import { getMongoClient } from "../components/mongodb";
import { configDotenv } from "dotenv";
import { UserWithoutToken } from "../models/user";
import { BasicResponse } from "../models/response";
import { compare } from "bcrypt";
import jwt, { Jwt } from "jsonwebtoken";
configDotenv();

export async function checkUser(username: string): Promise<boolean> {
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

export async function registerUser(user: UserWithoutToken): Promise<boolean> {
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

export async function getUser(email: string): Promise<UserWithoutToken | null> {
    const client: MongoClient = await getMongoClient();
    const db = client.db(process.env.DB ?? "notes-app")
    const collection = db.collection("users");

    const userData = await collection.findOne({ email: email });

    if (userData) {
        return {
            username: userData.username,
            password: userData.password,
            email: userData.email
        }
    } else {
        return null;
    }
}

export async function loginUser(email: string, password: string): Promise<BasicResponse | null> {

    const user = await getUser(email);
    const jwtSecret: string = process.env.JWT_SECRET ?? "";

    if (user) {
        const passwordValidate = await compare(password, user.password);
        
        
        if (passwordValidate) {
            const token = jwt.sign({"email": email}, jwtSecret, {expiresIn: "30d"} )
            return {
                status: 200, 
                message: "Login Successful",
                error: false,
                data: {
                    token: token
                }
            }
        }
    }

    return null;
}