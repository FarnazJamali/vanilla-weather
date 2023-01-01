let week = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]; 

//current date
function formatDate() {
  let month = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "novermber",
    "december",
  ];
  let now = new Date();
  console.log(week[now.getDay()]);
  let day = week[now.getDay()];
  let currentMonth = month[now.getMonth()];
  let time =
    now.getHours() +
    ":" +
    now.getMinutes() +
    " " +
    day +
    " " +
    now.getDate() +
    " " +
    currentMonth;
  return time;
}
let newDate = new Date();
document.querySelector("#date").innerHTML = formatDate(newDate);

//forecast date
function forecastDate(timeStamp) {
  let fDate = new Date(timeStamp * 1000);
  let day = week[fDate.getDay()];
  return day;
}

//* From this part future weather forecast starts.
//forecast function ==> wants to show the first 5 days
function forecast(res) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-center mt-2">`;
  {
    res &&
      res.data.daily.forEach(function (day, index) {
        if (index < 5) {
          forecastHTML =
            forecastHTML +
            `
        <div class="col-2">
          <div class="weather-forecast-date">${forecastDate(
            res.data.daily[index].time
          )}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              res.data.daily[index].condition.icon
            }.png"
            alt=""
            width="42"
          />
          <div>
            <span class="px-1 text-danger fw-bold"> ${Math.round(
              res.data.daily[index].temperature.maximum
            )} </span>
            <span class="px-1 text-danger"> ${Math.round(
              res.data.daily[index].temperature.minimum
            )} </span>
          </div>
        </div>
    `;
        }
      });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
}

// gives the coords of the searched city to the above function
function getForecast(coords) {
  console.log(coords);
  let apikey = "256e0719bob599t8f79f42a814ed4fe3";
  let lat = coords.latitude;
  let lon = coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apikey}&units=metric`;
  axios.get(url).then(forecast);
}

//* From this part current weather forecast starts.
//change data based on the city
function changeData(res) {
  getForecast(res.data.coordinates);
  console.log(res.data.coordinates);
  document.querySelector(
    "#icon"
  ).src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${res.data.condition.icon}.png`;
  temperatureMain = Math.round(res.data.temperature.current);
  document.querySelector("h1").innerHTML = temperatureMain;
  document.querySelector("#description").innerHTML =
    res.data.condition.description;
  // document.querySelector("#precepitation").innerHTML = "Precepitation: ";
  document.querySelector("#humidity").innerHTML =
    "Humidity: " + res.data.temperature.humidity + "%";
  document.querySelector("#wind").innerHTML =
    "Wind speed: " + res.data.wind.speed + " km/h";
}

function search(city) {
  let apiKey = "256e0719bob599t8f79f42a814ed4fe3";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(changeData);
}
//search city and see the result
function changeCity(event) {
  event.preventDefault();
  let input = document.getElementById("input_value");
  let city = input.value;
  document.getElementById("city").innerHTML = input.value;
  search(city);
}

document.getElementById("form").addEventListener("submit", changeCity);

//for current location
function showLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;

  function showCurrent(loc) {
    console.log(loc);
    document.getElementById("city").innerHTML = loc.data.city;
    document.querySelector(
      "#icon"
    ).src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${loc.data.condition.icon}.png`;
    document.querySelector("h1").innerHTML = Math.round(
      loc.data.temperature.current
    );
    document.querySelector("#description").innerHTML =
      loc.data.condition.description;
    // // document.querySelector("#precepitation").innerHTML = "Precepitation: ";
    document.querySelector("#humidity").innerHTML =
      "Humidity: " + loc.data.temperature.humidity + "%";
    document.querySelector("#wind").innerHTML =
      "Wind speed: " + loc.data.wind.speed + " km/h";
  }
  let apiKey = "256e0719bob599t8f79f42a814ed4fe3";
  let urlSecond = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(urlSecond).then(showCurrent);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

document
  .getElementById("current")
  .addEventListener("click", getCurrentPosition);

// a good idea to not change the main weather
let temperatureMain = null;

// weather convertion
function toCelsius() {
  document.querySelector("h1").innerHTML = temperatureMain;
  fahrenheit.classList.remove("text-primary", "fw-bold");
  celsius.classList.add("text-primary", "fw-bold");
}
let celsius = document.getElementById("celsius");
celsius.addEventListener("click", toCelsius);

function toFahrenheit() {
  document.querySelector("h1").innerHTML = temperatureMain * 9.5 + 32;
  celsius.classList.remove("text-primary", "fw-bold");
  fahrenheit.classList.add("text-primary", "fw-bold");
}

let fahrenheit = document.getElementById("fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);
forecast();
search("Tehran");
