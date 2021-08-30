// selectors
const dateContainer = document.querySelector(".header-date");
const formContainer = document.querySelector("form");
const inputBox = document.querySelector(".search-form-input");
const errorContainer = document.querySelector(".error-container");
const dataContainer = document.querySelector(".data-container");

// setting up date
const date = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dateString = `${
  monthNames[date.getMonth()]
} ${date.getDate()}, ${date.getFullYear()}`;
dateContainer.innerHTML = dateString;

// fetch request to HTTP json end point
formContainer.addEventListener("submit", (e) => {
  // prevent reload of the page
  e.preventDefault();

  const location = inputBox.value;
  const url = `http://localhost:5000/weather?address=${encodeURIComponent(
    location
  )}`;

  //   splash screen
  dataContainer.innerHTML = "Loading";

  // fetch
  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        errorContainer.style.display = "block";
        errorContainer.innerHTML = data.error;
        dataContainer.innerHTML = "Not Found";
        return;
      }

      errorContainer.style.display = "none";

      const weatherData = `<div class="data-container-location">
      <div class="data-container-location-place"> ${data.location.name}</div>
      <div class="data-container-location-region">${data.location.region}</div>
      <div class="data-container-location-country">${data.location.country}</div>
  </div>

  <div class="data-container-info">
      <ul>
          <li>${data.current.temperature}&#176;C - ${data.current.weather_descriptions[0]}</li>
          <li>Feels Like: ${data.current.feelslike}&#176;C</li>
          <li>Rain: ${data.current.precip}%</li>
          <li>Humididy:  ${data.current.humidity}</li>
      </ul>
  </div>`;

      dataContainer.innerHTML = weatherData;
    });
  });
});
