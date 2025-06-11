import { MongoClient, ObjectId } from "mongodb";
import { getMongoClient } from "../components/mongodb";
import { configDotenv } from "dotenv";
import { UserWithoutPassword, UserWithoutToken } from "../models/user";
import { BasicResponse } from "../models/response";
import { compare } from "bcrypt";
import jwt, { Jwt } from "jsonwebtoken";
import { Note, NotesWithUser } from "../models/notes";
configDotenv();

export async function getNotes(user: UserWithoutPassword): Promise<NotesWithUser> {
    const client: MongoClient = await getMongoClient();
    const db = client.db(process.env.DB ?? "notes-app")
    const collection = db.collection("notes");
    const userData = await collection.find({ email: user.email }).toArray();
    
    let notes: Note[] = [];
    
    if (userData) {
        
        notes = userData.map((doc) => ({
            title: doc.title,
            body: doc.body,
            id: doc._id.toString(), 
            email: doc.email
        })
        );
    }

    const ret: NotesWithUser = {
        note: notes,
        user: {
            email: user.email
        }
    }

    return ret;
}

export async function addNote(note: Note): Promise<boolean> {
    const client: MongoClient = await getMongoClient();
    const db = client.db(process.env.DB ?? "notes-app")
    const collection = db.collection("notes");


    const result = await collection.insertOne(note);
    if (result.acknowledged) {
        return updateNote({...note, id: result.insertedId.toString()}, result.insertedId.toString());
    } else {
        return false;
    }
}


export async function updateNote(note: Note, id: string): Promise<boolean> {
    const client: MongoClient = await getMongoClient();
    const db = client.db(process.env.DB ?? "notes-app")
    const collection = db.collection("notes");

    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: note }
    );
    
    if (result.acknowledged) {
        return true;
    } else {
        return false;
    }
}


export async function deleteNote(id: string): Promise<boolean> {
    const client: MongoClient = await getMongoClient();
    const db = client.db(process.env.DB ?? "notes-app")
    const collection = db.collection("notes");

    const result = await collection.deleteOne(
        { _id: new ObjectId(id) }
    );
    
    if (result.acknowledged) {
        return true;
    } else {
        return false;
    }
}
