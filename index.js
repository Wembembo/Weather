const weatherform = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "82ff517e39647b26bde80d9d4b229293";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city")
    };
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl)
    console.log(response);
    if(!response.ok){
        throw new Error(`could not fetch weather data`);
    }
    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);
    const {name: city, 
            main:{temp, humidity}, 
            weather: [{description, id}]} = data;
            card.textContent=``;
            card.style.display=`flex`;
            const cityDisplay = document.createElement("h1");
            const tempDisplay = document.createElement("p");
            const humidityDisplay = document.createElement("p");
            const descDisplay = document.createElement("p");
            const weatherEmoji = document.createElement("p");

            cityDisplay.textContent=city;
            tempDisplay.textContent=`${(temp-273.15).toFixed(1)} Celcius`;
            humidityDisplay.textContent=`Humidity: ${humidity}%`;
            descDisplay.textContent=description;
            weatherEmoji.textContent=getWeatherEmoji(id);

            cityDisplay.classList.add("cityDisplay");
            tempDisplay.classList.add("tempDisplay");
            humidityDisplay.classList.add("humidityDisplay");
            descDisplay.classList.add("descDisplay");
            weatherEmoji.classList.add("weatherEmoji");
            
            card.appendChild(cityDisplay);
            card.appendChild(tempDisplay);
            card.appendChild(humidityDisplay);
            card.appendChild(descDisplay);
            card.appendChild(weatherEmoji)


}

function getWeatherEmoji(weatherID){
    switch(true){
        case(weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case(weatherID >= 300 && weatherID < 500):
            return "🌦️";
        case(weatherID >= 500 && weatherID < 600):
            return "🌧️";
        case(weatherID >= 600 && weatherID < 700):
            return "❄️";
        case(weatherID === 701):
            return "🌫️"
        case(weatherID === 711):
            return"🚬"
        case(weatherID === 721):
            return"🌁"
        case(weatherID === 731):
            return "🧹"
        case(weatherID === 741):
            return "🌁"
        case(weatherID === 751):
            return "⛱️"
        case(weatherID === 761):
            return "🧹"
        case(weatherID === 762):
            return "🌋"
        case(weatherID === 771):
            return "💨"
        case(weatherID === 781):
            return "🌪️"
        case(weatherID === 800):
            return "☀️"
        case(weatherID >= 801 && weatherID < 900):
            return "⛅"
        default:
            return "❓"
    } 

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent= "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}