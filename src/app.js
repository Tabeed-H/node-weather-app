const express = require("express");
const hbs = require("hbs");
const path = require("path");

// setting up server
const PORT = process.env.PORT || 5000;

// setting up express middleware
const app = express();

// public folder
app.use(express.static(path.join(__dirname, "../public")));

// setting up handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// importing utitils
const geoEncoding = require("../utils/geoEncoding");
const getWeather = require("../utils/weather");

// setting requests
// index
app.get("/", (req, res) => {
  res.render("index");
});

// about page
app.get("/about", (req, res) => {
  res.render("about", {
    name: "Tabeed Hameed",
  });
});

// HTTP JSON endpoint
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.json({
      error: "Please Specify The Location Correctly!",
    });
    return;
  }

  const location = req.query.address;
  geoEncoding(location, (err, data) => {
    if (err) {
      res.json({
        error: err,
      });
      return;
    }

    getWeather(data, (err, data) => {
      if (err) {
        res.json({
          error: err,
        });
        return;
      }

      res.json(data);
    });
  });
});

// 404 page
app.get("*", (req, res) => {
  res.render("error");
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(`Server Running on Port ${PORT}`);
});
