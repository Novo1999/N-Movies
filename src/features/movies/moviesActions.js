import {
  getPopularMovies,
  getPopularSeries,
  moviesLoading,
  popularMoviesPage,
  seriesLoading,
} from "./movieSlice";

export function fetchMovies(query, page) {
  return async function (dispatch) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGUxYzkwZTM2ODA0OTBiNWYxOWIwZDZmMWRiNjljZSIsInN1YiI6IjY0ZGNhYjI3MDAxYmJkMDQxYWYzYzMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UsYP_fdC5O1-eBJtoo4_lAf0xYDkX3Bhlk64cHo0bxk",
      },
    };
    dispatch(moviesLoading(true));
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${query}?language=en-US&page=${page}`,
      options
    );
    const data = await res.json();
    dispatch(moviesLoading(false));
    dispatch(getPopularMovies(data));
    dispatch(popularMoviesPage(data.page));
  };
}

export function fetchSeries(query, timeWindow, page) {
  return async function (dispatch) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGUxYzkwZTM2ODA0OTBiNWYxOWIwZDZmMWRiNjljZSIsInN1YiI6IjY0ZGNhYjI3MDAxYmJkMDQxYWYzYzMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UsYP_fdC5O1-eBJtoo4_lAf0xYDkX3Bhlk64cHo0bxk",
      },
    };
    dispatch(seriesLoading(true));
    const res = await fetch(
      `https://api.themoviedb.org/3/${query}/tv/${timeWindow}?language=en-US&page=${page}`,
      options
    );
    const data = await res.json();
    dispatch(seriesLoading(false));
    dispatch(getPopularSeries(data));
  };
}
