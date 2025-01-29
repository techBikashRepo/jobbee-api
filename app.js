const express = require("express");
const app = express();

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const errorMiddleware = require("./middlewares/errors");

// Setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

// Importing All Routes
const jobs = require("./routes/jobs");

// Connect to Database
connectDatabase();

// Setup body parser
app.use(express.json());

app.use("/api/v1", jobs);

// Middleware to handle Errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const mode = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server Is Running On PORT ${PORT} in ${mode} mode`);
});
