const PORT = process.env.PORT || 8082;

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const meaningCloudAPI = require("./meaningCloudAPI.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors for cross origin allowance
app.use(cors());

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/meaningCloud", (req, res) => {
  const url = req.body.url;
  meaningCloudAPI(url)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log("server:meaningCloud:error", error);
    });
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
  console.log(`Server started on localhost port ${PORT}`);
});
