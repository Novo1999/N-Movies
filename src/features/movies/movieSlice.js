import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: [{ poster: [] }],
    popularSeries: [],
    page: "",
  },
  reducers: {
    getMovies: (state, action) => {
      state.popularMovies = action.payload.results;
      state.popularMovies.poster = action.payload.results.map(
        (movie) => `https://image.tmdb.org/t/p/original${movie.poster_path}`
      );
    },
    page: (state, action) => {
      state.page = action.payload;
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
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${query}?language=en-US&page=${page}`,
      options
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: "movie/getMovies", payload: data });
    dispatch({ type: "movie/page", payload: data.page });
  };
}

export const { getMovies, page } = movieSlice.actions;

export default movieSlice.reducer;
