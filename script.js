// --- DOM Element References ---
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');
const cityNameEl = document.getElementById('city-name');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const weatherDescriptionEl = document.getElementById('weather-description');
const minTempEl = document.getElementById('min-temp');
const maxTempEl = document.getElementById('max-temp');

// --- API Configuration ---
// Note: API_KEY is accessed from config.js, which should be loaded before this script.
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// --- Functions ---

/**
 * Updates the UI with the provided weather data.
 * @param {object} data The weather data object from the API.
 */
const displayWeatherData = (data) => {
    // Extract relevant data from the API response
    const { name, sys, main, weather } = data;
    const country = sys.country;
    const temperature = Math.round(main.temp);
    const minTemp = Math.round(main.temp_min);
    const maxTemp = Math.round(main.temp_max);
    const description = weather[0].description;
    const iconCode = weather[0].icon;

    // Update DOM elements with the new data
    cityNameEl.textContent = `${name}, ${country}`;
    temperatureEl.textContent = `${temperature}°C`;
    weatherDescriptionEl.textContent = description;
    minTempEl.textContent = `${minTemp}°C`;
    maxTempEl.textContent = `${maxTemp}°C`;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIconEl.alt = description;

    // Show the weather display container
    weatherDisplay.classList.remove('hidden');
};


/**
 * Fetches weather data for a given city from the OpenWeatherMap API.
 * @param {string} city The name of the city to get weather for.
 */
const fetchWeatherData = async (city) => {
    const url = `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // We can keep this for debugging

        // Pass the data to the display function
        displayWeatherData(data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// --- Event Listeners ---
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name.");
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchBtn.click();
    }
});