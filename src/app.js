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

function changeData(res) {
  console.log(res.data.weather[0].icon);
   document.querySelector("#icon").src =
     `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
  document.querySelector("h1").innerHTML =
    Math.round(res.data.main.temp) + "°C";
  document.querySelector("#description").innerHTML = res.data.weather[0].main;
  document.querySelector("#precepitation").innerHTML = "Precepitation: ";
  document.querySelector("#humidity").innerHTML =
    "Humidity: " + res.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    "Wind speed: " + res.data.wind.speed + " km/h";
  console.log(res.data);
}

function search(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(changeData);
}

function changeCity(event) {
  event.preventDefault();
  let input = document.getElementById("input_value");
  let city = input.value;
  document.getElementById("city").innerHTML = input.value;
  search(city);
}
search("Tehran");
document.getElementById("form").addEventListener("submit", changeCity);

function showLocation(location) {
  console.log(location);
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  console.log(lat, lon);

  function showCurrent(loc) {
    document.getElementById("city").innerHTML = loc.data.name;
    document.querySelector("#icon").innerHTML = "";
    document.querySelector("h1").innerHTML =
      Math.round(loc.data.main.temp) + "°C";
    document.querySelector("#description").innerHTML = loc.data.weather[0].main;
    document.querySelector("#humidity").innerHTML =
      "Humidity: " + loc.data.main.humidity + "%";
    document.querySelector("#wind").innerHTML =
      "Wind speed: " + loc.data.wind.speed + " km/h";
    console.log(loc.data);
  }
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let urlSecond = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(urlSecond).then(showCurrent);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

document
  .getElementById("current")
  .addEventListener("click", getCurrentPosition);
