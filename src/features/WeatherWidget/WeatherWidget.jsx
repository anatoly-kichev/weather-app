import styles from './WeatherWidget.module.css';

export const WeatherWidget = ({ weather }) => {
  return (
    <div className={styles.widget}>
      <div className={styles.mainBlock}>
        <div className={styles.cityName}>
          {'Moscow'}
        </div>
        <div className={styles.weatherIcon}></div>
        <div className={styles.currentWeather}>
          <span className={styles.currentTemperature}>
            {weather.current_weather.temperature}&deg;C
          </span>
          <span className={styles.currentInfo}>
            {weather.current_weather.weathercode}
          </span>
        </div>
      </div>
      {console.log(weather)}
    </div>
  );
}
