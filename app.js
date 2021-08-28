const geoEncoding = require("./URLS/geoEncoding");
const getWeather = require("./URLS/weather");

geoEncoding("New York", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  getWeather(data);
});
