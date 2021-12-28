import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1/' }),
  endpoints: (builder) => ({
    getWeatherByCityCoordinates: builder.query({
      query: ({ latitude, longitude }) => `forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true	`
    })
  }),
});

export const { useGetWeatherByCityCoordinatesQuery } = weatherApi;
