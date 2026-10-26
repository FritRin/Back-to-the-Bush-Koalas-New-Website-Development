// loading environment variables from a specific .env file
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// TODO import The important neccessary modules of each deparments
const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");



// start the Express application
const app = express();

//This is a debbuger see any request method in the terminal
app.use((req, res, next) => {
    console.log(`>>> Incoming Request: ${req.method} ${req.url}`);
    next(); 
});

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Built-in middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));


//TODO IMPORT Middleware here

//TODO Swagger or Postman ? up to you

//TODO IMPORT Router files here

//TODO IMPORT API 


app.get("/", (req, res) => {
    res.send("holaaaaaaaaaa...");
});

// From .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
            console.log(`--------------------------------------------------`);
            console.log(`SERVER: Running at http://localhost:${PORT}`);
            console.log(`--------------------------------------------------`);
        });