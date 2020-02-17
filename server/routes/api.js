const express = require("express");
const router = express.Router();
// const request = require(`request`);
const axios = require(`axios`);
const City = require("../models/City");
const apiKey = "ad2a455b26a132204d39870ab339bf22";

const getWeather = async function(url) {
  let result = await axios.get(url);
  return result.data;
};

router.get(`/weather/:city`, async function(req, res) {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let data = await getWeather(url);
  data = {
    name: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].description,
    conditionPic: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  };
  res.send(data);
});

module.exports = router;
