const API_KEY_OPENWEATHER = '9bf63076e927eed9635a40c20996ddbd';
const API_KEY_GIPHY = '0eQyOcNobHoQoD9NhZJStJjSZD8Sa7u1';

async function getWeatherResponse(cityName) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY_OPENWEATHER}`, {mode: 'cors'});
  const weatherJSON = await response.json();

  return weatherJSON;
}

async function getWeatherObject(weatherJSON) {
  const weatherObject = {
    cityName: weatherJSON.name,
    temp: weatherJSON.main.temp,
    humidity: weatherJSON.main.humidity,
    wind: weatherJSON.wind.speed,
    description: weatherJSON.weather[0].description,
    weatherGif: await getWeatherGif(weatherJSON.weather[0].description),
    feelsLike: weatherJSON.main.feels_like,
    cloudiness: weatherJSON.clouds.all,
  }

  return weatherObject;
}

async function getWeatherGif(description) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY_GIPHY}&s=${description}`, {mode: 'cors'})
  const weatherData = await response.json();

  return weatherData.data.images.original.url;
}

function displayDOMWeatherInfo(weatherObject) {
  const cityName = document.getElementById('cityName');
  const temp = document.getElementById('temp');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');
  const description = document.getElementById('description');
  const weatherGif = document.getElementById('weatherGif');
  const feelsLike = document.getElementById('feelsLike');
  const cloudiness = document.getElementById('cloudiness');

  cityName.textContent = weatherObject.cityName.toUpperCase();
  temp.textContent = `${weatherObject.temp}\u00B0C`;
  humidity.textContent = `Humidity: ${weatherObject.humidity}%`;
  wind.textContent = `Wind speed: ${weatherObject.wind} m/s`;
  description.textContent = weatherObject.description.charAt(0).toUpperCase() + weatherObject.description.slice(1);;
  weatherGif.src = weatherObject.weatherGif;
  feelsLike.textContent = `Feels like: ${weatherObject.feelsLike}\u00B0C`;
  cloudiness.textContent = `Cloudiness: ${weatherObject.cloudiness}%`;
}

async function initEvents() {
  const inpCityName = document.querySelector('#inpCityName');
  const btnGetWeatherInfo = document.querySelector('#btnGetWeatherInfo');
  btnGetWeatherInfo.addEventListener('click', async () => {
    const loader = document.querySelector('#loader');
    loader.style.visibility = 'visible';
    displayDOMWeatherInfo({
      cityName: 'Please wait a bit... or try again',
      temp: '',
      humidity: '',
      wind: '',
      description: '',
      weatherGif: await getWeatherGif('wait'),
      feelsLike: '',
      cloudiness: '',
    });

    const weatherObject = await getWeatherObject(await getWeatherResponse(inpCityName.value));
    loader.style.visibility = 'hidden';
    displayDOMWeatherInfo(weatherObject);
    inpCityName.value = '';
  });

  inpCityName.value = 'Ho Chi Minh';
  btnGetWeatherInfo.click();
}

initEvents();