import { MONGODB_1_SHOW_NAME } from "../constants/dbName.js";
import connectToDatabase from "./mongodb.js";

const mongoURI1 = process.env.MONGODB_1_URI;
const mongodbName1 = MONGODB_1_SHOW_NAME;

const Primary_MongoDb_Connection = await connectToDatabase(
    mongoURI1,
    mongodbName1
);

export default Primary_MongoDb_Connection;
