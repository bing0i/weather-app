const API_KEY_OPENWEATHER = '9bf63076e927eed9635a40c20996ddbd';
const API_KEY_GIPHY = '0eQyOcNobHoQoD9NhZJStJjSZD8Sa7u1';

async function getWeatherResponse(cityName) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY_OPENWEATHER}&units=metric`, {mode: 'cors'});
  const weatherJSON = await response.json();

  return weatherJSON;
}

function getWeatherObject(weatherJSON) {
  const weatherObject = {
    cityName: weatherJSON.name,
    temp: weatherJSON.main.temp,
    humidity: weatherJSON.main.humidity,
    wind: weatherJSON.wind.speed,
    description: weatherJSON.weather[0].description,
  }

  return weatherObject;
}

// async function getCats() {
//   const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY_OPENWEATHER}&s=cats`, {mode: 'cors'})
//   const catData = await response.json();
//   img.src = catData.data.images.original.url;
// }

function initEvents() {
  const btnGetWeatherInfo = document.querySelector('#btnGetWeatherInfo');
  btnGetWeatherInfo.addEventListener('click', async () => {
    const inpCityName = document.querySelector('#inpCityName');
    const weatherObject = getWeatherObject(await getWeatherResponse(inpCityName.value));
    console.log(weatherObject);
  });
}

initEvents();