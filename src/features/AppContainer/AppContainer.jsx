import { useState } from 'react';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import { WeatherWidget } from '../WeatherWidget/WeatherWidget';
import { useGetCoordinatesBySearchQuery } from '../../api/geocodingAPI';
import { useGetWeatherByCityCoordinatesQuery } from '../../api/weatherAPI';

export const AppContainer = () => {
  const [inputText, setInputText] = useState('');

  const {
    data: coordinatesData = [{
      latitude: undefined,
      longitude: undefined
    }]
  } = useGetCoordinatesBySearchQuery(inputText);

  const {
    data: weatherData = {
      current_weather: {
        temperature: 0,
        weathercode: 0
      }
    }
  } = useGetWeatherByCityCoordinatesQuery({
    latitude: coordinatesData[0].latitude,
    longitude: coordinatesData[0].longitude
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
      <WeatherWidget weather={weatherData} />
    </>
  )
}
