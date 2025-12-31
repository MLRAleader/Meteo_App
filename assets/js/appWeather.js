const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

const tempEl = document.querySelector(".temp");
const cityEl = document.querySelector(".city");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather img");
const weatherDescriptionEl = document.querySelector(".weather-description");

const apiKey = "9a3b506ec98d3255aeb8ec93fd265784";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {

  if (city.trim() === "") {
    errorDiv.style.display = "block";
    weatherDiv.style.display = "none";
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  if (response.status !== 200) {
    errorDiv.style.display = "block";
    weatherDiv.style.display = "none";
    return;
  }

  // 🔥 Ici seulement les données sont sûres
  cityEl.textContent = data.name;
  tempEl.textContent = Math.round(data.main.temp) + "°C";
  humidityEl.textContent = data.main.humidity + "%";
  windEl.textContent = data.wind.speed + " km/h";

  const icon = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  errorDiv.style.display = "none";
  weatherDiv.style.display = "block";
}


searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchInput.value);
  }
})
