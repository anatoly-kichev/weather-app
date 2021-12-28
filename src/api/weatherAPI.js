import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OPTIONS = '&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1/' }),
  endpoints: (builder) => ({
    getWeatherByCoordinates: builder.query({
      query: ({ latitude, longitude, timezone }) => `forecast?latitude=${latitude}&longitude=${longitude}${OPTIONS}&timezone=${timezone}`
    })
  }),
});

export const { useGetWeatherByCoordinatesQuery } = weatherApi;
