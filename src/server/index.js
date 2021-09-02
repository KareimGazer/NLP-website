var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var bodyParser = require("body-parser");
var cors = require("cors");

const fetch = require("node-fetch");

var json = {
  title: "test json response",
  message: "this is a message",
  time: "now",
};

const dotenv = require("dotenv");
// const { info } = require("console");
dotenv.config();

var key = {
  application_key: process.env.API_KEY,
};

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

console.log(JSON.stringify(mockAPIResponse));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  console.log("request", req);
  res.json(mockAPIResponse);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

// new code ---------------------------------------------------------------------

var dataStore = {}; // main store for NLP info

const url = "https://api.meaningcloud.com/sentiment-2.1"; // API url

// main data for post req for meaning cloud API
const data = {
  key: key.application_key,
  // url for testing boilerplate
  url: "https://blog.waymo.com/2021/08/addressing-transit-mobility-gaps-what.html",
  lang: "en",
};

// calls post req and returns response from meaningCloud API
const getData = async (url = "", datain = {}) => {
  // console.log("Your data in", datain);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(datain),
  });

  try {
    const newData = await response.json();
    // console.log("new Data : ", newData);
    return newData;
  } catch (error) {
    // console.log("error", error);
  }
};

app.post("/analyze", function (req, res) {
  // console.log("Test request:", req.body.url);
  var postData = data;
  postData.url = req.body.url;
  getData(url, data)
    .then((newData) => {
      dataStore = newData;
    })
    .then(() => {
      summary = cookInfo();
      res.json(summary);
    });
});

function cookInfo() {
  // console.log("cooking info");
  highlights = dataStore.sentence_list
    .filter((sentence) => sentence.text.length > 100)
    .map((sentence) => ({ text: sentence.text, score: sentence.score_tag }));
  entities = dataStore.sentimented_entity_list.map((entity) => ({
    form: entity.form,
    type: entity.type,
  }));
  concepts = dataStore.sentimented_concept_list.map((concept) => ({
    form: concept.form,
    type: concept.type,
  }));
  summary = { highlights, entities, concepts };
  return summary;
}

module.exports = getData;
