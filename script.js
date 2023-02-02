// Seach text and Search Button
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var forecast = document.getElementById("fiveday-forecast");
var todayWeather = document.getElementById("today-weather");
var currentCityName = document.getElementById("current-city-name");

function secondCall(lat, lon, currentCity) {
  var GET_WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=0492fcec51078a456b3b312201fb3dea`;

  fetch(GET_WEATHER_URL)
    .then(function (resp) {
      console.log(resp);
      return resp.json();
    })
    .then(function (data) {
      todayWeather.innerHTML = "";
      forecast.innerHTML = "";
      console.log(data);

      for (i = 0; i < 7; i++) {
        var div = document.createElement("div");

        var temp = document.createElement("p");
        var humid = document.createElement("p");
        var wind = document.createElement("p");
        wind.textContent = "Wind:" + data.daily[i].wind_speed;
        temp.textContent = "Temp" + data.daily[i].temp.day;
        humid.textContent = "Humidity:" + data.daily[i].humidity;
        div.appendChild(temp).appendChild(humid).appendChild(wind);
        div.classList.add("border");
        div.classList.add("border-danger");

        if (i === 0) {
          todayWeather.appendChild(div);
          currentCityName.textContent = currentCity;
        } else {
          forecast.appendChild(div);
        }

        console.log(data.daily[i]);
      }
    });
}

function onSearch() {
  console.log("hit");
  if (!searchInput.value) {
    alert("Please enter a location");
    return;
  }

  var GET_CORDINATES_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=5&appid=0492fcec51078a456b3b312201fb3dea`;

  fetch(GET_CORDINATES_URL)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data[0].lat);

      var latitude = data[0].lat;
      var longitude = data[0].lon;

      secondCall(latitude, longitude, searchInput.value);
    });
}

searchButton.addEventListener("click", onSearch);
