import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { ACCOUNT_ID, API_KEY } from '@env';
const API_KEY = 'b1d81b48ea20452c77acdd339cb341b9';
const ACCOUNT_ID = '22366133';
// const API_KEY = API_KEY;
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
      query: () => `/trending/all/day?language=en-US?api_key=${API_KEY}`,
    }),

    getAllSearchMovies: builder.query({
      query: searchedQuery =>
        `search/movie?query=${
          searchedQuery?.query ?? ''
        }&include_adult=false&language=en-US&page=${
          searchedQuery?.page ?? 1
        }?api_key=${API_KEY}`,
    }),

    getUpcomingMovies: builder.query({
      query: Paginate =>
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${
          Paginate ?? 1
        }?api_key=${API_KEY}`,
    }),
    getLatestMovies: builder.query({
      query: Paginate =>
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${
          Paginate ?? 1
        }?api_key=${API_KEY}`,
    }),
    getMovieDetails: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/movie/${id}?language=en-US?api_key=${API_KEY}`,
    }),
    getSimilarMovies: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1?api_key=${API_KEY}`,
    }),
    getCast: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US?api_key=${API_KEY}`,
    }),
    getCastRelatedMovies: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US?api_key=${API_KEY}`,
    }),
    getCastDetails: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/person/${id}?language=en-US?api_key=${API_KEY}`,
    }),

    // favorite movies
    getFavoriteMovies: builder.query({
      query: sort_by =>
        `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/movies?language=en-US&page=1&sort_by=created_at.${
          sort_by || 'desc'
        }&api_key=${API_KEY}`,
    }),
    addFavoriteMovies: builder.mutation({
      query: favData => ({
        url: `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}`,
        method: 'POST',
        body: favData,
      }),
    }),

    // watch_list movies
    getWatchListMovies: builder.query({
      query: sort_by =>
        `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist/movies?language=en-US&page=1&sort_by=created_at.${
          sort_by || 'desc'
        }&api_key=${API_KEY}`,
    }),
    addWatchListMovies: builder.mutation({
      query: watchListData => ({
        url: `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist?api_key=${API_KEY}`,
        method: 'POST',
        body: watchListData,
      }),
    }),
  }),
});

export const {
  useGetAllTrendingMoviesQuery,
  useGetAllSearchMoviesQuery,
  // ------------------------------
  useGetUpcomingMoviesQuery,
  useGetLatestMoviesQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  // ------------------------------
  useGetCastQuery,
  useGetCastRelatedMoviesQuery,
  useGetCastDetailsQuery,
  // ------------------------------
  useGetFavoriteMoviesQuery,
  useAddFavoriteMoviesMutation,
} = MoviesSlice;
