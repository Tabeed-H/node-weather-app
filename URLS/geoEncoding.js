const request = require("request");

const getGeoEncoding = function (address, callBack) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidGFiZWVkIiwiYSI6ImNrc3ZjcHdjMDBycXkyeXMycXhpcWpsOGIifQ.OCcFxT9ozyJdQZ942o2I4w&limit=1`;

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callBack("Cannot Connect to the API", undefined);
      return;
    }

    // const geoEncodingData = data.body;

    if (body.message) {
      callBack("Area Not Found! Please Check The Area Name!", undefined);
      return;
    }

    callBack(undefined, body.features[0].center);
  });
};

module.exports = getGeoEncoding;
