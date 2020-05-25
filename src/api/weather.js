import keys from "../config/keys";

export default async function getWeather(query) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&APPID=${keys.key}`
  );
}
