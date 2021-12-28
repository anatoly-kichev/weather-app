import styles from './WeatherWidget.module.css';
import { useGetWeatherByCoordinatesQuery } from '../../api/weatherAPI';

export const WeatherWidget = ({ coordinates }) => {
  const getWeatherInfo = (weathercode) => {
    switch (weathercode) {
      case 0:
        return {
          descr: 'Clear',
          iconCode: '01'
        };
      case 1:
        return {
          descr: 'Mainly clear',
          iconCode: '02'
        };
      case 2:
        return {
          descr: 'Partly cloudy',
          iconCode: '03'
        };
      case 3:
        return {
          descr: 'overcast',
          iconCode: '04'
        };
      case 45:
      case 48:
        return {
          descr: 'Fog',
          iconCode: '50'
        };
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return {
          descr: 'Drizzle',
          iconCode: '09'
        };
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return {
          descr: 'Rain',
          iconCode: '10'
        };
      case 71:
      case 73:
      case 75:
        return {
          descr: 'Snow',
          iconCode: '13'
        };
      case 77:
        return {
          descr: 'Snow grains',
          iconCode: '13'
        };
      case 80:
      case 81:
      case 82:
        return {
          descr: 'Rain showers',
          iconCode: '10'
        };
      case 85:
      case 86:
        return {
          descr: 'Snow showers',
          iconCode: '13'
        };
      case 95:
      case 96:
      case 99:
        return {
          descr: 'Thunderstorm',
          iconCode: '11'
        };
      default: return {
        descr: 'Unknown',
        iconCode: '01'
      };
    }
  }

  const getImageUrl = (iconCode, isLarge = false, isDay = true) => {
    let url = `http://openweathermap.org/img/wn/${iconCode}`;

    if (isDay) {
      url += 'd';
    } else {
      url += 'n';
    }

    if (isLarge) {
      url += '@4x';
    }

    return `${url}.png`;
  };

  const {
    data: weather = {
      currentTemperature: null,
      currentWeathercode: null,
      time: null,
      sunrise: null,
      sunset: null,
      weakly: []
    }
  } = useGetWeatherByCoordinatesQuery({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    timezone: coordinates.timezone
  });

  const currentWeatherInfo = getWeatherInfo(weather.currentWeathercode);
  const isDay = weather.time - weather.sunrise < weather.sunset - weather.sunrise;
  const imgSrc = getImageUrl(currentWeatherInfo.iconCode, true, isDay);

  return (
    <div className={styles.widget}>
      <div className={styles.mainBlock}>
        <div className={styles.place}>
          <span className={styles.cityName}>
            {coordinates.city}
          </span>
          <span className={styles.countryName}>
            {coordinates.country}
          </span>
        </div>
        <img className={styles.weatherIcon} src={imgSrc} alt="weather" />
        <div className={styles.currentWeather}>
          <span className={styles.currentTemperature}>
            {weather.currentTemperature}&#8451;
          </span>
          <span className={styles.currentInfo}>
            {currentWeatherInfo.descr}
          </span>
        </div>
      </div>
      <div className={styles.extraBlock}>
        {weather.weakly && weather.weakly.map(dailyWeather => (
          <div className={styles.dailyWeather}>
            <div className={styles.left}>
              <span className={styles.day}>{dailyWeather.day}</span>
              <img src={getImageUrl(getWeatherInfo(dailyWeather.weathercode).iconCode)} alt="weather" />
            </div>
            <div className={styles.right}>
              <span className={styles.temperatureMax}>{dailyWeather.temperatureMax}&#8451;</span>
              <span className={styles.temperatureMin}>{dailyWeather.temperatureMin}&#8451;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
