// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');


// Require Route Files
const jobs = require('./route/jobs');
const companies = require('./route/companies');

// Require DB Configuration File
const db_url = require('./db');

// Establish Database Connection
mongoose.connect(db_url, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo');
});

// Instantiate Express Application Object
const app = express();

/*** Middleware ***/

// Add `bodyParser` middleware which will parse JSON requests
// into JS objects before they reach the route files.
//
// The method `.use` sets up middleware for the Express application
app.use(express.json());

const reactPort = 5000;
// Set CORS headers on response from this API using the `cors` NPM package.
// app.use(
//   cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}` })
// );
// setting permissions
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/*** Routes ***/

// Mount imported Routers ok

app.use(jobs);
app.use(companies);

/*** Routes ***/
// Define PORT for the API to run on
const PORT = process.env.PORT || 5000;

// Start the server to listen for requests on a given port
app.listen(PORT, () => {
  console.log(`Jobs => http://localhost:${PORT}`);
});