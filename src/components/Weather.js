import { useState, useEffect } from "react";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import 'animate.css';
import clear from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rain from "../assets/images/rain.png";
import snow from "../assets/images/snow.png";
import thunder from "../assets/images/thunder.png";
import mist from "../assets/images/mist.png";


export default function Weather({ city, API_KEY, onWeatherChange }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        
        if (data.weather && data.weather[0]) {
          setWeather(data);
          setError(false);

          // Determine weather type for background
          const main = data.weather[0].main.toLowerCase();
          
          let weatherType = "clear";
          if (main.includes("rain")) weatherType = "rain";
          else if (main.includes("cloud")) weatherType = "cloudy";
          else if (main.includes("snow")) weatherType = "snow";
          else if (main.includes("thunder")) weatherType = "thunderstorm";
          else if (main.includes("clear")) weatherType = "clear";
          else if (main.includes("sunny")) weatherType = "sunny";
          else if (main.includes("mist") || main.includes("fog")) weatherType = "foggy";
          
          if (onWeatherChange) {
            onWeatherChange(weatherType);
          }
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchWeather();
  }, [city, API_KEY, onWeatherChange]);

  return (
    <div className="weather-details">
      {weather && weather.weather && weather.weather[0] ? (
        <div className="weather-info">
          <div className="weather" >
            <p className="description">{weather.weather[0].description}</p>
            <p className="temperature">{Math.round(weather.main.temp)}°C</p>
            <div className="weather-icon animate__animated animate__fadeIn animate__slow">
            {weather.weather[0].main.includes("Clear") && (<img src={clear} alt="Clear" />)}
            {weather.weather[0].main.includes("Cloud") && (<img src={cloudy} alt="Cloudy" />)}
            {weather.weather[0].main.includes("Rain") && (<img src={rain} alt="Clear" />)}
            {weather.weather[0].main.includes("Snow") && (<img src={snow} alt="Snow" />)}
            {weather.weather[0].main.includes("Thunder") && (<img src={thunder} alt="Thunderstorm" />)}
            {weather.weather[0].main.includes("Mist") && (<img src={mist} alt="Mist" />)}
          </div>
          </div>

          <div className="weather-text">
              <div className="weather-details-grid">
                <div className="detail-card">
                  <FaTemperatureHigh className="detail-icon" />
                  <p>{Math.round(weather.main.feels_like)}°C</p>
                  <span>Feels Like</span>
                </div>

                <div className="detail-card">
                  <WiHumidity className="detail-icon" />
                  <p>{weather.main.humidity}%</p>
                  <span>Humidity</span>
                </div>

                <div className="detail-card">
                  <WiStrongWind className="detail-icon" />
                  <p>{weather.wind.speed} m/s</p>
                  <span>Wind</span>
                </div>

                <div className="detail-card">
                  <WiBarometer className="detail-icon" />
                  <p>{weather.main.pressure} hPa</p>
                  <span>Pressure</span>
                </div>
              </div>

          </div>
        </div>
      ) : error ? (
        <p>Could not fetch weather</p>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}
