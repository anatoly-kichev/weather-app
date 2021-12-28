import { useState } from 'react';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import { WeatherWidget } from '../WeatherWidget/WeatherWidget';
import { useGetCoordinatesBySearchQuery } from '../../api/geocodingAPI';
import styles from './AppContainer.module.css'

export const AppContainer = () => {
  const [inputText, setInputText] = useState('');

  const {
    data: coordinatesData = [{
      latitude: undefined,
      longitude: undefined,
      city: undefined,
      country: undefined,
      timezone: undefined
    }],
    isSuccess
  } = useGetCoordinatesBySearchQuery(inputText);

  const onChangeInput = (event) => {
    setInputText(event.target.value);
  }

  const onKeyPress = (event) => {
    if (inputText.length > 0 && event.key === 'Enter') {
      setInputText('');
    }
  }

  return (
    <div className={styles.appContainer}>
      <SearchPanel
        value={inputText}
        onChangeInput={onChangeInput}
        onKeyPress={onKeyPress}
      />
      {isSuccess && coordinatesData.map(coordinates => (
        <WeatherWidget coordinates={coordinates} />))}
    </div>
  )
}
