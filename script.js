// Seach text and Search Button
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");

function secondCall(lat, lon) {
  var GET_WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=0492fcec51078a456b3b312201fb3dea`;

  fetch(GET_WEATHER_URL)
    .then(function (resp) {
      console.log(resp);
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      //create cards here, for loop
    });
}

function onSearch() {
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

      secondCall(latitude, longitude);
    });
}

searchButton.addEventListener("click", onSearch);
