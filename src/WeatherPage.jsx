
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherPage.css'

const WeatherPage = () => {
  const { name } = useParams(); // Get cityName from URL parameters
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (name) { 
      fetchWeather(name);
    }
  }, [name]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2bdd6e8fcf91d0f78b9694bf84bfcc0&units=metric`);
      setWeatherData(response.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data.');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center bgg">
      <div className="row weather-page w-50  ">
        <div className="col-12 col-md-8 w-100 bg-info border-info rounded-2 h-50 col-lg-6">
          <h1 className="text-center text-decoration-underline fst-italic mb-4 mt-2">Weather Information</h1>
          
          {error && <p className="text-danger text-center">{error}</p>}
          
          {weatherData ? (
            <div className=" bg-light p-3 rounded">
              <h2 className="text-center mb-5 fst-italic">{weatherData.name}</h2>
              <div className="row">
                <div className="col-12 col-md-6 mb-2">
                  <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading weather data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;

