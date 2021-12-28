import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geocodingApi = createApi({
  reducerPath: 'geocodingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://geocoding-api.open-meteo.com/v1/' }),
  endpoints: (builder) => ({
    getCoordinatesBySearch: builder.query({
      query: (name) => `search?name=${name}`,
      transformResponse: (response) => response.results.map(city => ({
        latitude: city.latitude,
        longitude: city.longitude,
        city: city.name,
        country: city.country,
        timezone: city.timezone.replace('/', '%2F')
      }))
    })
  }),
});

export const { useGetCoordinatesBySearchQuery } = geocodingApi;
