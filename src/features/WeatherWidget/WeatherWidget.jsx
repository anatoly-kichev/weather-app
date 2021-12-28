import styles from './WeatherWidget.module.css';

export const WeatherWidget = ({ weather, city, country }) => {
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

  const weatherInfo = getWeatherInfo(weather.current_weather.weathercode);
  const imgSrc = 'http://openweathermap.org/img/wn/' + weatherInfo.iconCode + 'd@4x.png';

  return (
    <div className={styles.widget}>
      <div className={styles.mainBlock}>
        <div className={styles.place}>
          <span className={styles.cityName}>
            {city}
          </span>
          <span className={styles.countryName}>
            {country}
          </span>
        </div>
        <img className={styles.weatherIcon} src={`${imgSrc}`} alt="weather" />
        <div className={styles.currentWeather}>
          <span className={styles.currentTemperature}>
            {Math.round(weather.current_weather.temperature)}&#8451;
          </span>
          <span className={styles.currentInfo}>
            {weatherInfo.descr}
          </span>
        </div>
      </div>
      {console.log(weather)}
    </div>
  );
}
