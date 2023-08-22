import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentsByFilter } from "../features/movies/moviesActions";
import { Link } from "react-router-dom";
import { setFilter } from "../features/movies/movieSlice";
import { genres } from "../data/genres";

function Filter() {
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector((state) => state.movie);
  const { sort, adult, genre, year, page } = selectedFilters;
  console.log(page);
  const [filterIsOpened, setFilterIsOpened] = useState(false);

  function handleAdult(e) {
    dispatch((dispatch, getState) => {
      const prevState = getState().movie.selectedFilters;
      dispatch(
        setFilter({
          ...prevState,
          adult: e.target.checked.toString(),
        })
      );
    });
  }

  function handleYear(e) {
    dispatch((dispatch, getState) => {
      const prevState = getState().movie.selectedFilters;
      dispatch(
        setFilter({
          ...prevState,
          year: e.target.value || new Date().getFullYear(),
        })
      );
    });
  }

  function handleSortOption(e) {
    dispatch((dispatch, getState) => {
      const prevState = getState().movie.selectedFilters;
      dispatch(
        setFilter({
          ...prevState,
          sort: e.target.value,
        })
      );
    });
  }

  function handleGenre(e) {
    dispatch((dispatch, getState) => {
      const prevState = getState().movie.selectedFilters;
      const value = e.target.value;
      dispatch(
        setFilter({
          ...prevState,
          genreArr: e.target.checked
            ? [...prevState.genreArr, value]
            : prevState.genreArr.filter((genre) => genre !== value),
        })
      );
    });
  }

  return (
    <div className="relative">
      <button
        className="w-8 text-white"
        onClick={() => setFilterIsOpened((open) => !open)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Filter">
          <path
            d="M4 10h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2H22.91A6 6 0 0 0 11.09 8H4a1 1 0 0 0 0 2zM17 5a4 4 0 1 1-4 4A4 4 0 0 1 17 5zM44 23H36.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2H25.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM31 28a4 4 0 1 1 4-4A4 4 0 0 1 31 28zM44 38H22.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM17 43a4 4 0 1 1 4-4A4 4 0 0 1 17 43z"
            data-name="Layer 15"
            fill="#e9f1f1"
          ></path>
        </svg>
        Filter
      </button>
      {/* Filter options */}
      {filterIsOpened && (
        <div className="absolute  w-96 h-100 text-white filter-bg z-10 right-0 rounded-md p-10">
          <hr className="mb-4" />
          <div className="flex">
            <div className="flex gap-4 items-center">
              <input
                onChange={(e) => handleAdult(e)}
                type="checkbox"
                name="adult"
                id="adult"
              />
              <label htmlFor="Adult">Adult</label>
              <label htmlFor="Year">Year:</label>
              <input
                onChange={(e) => handleYear(e)}
                className="w-16 pl-2 text-black"
                type="number"
                min="1900"
                max="2099"
                step="1"
                maxLength="4"
              />
            </div>
            <div>
              <label className="ml-4 text-sm cursor-pointer" htmlFor="sort">
                Sort by
              </label>
              <select
                onChange={(e) => handleSortOption(e)}
                id="sort"
                className="w-full ml-4 text-black"
              >
                <option className="text-black" value="popularity.desc">
                  Popularity
                </option>
                <option className="text-black" value="revenue.desc">
                  Revenue
                </option>
                <option
                  className="text-black"
                  value="primary_release_date.desc"
                >
                  Release Date
                </option>
                <option className="text-black" value="vote_average.desc">
                  Rating
                </option>
              </select>
            </div>
          </div>
          <p>Genre: </p>
          <div className="grid grid-cols-2">
            {genres?.map((option, i) => {
              return (
                <div className="flex gap-2" key={i}>
                  <input
                    type="checkbox"
                    name={option}
                    id={option}
                    value={option.id}
                    onChange={(e) => handleGenre(e)}
                  />
                  <label className="cursor-pointer" htmlFor={option}>
                    {option.name}
                  </label>
                </div>
              );
            })}
            <Link
              to={`/filter/page-${page}`}
              onClick={() =>
                dispatch(fetchContentsByFilter(sort, genre, adult, year, page))
              }
              className="border-2 w-24 rounded-md hover:bg-white hover:text-black transition-all flex justify-center"
            >
              Search
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
