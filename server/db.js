import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI || 'mongodb+srv://@yyc.mezzi5y.mongodb.net/'

let connectionPromise = null

export async function connectDb() {
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(mongo_uri);
    }
    return await connectionPromise
}

export async function disconnectDb() {
    if (connectionPromise) {
        const mongoose = await connectionPromise
        await mongoose.connection.close()
        connectionPromise = null
    }
}