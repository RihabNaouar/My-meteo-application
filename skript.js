document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.getElementById("weatherForm");
    const weatherInfo = document.getElementById("weatherInfo");
  
    weatherForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const searchInput = document.getElementById("default-search").value;
      const apiKey = '35d21473795fa894140675103acdc259'; 
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric&lang=fr`;
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        weatherInfo.innerHTML = `<p class="text-red-500">${error.message}</p>`;
      }
    });
  
    function displayWeather(data) {
      const { name, main, weather } = data;
      const weatherDetails = `
        <h2 class="text-2xl font-bold">${name}</h2>
        <p class="text-xl">${weather[0].description}</p>
        <p class="text-lg">Température: ${main.temp}°C</p>
        <p class="text-lg">Humidité: ${main.humidity}%</p>
      `;
      weatherInfo.innerHTML = weatherDetails;
    }
  });
  