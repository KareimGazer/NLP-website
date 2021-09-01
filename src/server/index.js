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
dotenv.config();

var key = {
  application_key: process.env.API_KE,
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

var dataStore = {};
// const info = {
//   highlights: [],
//   entities: [],
//   concepts: [],
// };

const url = "https://api.meaningcloud.com/sentiment-2.1";

const data = {
  key: "fc19aa9b81a3379f18d00f553ccf96d8",
  //txt: "I love you",
  url: "https://blog.waymo.com/2021/08/addressing-transit-mobility-gaps-what.html",
  lang: "en",
};

const callMeaningCloud = async (url, code, key) => {
  const res = await fetch(url + code + key);

  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const getData = async (url = "", datain = {}) => {
  console.log("Your data in", datain);
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
    // const extractedData = newData.sentence_list;
    // console.log("extracted data: ", extractedData);
    // return extractedData;
    console.log("new Data : ", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// this should be post
app.get("/analyze", function (request, response) {
  console.log("request to analyze", request);
  getData(url, data).then((newData) => {
    dataStore = newData;
  });
});

app.get("/getInfo", function (request, response) {
  // console.log("request to analyze", request);
  console.log("processing data");
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
  })); // use regex to get the type $ (end) at client
  info = { highlights, entities, concepts };
  response.send(info);
});
