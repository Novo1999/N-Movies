import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchContentBySearch } from "../features/movies/moviesActions";
import { Link } from "react-router-dom";
import Filter from "./Filter";

function Search({ text }) {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { searchSuggestions } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchContentBySearch(keyword));
  }, [keyword, dispatch]);

  return (
    <section className="relative flex items-center gap-4">
      <Filter />
      <form
        autoComplete="off"
        className="text-white flex justify-center items-center py-8"
      >
        <label
          className="lg:mr-4 mb-2 w-48 hidden lg:block"
          htmlFor="Search For Movies"
        >
          Search For {text}
        </label>
        {searchSuggestions.length > 0 && (
          <div className="w-96 border-2 absolute right-2 lg:right-28 top-[4.2rem] overflow-auto overflow-x-hidden max-h-96 h-auto z-10 bg-white text-black flex flex-col">
            {searchSuggestions?.map((content) => {
              {
                return content.original_title || content.poster_path ? (
                  <>
                    <Link
                      to={
                        content.media_type === "movie"
                          ? `/movies/movie/${content.id}`
                          : `/tv-series/series/${content.id}`
                      }
                      className="flex flex-row justify-between items-center p-4 gap-3"
                      key={content.id}
                    >
                      <img
                        className="h-24"
                        src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
                        alt=""
                      />
                      <div className="flex flex-col gap-3">
                        <p className="text-md w-64 font-semibold">
                          {content.original_title || content.original_name}
                        </p>
                        <div className="w-64 flex">
                          <p className="text-sm w-96 font-thin capitalize relative">
                            <span className="">Type: </span>
                            {content.media_type}
                          </p>
                          <p className="text-xs">⭐{content.vote_average}</p>
                        </div>
                      </div>
                    </Link>
                  </>
                ) : (
                  ""
                );
              }
            })}
          </div>
        )}
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-36 sm:w-80 lg:w-96 mb-2 h-8 rounded text-black pl-2 font-semibold"
          type="text"
          id="search"
          name="search"
        />
      </form>
    </section>
  );
}

export default Search;
