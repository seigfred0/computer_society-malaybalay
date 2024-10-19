import { MongoClient } from "mongodb";


const client = new MongoClient("mongodb://localhost:27017/");

const connect = async () => {
    try {
        await client.connect();
        let db = client.db('comsoc-mc');
        let collection = db.collection('attendance_system');
        return { db, collection }
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
};