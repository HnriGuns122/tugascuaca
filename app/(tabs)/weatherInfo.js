import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Weather data not available</Text>
      </View>
    );
  }

  const temperature = `${weatherData.main.temp} °C`;
  const weatherDescription = weatherData.weather[0].description;
  const iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const visibility = `${weatherData.visibility / 1000} km`;
  const windSpeed = `${weatherData.wind.speed} m/s`;

  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>Weather in {weatherData.name}</Text>
      <Text style={styles.temperature}>{temperature}</Text>
      <View style={styles.weatherContainer}>
        <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
        <Text style={styles.weatherDescription}>{weatherDescription}</Text>
      </View>
      <Text style={styles.additionalInfo}>Visibility: {visibility}</Text>
      <Text style={styles.additionalInfo}>Wind Speed: {windSpeed}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 3,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    fontSize: 20,
    marginLeft: 10,
  },
  additionalInfo: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default WeatherInfo;
