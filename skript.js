document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('weatherForm');
    const input = document.getElementById('default-search');
    const weatherInfo = document.getElementById('weatherInfo');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const location = input.value.trim();
        const apiKey = '38cce39ea4117178e467a5fc7ea05a6c'; // Remplacez par votre clé API OpenWeatherMap

        fetchWeather(location, apiKey)
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données météo', error);
                weatherInfo.innerHTML = `<p>Impossible de récupérer les informations météo pour ${location}</p>`;
            });
    });

    async function fetchWeather(location, apiKey) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=fr`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erreur de récupération des données météo');
        }
        return await response.json();
    }

    function updateWeather(data) {
        weatherInfo.innerHTML = `
            <h2>Météo à ${data.name}</h2>
            <p>Température : ${data.main.temp}°C</p>
            <p>Description : ${data.weather[0].description}</p>
            <p>Humidité : ${data.main.humidity}%</p>
        `;
    }
});
