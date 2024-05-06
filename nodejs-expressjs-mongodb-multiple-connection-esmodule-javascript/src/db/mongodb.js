import mongoose from "mongoose";

const connectedDatabases = {};

const connectToDatabase = async (mongoURI, dbName) => {
    if (connectedDatabases[dbName]) {
        console.log(`Using existing connection for MongoDB: ${dbName}`);
        // console.log(connectedDatabases[dbName])
        return connectedDatabases[dbName];
    }

    try {
        console.log(`Connecting to MongoDB: ${dbName}`);
        const connection = await mongoose.createConnection(mongoURI).asPromise();
        // console.log(dbName, connection)
        connectedDatabases[dbName] = connection;
        console.log(
            `Connected to MongoDB: ${connection.host}:${connection.port}/${connection.name}`
        );
        return connection;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${dbName}`);
        throw error;
    }
};

export default connectToDatabase;
