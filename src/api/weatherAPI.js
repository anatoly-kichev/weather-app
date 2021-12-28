import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OPTIONS = '&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1/' }),
  endpoints: (builder) => ({
    getWeatherByCoordinates: builder.query({
      query: ({ latitude, longitude, timezone }) =>
        `forecast?latitude=${latitude}&longitude=${longitude}${OPTIONS}&timezone=${timezone}`,
      transformResponse: (response) => ({
        currentTemperature: Math.round(response.current_weather.temperature),
        currentWeathercode: response.current_weather.weathercode,
        time: Date.parse(response.current_weather.time),
        sunrise: Date.parse(response.daily.sunrise[0]),
        sunset: Date.parse(response.daily.sunset[0]),
        weakly: [...response.daily.temperature_2m_max].slice(0, -2).map((item, index) => ({
          temperatureMax: Math.round(item),
          temperatureMin: Math.round(response.daily.temperature_2m_min[index]),
          weathercode: response.daily.weathercode[index],
          day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(Date.parse(response.daily.time[index]))
        }))
      })
    })
  }),
});

export const { useGetWeatherByCoordinatesQuery } = weatherApi;
