const express = require("express");
const router = express.Router();
const axios = require(`axios`);
const City = require("../models/City");

const getWeather = async function(url) {
  let result = await axios.get(url);
  return result.data;
};

router.get(`/city/:cityName`, async function(req, res) {
  let { cityName } = req.params;
  const apiKey = "ad2a455b26a132204d39870ab339bf22";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  let data = await getWeather(url);
  data = {
    name: data.name,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    conditionPic: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  };
  res.send(data);
});

router.get(`/cities`, async function(req, res) {
  let cities = await City.find({});
  res.send(cities);
});

router.post(`/city`, async function(req, res) {
  let city = new City({
    name: req.body.name,
    temperature: req.body.temperature,
    condition: req.body.condition,
    conditionPic: req.body.conditionPic
  });

  await city.save();
  res.end();
});

router.delete(`/city/:cityName`, function(req, res) {
  let { cityName } = req.params;
  City.deleteOne({ name: cityName }).exec(function(err, resp) {
    res.end();
  });
});

router.put(`/city`, function(req, res) {
  const city = req.body;
  City.findOneAndUpdate({ name: city.name }, city).exec(function(err, resp) {
    res.end();
  });
});

module.exports = router;
