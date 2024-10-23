import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");
let db;

const connect = async (attendance) => {
    try {
        if (!db) {
            await client.connect();
            db = client.db('comsoc-mc');
            console.log('Connected to DB ✔')
        }
        const collection = db.collection(attendance);
        return collection;
    } catch (error) {
        console.log('Connection', error);
    }
}

const disconnect = async () => {
    try {
        await client.close();
        console.log('Disconnection to DB ✔')
    } catch (error) {
        console.log('Connection', error);
    }
}

export {
    connect,
    disconnect
}