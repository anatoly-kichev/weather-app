import { useState } from 'react';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import { WeatherWidget } from '../WeatherWidget/WeatherWidget';
import { useGetCoordinatesBySearchQuery } from '../../api/geocodingAPI';
import { useGetWeatherByCoordinatesQuery } from '../../api/weatherAPI';

export const AppContainer = () => {
  const [inputText, setInputText] = useState('Moscow');

  const {
    data: coordinatesData = [{
      latitude: undefined,
      longitude: undefined,
      city: undefined,
      country: undefined,
      timezone: undefined
    }]
  } = useGetCoordinatesBySearchQuery(inputText);

  const {
    data: weatherData = {
      current_weather: {
        temperature: 0,
        weathercode: 0
      }
    }
  } = useGetWeatherByCoordinatesQuery({
    latitude: coordinatesData[0].latitude,
    longitude: coordinatesData[0].longitude,
    timezone: coordinatesData[0].timezone
  });

  const onChangeInput = (event) => {
    setInputText(event.target.value);
  }

  const onKeyPress = (event) => {
    if (inputText.length > 0 && event.key === 'Enter') {
      setInputText('');
    }
  }

  return (
    <>
      <SearchPanel
        value={inputText}
        onChangeInput={onChangeInput}
        onKeyPress={onKeyPress}
      />
      <WeatherWidget weather={weatherData} city={coordinatesData[0].city} country={coordinatesData[0].country} />
    </>
  )
}
