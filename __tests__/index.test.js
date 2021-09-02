import { getData } from "../src/server/index";

const dotenv = require("dotenv");
dotenv.config();
var key = {
  application_key: process.env.API_KEY,
};

const data = {
  key: key.application_key,
  url: "https://blog.waymo.com/2021/08/addressing-transit-mobility-gaps-what.html",
  lang: "en",
};

const url = "https://api.meaningcloud.com/sentiment-2.1"; // API url

// call getData with the API url and body data and expect and object
describe("Testing the getting data functionality", () => {
  test("the data is peanut butter", async () => {
    const newData = await getData(url, data);
    expect(newData).toBeDefined();
  });
});
