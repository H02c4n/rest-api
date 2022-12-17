const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Replace the following with values for your environment.
const username = encodeURIComponent("myapi42");
const password = encodeURIComponent("U41Fn2W431WWZNS0");
const clusterUrl = "myapi42.5cd1oiy.mongodb.net/";
const authMechanism = "SCRAM-SHA-1";

// Connection URI
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 3000);
