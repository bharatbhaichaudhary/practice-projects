const cityName = document.querySelector(".weathr_city");
const dataTime = document.querySelector(".weather_data_time");
const w_forecast = document.querySelector(".weather_forecast");
const w_temperature = document.querySelector(".weather_temperature");
const w_icon = document.querySelector(".weather_icon");
const w_minTem = document.querySelector(".weather_min");
const w_maxTem = document.querySelector(".weather_max");

const w_feelsLike = document.querySelector(".weather_feelsLike");
const w_humidity = document.querySelector(".weather_humidity");
const w_wind = document.querySelector(".weather_wind");
const w_pressure = document.querySelector(".weather_pressure");

const citySearch = document.querySelector(".weather_search");

const getCountyName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDataTime = (dt) => {
  const curData = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  // console.log(formatter.format(curData));
  return formatter.format(curData);
};
let city = "ahmedabad";

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  console.log(cityName.value);
  city = cityName.value;
  getWeatherData();
  cityName.value = "";
});

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd0540727673f80d294cc062f54b3c64`;
  try {
    const ref = await fetch(weatherUrl);
    const JsonData = await ref.json();
    const { main, name, weather, wind, sys, dt } = JsonData;

    cityName.innerHTML = `${name}, ${getCountyName(sys.country)}`;
    dataTime.innerHTML = getDataTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

    w_temperature.innerText = `${main.temp.toFixed() - 273}°C`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed() - 273}°C`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed() - 273}°C`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed() - 273}°C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hpa`;

    console.log(JsonData);
  } catch (err) {
    console.log(err);
  }
};

document.body.addEventListener("load", getWeatherData());
