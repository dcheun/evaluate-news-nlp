const dotenv = require("dotenv");
dotenv.config();
const textapi = {
  application_key: process.env.API_KEY,
};
const PORT = 8082;

const path = require("path");
const express = require("express");

const mockAPIResponse = require("./mockAPI.js");

const app = express();

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.get("/key", (req, res) => {
  res.send(textapi);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/meaningCloud", (req, res) => {
  const url = req.body.url;
  meaningCloudAPI(url)
    .then((apiRes) => apiRes.json())
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log("server:post:meaningCloud:error", error);
    });
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
  console.log(`Server started on localhost port ${PORT}`);
});
