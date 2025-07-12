const apiKey = "6c687da9e8fba466b9c8beadf0ba4535"; 

const getWeatherBtn = document.getElementById("getWeatherBtn");
const status = document.getElementById("status");
const result = document.getElementById("result");
const loader = document.getElementById("loader");

const cityInput = document.getElementById("cityInput");
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

let isCelsius = true;

document.getElementById("celsiusBtn").addEventListener("click", () => {
  isCelsius = true;
});

document.getElementById("fahrenheitBtn").addEventListener("click", () => {
  isCelsius = false;
});

getWeatherBtn.addEventListener("click", () => {
  const userCity = cityInput.value.trim();

  if (!userCity) {
    status.textContent = "❌ Please enter a city name!";
    result.classList.add("hidden");
    return;
  }

  status.textContent = `🔄 Fetching weather for ${userCity}...`;
  result.classList.add("hidden");
  loader.classList.remove("hidden");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      userCity
    )}&units=${isCelsius ? "metric" : "imperial"}&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      city.textContent = `📍 City: ${data.name}`;
      temperature.textContent = `🌡️ Temperature: ${data.main.temp} ${isCelsius ? "°C" : "°F"}`;
      condition.textContent = `🌥️ Condition: ${data.weather[0].main}`;
      wind.textContent = `💨 Wind Speed: ${data.wind.speed} km/h`;

      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt = data.weather[0].description;

      status.textContent = "✅ Weather fetched successfully!";
      result.classList.remove("hidden");
    })
    .catch((error) => {
      console.error(error);
      status.textContent = "❌ Could not fetch weather. Check city name!";
      result.classList.add("hidden");
    })
    .finally(() => {
      loader.classList.add("hidden");
    });
});
