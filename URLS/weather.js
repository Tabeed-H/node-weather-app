const request = require("request");

const getWeather = function (data) {
  const [lat, long] = data;
  const url = `http://api.weatherstack.com/current?access_key=4f4a7024bac1f3bdd48d35acdd445e3c&query=${long},${lat}`;

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      console.log("Cannot Connect to the API");
      return;
    }

    // const weatherData = data.body;

    if (body.error) {
      console.log(body.error.info);
      return;
    }

    console.log(
      `The Temperature is ${body.current.temperature} at ${body.location.name}, ${body.location.country}.`
    );
  });
};

module.exports = getWeather;
