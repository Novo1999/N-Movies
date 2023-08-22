import {
  filterLoading,
  getPopularMovies,
  getPopularSeries,
  moviesLoading,
  popularMoviesPage,
  seriesLoading,
  setCurrentContent,
  setFilteredContents,
  setSearchSuggestions,
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
    dispatch(getPopularMovies(data));
    dispatch(moviesLoading(false));
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
    dispatch(popularMoviesPage(data.page));
  };
}

export function fetchSpecificMovie(id) {
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
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    const data = await res.json();
    dispatch(moviesLoading(false));
    dispatch(setCurrentContent(data));
  };
}

export function fetchSpecificSeries(id) {
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
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      options
    );
    const data = await res.json();
    dispatch(seriesLoading(false));
    dispatch(setCurrentContent(data));
  };
}

export function fetchContentBySearch(keyword) {
  return async function (dispatch) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGUxYzkwZTM2ODA0OTBiNWYxOWIwZDZmMWRiNjljZSIsInN1YiI6IjY0ZGNhYjI3MDAxYmJkMDQxYWYzYzMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UsYP_fdC5O1-eBJtoo4_lAf0xYDkX3Bhlk64cHo0bxk",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1`,
      options
    );
    const data = await res.json();
    // console.log(data);
    dispatch(setSearchSuggestions(data));
  };
}

export function fetchContentsByFilter(
  sortBy = "popularity.desc",
  genre = null,
  adult = false,
  year = new Date().getFullYear
) {
  return async function (dispatch) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGUxYzkwZTM2ODA0OTBiNWYxOWIwZDZmMWRiNjljZSIsInN1YiI6IjY0ZGNhYjI3MDAxYmJkMDQxYWYzYzMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UsYP_fdC5O1-eBJtoo4_lAf0xYDkX3Bhlk64cHo0bxk",
      },
    };
    dispatch(filterLoading(true));
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=${adult}&include_video=false&language=en-US&sort_by=${sortBy}&with_genres=${genre}&year=${year}`,
      options
    );
    const data = await res.json();
    dispatch(filterLoading(false));
    console.log(data);

    dispatch(setFilteredContents(data));
    // console.log(data);
  };
}
