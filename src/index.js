function handleResponse(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#weather-data-city");
  let temperatureElement = document.querySelector("#weather-data-temperature");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#weather-data-condition");
  let dateElement = document.querySelector("#weather-data-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-data-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${Math.round(temperature)}°`;
  descriptionElement.innerHTML = response.data.condition.description;
  dateElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="weather-data-icon" />`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "92dd828taa17b53d1feo43a40bd1ab2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(handleResponse);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours() % 12 || 12;
  let day = date.getDate();
  let year = date.getFullYear();

  let months = [
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
  let month = months[date.getMonth()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 12) {
    return `${month} ${day}, ${year} <br /> ${hours}:${minutes} AM`;
  } else {
    return `${month} ${day}, ${year} <br /> ${hours}:${minutes} PM`;
  }

  //   return `${month} ${day}, ${year} <br /> ${hours}:${minutes} `
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"]


    return days[date.getDay()]
}

function getForecast(city) {
  let apiKey = "92dd828taa17b53d1feo43a40bd1ab2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dislayForecast);
}

function dislayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
<div class="weather-forecast-date">${formatDay(day.time)}</div>

<div >
<img src="${day.condition.icon_url}" class="weather-forecast-icon" />
</div>
<div class="weather-forecast-temperatures">
<div class="weather-forecast-temperature">
<strong>${Math.round(day.temperature.maximum)}°</strong>
</div>
<div class="weatherforecast-temperature">${Math.round(
        day.temperature.minimum
      )}°</div>
</div>
</div>
`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchForm);

searchCity("San Francisco");
