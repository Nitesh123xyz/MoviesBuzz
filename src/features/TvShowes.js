import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ACCOUNT_ID, API_KEY } from '@env';
export const MoviesSlice = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: headers => {
      headers.set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWQ4MWI0OGVhMjA0NTJjNzdhY2RkMzM5Y2IzNDFiOSIsIm5iZiI6MTc1OTgxOTk4Mi43NjksInN1YiI6IjY4ZTRiOGNlMmE1YTQxZWQyZjYxODExYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PinUJDCdULj09w_uyajuFa0qZ_nBdmq-CBSiSatNoWo',
      );
      headers.set('accept', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    getAllTrendingTVShows: builder.query({
      query: () => `/trending/tv/day?language=en-US?api_key=${API_KEY}`,
    }),
  }),
});

export const { useGetAllTrendingTVShowsQuery } = MoviesSlice;
