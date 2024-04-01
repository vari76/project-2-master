const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/database");
const morgan = require("morgan");
const usersRoute = require("./apiRouts/usersRoute");
const testsRoute = require("./apiRouts/testsRoute");
const patientRoute = require("./apiRouts/patientRouts");
const recordRoute = require("./apiRouts/recordRouts");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/errorMiddleWare");
//get middleware path
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 9000;

//get middleware path
dotenv.config({ path: "config.env" });

//init app
const app = express();

//connect with DB
dbConnection();

//parse JSON
app.use(express.json());

// check envairoment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode is ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/patients", patientRoute, testsRoute);
app.use("/api/v1/tests/", recordRoute);
app.use("/users", usersRoute);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

//Handle unhandled route
app.all("*", (req, res, next) => {
  //   const err = new Error(`cant fing this route ${req.originalUrl}`);
  //  next(err.message); // this next will send the error to global error handle middleWare
  next(new ApiError(`cant find this route ${req.originalUrl}`, 400)); // this next will send the error to global error handle middleWare
});

app.listen(PORT, () => {
  console.log(`server run at PORT : ${PORT}`);
});

//Global error handiling middleware for express
app.use(globalError);

//Events => Listener => callback(err) when show any error out of express make event we just want to make listener for this error and send it with call back to catch it
process.on("unhandledRejection", (err) => {
  console.error(`UnHandled Error: ${err}`);
  server.close(() => {
    console.error(`shutting down...`);
    process.exit(1);
  });
});
