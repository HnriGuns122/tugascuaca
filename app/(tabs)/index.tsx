import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from './constant';
import WeatherSearch from './weatherSearch';
import WeatherInfo from './weatherInfo';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState('');

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />;
      case 'success':
        return <WeatherInfo weatherData={weatherData} />;
      case 'error':
        return (
          <Text style={styles.errorText}>
            Something went wrong. Please try again with a correct city name.
          </Text>
        );
      default:
        return null;
    }
  };

  const searchWeather = (location) => {
    setStatus('loading'); // Set status to loading when starting the search
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15;
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data); // Set weather data upon successful response
        setStatus('success'); // Set status to success after setting weather data
      })
      .catch((error) => {
        setStatus('error'); // Set status to error if there is an error in the request
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      {renderComponent()} {/* Render the appropriate component based on status */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default App;
