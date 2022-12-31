function formatDate() {
  let week = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
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
  let day = week[now.getDay() - 1];
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

function forecast(res) {
  console.log(res);
  console.log(res && res.data.daily[3].time);
  // let forecast = res.data.daily;
  // console.log(forecast);
  // let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  //  res &&
    //  res.data.daily.forEach(function (day,index) {
    //    forecastHTML =
    //      forecastHTML +
    //      `
    //     <div class="col-2">
    //       <div class="weather-forecast-date">${day}</div>
    //       <img
    //         src="http://openweathermap.org/img/wn/50d@2x.png"
    //         alt=""
    //         width="42"
    //       />
    //       <div class="weather-forecast-temperatures">
    //         <span class="weather-forecast-temperature-max"> 18° </span>
    //         <span class="weather-forecast-temperature-min"> 12° </span>
    //       </div>
    //     </div>
    // `;
    //  });

  // forecastHTML = forecastHTML + `</div>`;
  // forecastElement.innerHTML = forecastHTML;
}
function getForecast(coords) {
  console.log(coords);
  let apikey = "256e0719bob599t8f79f42a814ed4fe3";
  let lat = coords.latitude;
  let lon = coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apikey}&units=metric`;
  axios.get(url).then(forecast);
}
//change data based on thee city
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
