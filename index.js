let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentDate = document.querySelector("#current-data");
currentDate.innerHTML = `${day} ${hour}:${minute}`;
//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
      <div class="card" style="width: 100px">
        <h3>${formatDay(forecastDay.dt)}</h3>
          <img
            class="weather"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="cloud"
            width="50px"
          />
        <div class="small-card-text">
          <p>${Math.round(forecastDay.temp.day)}°C</p>
        </div>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f7e96c4687bfb6b134cee7438fc7f3c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  temperature = Math.round(response.data.main.temp);
  let icon = document.querySelector("#mainIcon");
  document.querySelector("#temp").innerHTML = temperature;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#weather-discription").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "f7e96c4687bfb6b134cee7438fc7f3c7";
  let city = document.querySelector("#input-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);
//
function convertToFtemp(event) {
  event.preventDefault();
  let tempElemets = document.querySelector("#temp");
  let fTemp = (temperature * 9) / 5 + 32;
  tempElemets.innerHTML = Math.round(fTemp);
}

function convertToCtemp(event) {
  event.preventDefault();
  let tempElemets = document.querySelector("#temp");
  tempElemets.innerHTML = temperature;
}

let fTemperature = document.querySelector("#fTemp");
fTemperature.addEventListener("click", convertToFtemp);

let cTemperature = document.querySelector("#cTemp");
cTemperature.addEventListener("click", convertToCtemp);

//
function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function showPosition(position) {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    let apiKey = "f7e96c4687bfb6b134cee7438fc7f3c7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemp);
  });
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", showLocation);
