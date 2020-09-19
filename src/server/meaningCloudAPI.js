const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");

const textapi = {
  application_key: process.env.API_KEY,
};

const BASE_URL =
  "https://api.meaningcloud.com/sentiment-2.1?of=json&lang=auto&key=";

const getAPIData = async (url = "") => {
  reqURL = `${BASE_URL}${textapi.application_key}&url=${url}`;
  try {
    const res = await axios.get(reqURL);
    // axios parses JSON responses.
    return res.data;
  } catch (error) {
    console.log("meaningCloudAPI:error", error);
  }
};

module.exports = getAPIData;
