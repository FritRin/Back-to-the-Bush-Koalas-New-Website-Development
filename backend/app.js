// loading environment variables from a specific .env file
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// TODO import The important neccessary modules of each deparments
const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");

//TODO IMPORT Middleware here
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const koalaRoutes = require("./routes/koalaRoutes");
const customerRoutes = require("./routes/customerRoutes");
const koalaStoryRoutes = require("./routes/koalaStoryRoutes");
const wishlistItemRoutes = require("./routes/wishlistItemRoutes");

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


//TODO Swagger or Postman ? up to you
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerYAML = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerYAML, {swaggerOptions: { withCredentials: true }}));

//TODO IMPORT Router files here

//API Routes
app.use("/api/koalas", koalaRoutes); 
app.use("/api/customers", customerRoutes);
app.use("/api/koala-stories", koalaStoryRoutes);
app.use("/api/wishlist-items", wishlistItemRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        status: 200,
        message: "Server is running correctly",
    })
});

//This will need to be updated later
app.get("/test-error", (req, res, next) => {
    const error = new Error("This is a test");
    next(error);
});

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// From .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
            console.log(`--------------------------------------------------`);
            console.log(`SERVER: Running at http://localhost:${PORT}`);
            console.log(`--------------------------------------------------`);
        });