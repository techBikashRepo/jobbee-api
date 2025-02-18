const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const connectDatabase = require("./config/database");
const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");

// Setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// Importing All Routes
const jobs = require("./routes/jobs");
const auth = require("./routes/auth");
const user = require("./routes/user");

// Connect to Database
connectDatabase();

// Setup body parser
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/v1", jobs);
app.use("/api/v1", auth);
app.use("/api/v1", user);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle Errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const mode = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  console.log(`Server Is Running On PORT ${PORT} in ${mode} mode`);
});

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
