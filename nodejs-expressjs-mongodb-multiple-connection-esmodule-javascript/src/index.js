// config
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({
        path: "./.env",
    });
}

// handling uncought exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling uncought exception`);
});

// conneting app with the server
import { app } from "./app.js";
// import Primary_MongoDb_Connection from "./db/primary.mongodb.js";
// import Secondary_MongoDb_Connection from "./db/secondary.mongodb.js";

const port = process.env.PORT || 8000;

app.listen(port, async () => {
    // Primary_MongoDb_Connection
    // Secondary_MongoDb_Connection

    console.log(`Server is running on PORT: ${port}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandle promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});

// Seeders (if needed)
// import { createUserByFaker } from "./seeders/user.seeder.js";
// createUserByFaker(10)
