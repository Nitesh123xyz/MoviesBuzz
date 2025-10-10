import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiKey = 'b1d81b48ea20452c77acdd339cb341b9';
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
    getAllTrendingMovies: builder.query({
      query: () => `/trending/all/day?language=en-US?api_key=${apiKey}`,
    }),

    getUpcomingMovies: builder.query({
      query: () =>
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1?api_key=${apiKey}`,
    }),
    getLatestMovies: builder.query({
      query: () =>
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1?api_key=${apiKey}`,
    }),
    getMovieDetails: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/movie/${id}?language=en-US?api_key=${apiKey}`,
    }),
    getSimilarMovies: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1?api_key=${apiKey}`,
    }),
    getCast: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US?api_key=${apiKey}`,
    }),
    getCastDetails: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/person/${id}?language=en-US?api_key=${apiKey}`,
    }),
  }),
});

export const {
  useGetAllTrendingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetLatestMoviesQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  useGetCastQuery,
  useGetCastDetailsQuery,
} = MoviesSlice;
