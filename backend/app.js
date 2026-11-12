// loading environment variables from a specific .env file
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// TODO import The important neccessary modules of each deparments
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./utils/database");

//TODO IMPORT Middleware here
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const koalaRoutes = require("./routes/koalaRoutes");
const customerRoutes = require("./routes/customerRoutes");
const koalaStoryRoutes = require("./routes/koalaStoryRoutes");
const wishlistItemRoutes = require("./routes/wishlistItemRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const donationRoutes = require("./routes/donationRoutes");
const authRoutes = require("./routes/authRoutes");

// start the Express application
const app = express();

// log incoming requests to terminal
app.use((req, res, next) => {
    console.log(`>>> Incoming Request: ${req.method} ${req.url}`);
    next();
});

// Configure CORS to allow request from frontend
// Allow the browser to end and recieve auth cookies
const allowedOrigins = [
    process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());


//TODO Swagger or Postman ? up to you
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerYAML = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerYAML, {swaggerOptions: { withCredentials: true }}));

//TODO IMPORT Router files here

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/koalas", koalaRoutes); 
app.use("/api/customers", customerRoutes);
app.use("/api/koala-stories", koalaStoryRoutes);
app.use("/api/wishlist-items", wishlistItemRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/donations", donationRoutes);

// Api to allow upload PNG images in the DB and store in the
// folder Public/images
app.use("/images",express.static("public/images"));

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