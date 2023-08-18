import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: [],
    popularSeries: [],
    popularMoviesPage: 1,
    popularSeriesPage: 1,
    isMoviesLoading: false,
    isSeriesLoading: false,
  },
  reducers: {
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload.results;
      action.payload.results.map(
        (movie) =>
          (movie.poster_path = `https://image.tmdb.org/t/p/original${movie.poster_path}`)
      );
    },
    getPopularSeries: (state, action) => {
      state.popularSeries = action.payload.results;
      action.payload.results.map(
        (series) =>
          (series.poster_path = `https://image.tmdb.org/t/p/original${series.poster_path}`)
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
    popularMoviesNextpage: (state, _) => {
      state.popularMoviesPage += 1;
    },
    popularMoviesPreviouspage: (state, _) => {
      state.popularMoviesPage > 1
        ? (state.popularMoviesPage -= 1)
        : state.popularMoviesPage;
    },
    popularMoviesSpecificPage: (state, action) => {
      state.popularMoviesPage = action.payload;
    },
    popularSeriesNextpage: (state, _) => {
      state.popularSeriesPage += 1;
    },
    popularSeriesPreviouspage: (state, _) => {
      state.popularSeriesPage > 1
        ? (state.popularSeriesPage -= 1)
        : state.popularSeriesPage;
    },
    popularSeriesSpecificPage: (state, action) => {
      state.popularSeriesPage = action.payload;
    },
  },
});

const { actions, reducer } = movieSlice;

export const {
  getPopularMovies,
  getPopularSeries,
  popularMoviesPage,
  popularSeriesPage,
  moviesLoading,
  seriesLoading,
  popularMoviesNextpage,
  popularMoviesPreviouspage,
  popularMoviesSpecificPage,
  popularSeriesNextpage,
  popularSeriesPreviouspage,
  popularSeriesSpecificPage,
} = actions;

export default reducer;
