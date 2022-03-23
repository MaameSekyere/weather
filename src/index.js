function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay(3)];
  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  let temperatureEl = document.querySelector("#temperature");
  let cityEl = document.querySelector("#city");
  let descriptionEl = document.querySelector("#description");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let dateEl = document.querySelector("#date");
  let iconEl = document.querySelector("#icon");

  celsiusDegree = response.data.main.temp;

  temperatureEl.innerHTML = Math.round(celsiusDegree);
  cityEl.innerHTML = response.data.name;
  descriptionEl.innerHTML = response.data.weather[0].description;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  dateEl.innerHTML = showDate(response.data.dt * 1000);
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "573a564668504c3a4328912c04e8e7e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusDegree * 9) / 5 + 32);
  let temperatureEl = document.querySelector("#temperature");
  temperatureEl.innerHTML = fahrenheitTemp;
}

function submitHandle(event) {
  event.preventDefault();
  let citySearchEl = document.querySelector("#city-search");
  search(citySearchEl.value);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureEl = document.querySelector("#temperature");
  temperatureEl.innerHTML = Math.round(celsiusDegree);
}

let celsiusDegree = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", submitHandle);

let fahrenheitDegree = document.querySelector("#fahrenheit-degree");
fahrenheitDegree.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Buffalo");
