const request = require("request");

const getGeoEncoding = function (address, callBack) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidGFiZWVkIiwiYSI6ImNrc3ZjcHdjMDBycXkyeXMycXhpcWpsOGIifQ.OCcFxT9ozyJdQZ942o2I4w&limit=1`;

  request({ url: url, json: true }, (err, data) => {
    if (err) {
      callBack("Cannot Connect to the API", undefined);
      return;
    }

    const geoEncodingData = data.body;

    if (geoEncodingData.message) {
      callBack("Area Not Found! Please Check The Area Name!", undefined);
      return;
    }

    callBack(undefined, geoEncodingData.features[0].center);
  });
};

const getWeather = function (data) {
  const [long, lat] = data;
  const url = `http://api.weatherstack.com/current?access_key=4f4a7024bac1f3bdd48d35acdd445e3c&query=${lat},${long}`;

  request({ url: url, json: true }, (err, data) => {
    if (err) {
      console.log("Cannot Connect to the API");
      return;
    }

    const weatherData = data.body;

    if (weatherData.error) {
      console.log(weatherData.error.info);
      return;
    }

    console.log(
      `The Temperature is ${weatherData.current.temperature} at ${weatherData.location.name}, ${weatherData.location.country}.`
    );
  });
};

getGeoEncoding("New York", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  getWeather(data);
});
