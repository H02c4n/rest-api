const express = require("express");
const app = express();

app.get("/", (req, res) => {
  //res.send("Hi");
  //res.status(200).send("Hi");
  res.status(500).json({ message: "Error" });
});

app.listen(3000);
