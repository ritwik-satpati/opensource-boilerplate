import mongoose from "mongoose";
import { MONGODB_NAME } from "../constants/dbName.js";

const connectMongodb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${MONGODB_NAME}`
        );
        console.log(
            `MongoDB connected with server: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectMongodb;
