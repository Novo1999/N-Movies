import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilters } from "../features/movies/movieSlice";
import { fetchContentsByFilter } from "../features/movies/moviesActions";
import { Link } from "react-router-dom";

const filterOptions = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

function Filter() {
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector((state) => state.movie);
  console.log(selectedFilters);
  const [filterIsOpened, setFilterIsOpened] = useState(false);
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
              <input type="checkbox" name="adult" id="adult" />
              <label htmlFor="Adult">Adult</label>
              <label htmlFor="Year">Year:</label>
              <input
                className="w-16 pl-2"
                type="number"
                min="1900"
                max="2099"
                step="1"
              />
            </div>
            <div>
              <label className="ml-4 text-sm cursor-pointer" htmlFor="sort">
                Sort by
              </label>
              <select
                onChange={(e) =>
                  dispatch(setSelectedFilters({ sort: e.target.value }))
                }
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
            {filterOptions?.map((option, i) => {
              return (
                <div className="flex gap-2" key={i}>
                  <input
                    type="checkbox"
                    name={option}
                    id={option}
                    value={option}
                  />
                  <label className="cursor-pointer" htmlFor={option}>
                    {option}
                  </label>
                </div>
              );
            })}
            <Link
              to="filter"
              onClick={() =>
                dispatch(
                  fetchContentsByFilter(false, 1, selectedFilters.sort, null)
                )
              }
              className="border-2 w-24 rounded-md hover:bg-white hover:text-black transition-all"
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
