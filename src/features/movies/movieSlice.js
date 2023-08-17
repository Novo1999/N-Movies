import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: [{ moviesPoster: [] }],
    popularSeries: [{ seriesPoster: [] }],
    popularMoviesPage: "",
    isMoviesLoading: false,
    isSeriesLoading: false,
  },
  reducers: {
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload.results;
      state.popularMovies.moviesPoster = action.payload.results.map(
        (movie) => `https://image.tmdb.org/t/p/original${movie.poster_path}`
      );
    },
    getPopularSeries: (state, action) => {
      state.popularSeries = action.payload.results;
      state.popularSeries.seriesPoster = action.payload.results.map(
        (series) => `https://image.tmdb.org/t/p/original${series.poster_path}`
      );
    },
    popularMoviesPage: (state, action) => {
      state.page = action.payload;
    },
    moviesLoading: (state, action) => {
      state.isMoviesLoading = action.payload;
    },
    seriesLoading: (state, action) => {
      state.isSeriesLoading = action.payload;
    },
  },
});

export function fetchMovies(query, page) {
  return async function (dispatch, getState) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGUxYzkwZTM2ODA0OTBiNWYxOWIwZDZmMWRiNjljZSIsInN1YiI6IjY0ZGNhYjI3MDAxYmJkMDQxYWYzYzMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UsYP_fdC5O1-eBJtoo4_lAf0xYDkX3Bhlk64cHo0bxk",
      },
    };
    dispatch({ type: "movie/moviesLoading", payload: true });
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${query}?language=en-US&page=${page}`,
      options
    );
    const data = await res.json();
    dispatch({ type: "movie/moviesLoading", payload: false });
    dispatch({ type: "movie/getPopularMovies", payload: data });
    dispatch({ type: "movie/page", payload: data.page });
  };
}
export function fetchSeries(query, timeWindow) {
  return async function (dispatch, getState) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGUxYzkwZTM2ODA0OTBiNWYxOWIwZDZmMWRiNjljZSIsInN1YiI6IjY0ZGNhYjI3MDAxYmJkMDQxYWYzYzMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UsYP_fdC5O1-eBJtoo4_lAf0xYDkX3Bhlk64cHo0bxk",
      },
    };
    dispatch({ type: "movie/seriesLoading", payload: true });
    const res = await fetch(
      `https://api.themoviedb.org/3/${query}/tv/${timeWindow}?language=en-US`,
      options
    );
    const data = await res.json();
    dispatch({ type: "movie/seriesLoading", payload: false });
    dispatch({ type: "movie/getPopularSeries", payload: data });
  };
}

export const { getMovies, page } = movieSlice.actions;

export default movieSlice.reducer;
