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
    currentContent: [],
  },
  reducers: {
    // Movies
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload.results;
      action.payload.results.map((movie) => {
        movie.poster_path = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        movie.backdrop_path = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
      });
    },
    popularMoviesPage: (state, action) => {
      state.page = action.payload;
    },
    moviesLoading: (state, action) => {
      state.isMoviesLoading = action.payload;
    },
    popularMoviesNextPage: (state, _) => {
      state.popularMoviesPage += 1;
    },
    popularMoviesPreviousPage: (state, _) => {
      state.popularMoviesPage > 1
        ? (state.popularMoviesPage -= 1)
        : state.popularMoviesPage;
    },
    popularMoviesSpecificPage: (state, action) => {
      state.popularMoviesPage = action.payload;
    },

    // Series
    getPopularSeries: (state, action) => {
      state.popularSeries = action.payload.results;
      action.payload.results.map((series) => {
        series.poster_path = `https://image.tmdb.org/t/p/original${series.poster_path}`;
        series.backdrop_path = `https://image.tmdb.org/t/p/original${series.backdrop_path}`;
      });
    },
    popularSeriesPage: (state, action) => {
      state.page = action.payload;
    },
    seriesLoading: (state, action) => {
      state.isSeriesLoading = action.payload;
    },
    popularSeriesNextPage: (state, _) => {
      state.popularSeriesPage += 1;
    },
    popularSeriesPreviousPage: (state, _) => {
      state.popularSeriesPage > 1
        ? (state.popularSeriesPage -= 1)
        : state.popularSeriesPage;
    },
    popularSeriesSpecificPage: (state, action) => {
      state.popularSeriesPage = action.payload;
    },

    // ID
    setCurrentContent: (state, action) => {
      action.payload.poster_path = `https://image.tmdb.org/t/p/original${action.payload.poster_path}`;
      action.payload.backdrop_path = `https://image.tmdb.org/t/p/original${action.payload.backdrop_path}`;
      state.currentContent = action.payload;
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
  popularMoviesNextPage,
  popularMoviesPreviousPage,
  popularMoviesSpecificPage,
  popularSeriesNextPage,
  popularSeriesPreviousPage,
  popularSeriesSpecificPage,
  setCurrentID,
  setCurrentContent,
} = actions;

export default reducer;
