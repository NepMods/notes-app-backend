
/*
Library for mongodb
*/

import { MongoClient, ServerApiVersion } from "mongodb"
import { configDotenv } from "dotenv";
configDotenv();

const uri: string | null = process.env.MONGODB_URI ?? "";


const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
    retryWrites: true,
    maxPoolSize: 10,
    minPoolSize: 5,
}

let client: MongoClient | null = null;


// Just creates a MongoClient and returns
const createClient = () => {
    if (!uri) {
        throw new Error('Mongodb Url Missing')
    }
    return new MongoClient(uri, options)
}



// Yes, i could cache a client,
//  but i thinks its not that useful for my case in this app
const getClientPromise = () => {
    if (!uri) {
        throw new Error('Mongodb Url Missing')
    }
    client = createClient()
    return client.connect().catch((err) => {
        console.error("Failed to connect to MongoDB:", err)
        throw err
    })
}

// Gets the promise of the client
export default function clientPromise() {
    return getClientPromise()
}

// Same as before
export const getMongoClient = async () => {
    try {
        const client = await getClientPromise()
        return client
    } catch (error) {
        console.error("MongoDB connection error:", error)
        throw error
    }
}

