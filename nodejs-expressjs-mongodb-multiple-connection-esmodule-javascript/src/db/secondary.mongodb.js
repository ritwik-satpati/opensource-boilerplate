import { MONGODB_2_SHOW_NAME } from "../constants/dbName.js";
import connectToDatabase from "./mongodb.js";

const mongoURI2 = process.env.MONGODB_2_URI;
const mongodbName2 = MONGODB_2_SHOW_NAME;

const Secondary_MongoDb_Connection = await connectToDatabase(
    mongoURI2,
    mongodbName2
);

export default Secondary_MongoDb_Connection;
