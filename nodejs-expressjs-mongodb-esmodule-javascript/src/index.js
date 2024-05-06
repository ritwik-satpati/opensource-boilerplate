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

// connect db
import connectMongodb from "./db/mongodb.js";
import { app } from "./app.js";

const port = process.env.PORT || 8000;

connectMongodb()
    .then(() => {
        // create server
        const server = app.listen(port, () => {
            if (process.env.NODE_ENV !== "PRODUCTION") {
                console.log(`Server is running on http://localhost:${port}`);
            } else {
                console.log(`Server is running ...`);
            }
        });

        // unhandled promise rejection
        process.on("unhandledRejection", (err) => {
            console.log(`Shutting down the server for ${err.message}`);
            console.log(`Shutting down the server for unhandle promise rejection`);

            server.close(() => {
                process.exit(1);
            });
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    });

// Seeders (if needed) 
// import { createUserByFaker } from "./seeders/user.seeder.js";
// createUserByFaker(10)