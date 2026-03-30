const apiKey = "04e4120d0a8b1ceb1aa7365a9bdc5406"; // <--- APNI API KEY YAHAN DAALO
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Dynamic Weather Icons based on condition
        const condition = data.weather[0].main;
        if (condition == "Clouds") weatherIcon.src = "images/clouds.png";
        else if (condition == "Clear") weatherIcon.src = "images/clear.png";
        else if (condition == "Rain") weatherIcon.src = "images/rain.png";
        else if (condition == "Drizzle") weatherIcon.src = "images/drizzle.png";
        else if (condition == "Mist") weatherIcon.src = "images/mist.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Enter Key Event
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});


checkWeather("Delhi");