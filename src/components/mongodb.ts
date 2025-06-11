
import { MongoClient, ServerApiVersion } from "mongodb"
import { configDotenv } from "dotenv";
configDotenv();

const uri : string | null = process.env.MONGODB_URI ?? "";


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

let client : MongoClient | null = null;
let cachedClient: Promise<MongoClient> | null = null;

const createClient = () => {
    if (!uri) {
        throw new Error('Mongodb Url Missing')
    }
    return new MongoClient(uri, options)
}


const getClientPromise = () => {
    if (!uri) {
        throw new Error('Mongodb Url Missing')
    }

    if (!cachedClient) {
        client = createClient()
        cachedClient = client.connect().catch((err) => {
            console.error("Failed to connect to MongoDB:", err)
            throw err
        })
    }
    return cachedClient
}

export default function clientPromise() {
    return getClientPromise()
}

export const getMongoClient = async () => {
    try {
        const client = await getClientPromise()
        return client
    } catch (error) {
        console.error("MongoDB connection error:", error)
        throw error
    }
}

