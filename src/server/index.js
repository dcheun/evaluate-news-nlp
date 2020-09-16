const dotenv = require("dotenv");
dotenv.config();
const textapi = {
  application_key: process.env.API_KEY,
};
// Port server will run on
const PORT = 8082;

const path = require("path");
const express = require("express");

const app = express();

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.get("/key", (req, res) => {
  res.send(textapi);
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
  console.log(`Server started on localhost port ${PORT}`);
});
