import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  fetchSpecificMovie,
} from "../features/movies/moviesActions";

import Spinner from "./Spinner/Spinner";
import { Link } from "react-router-dom";

function Movies() {
  return <MoviesSection></MoviesSection>;
}

const MoviesSection = memo(function MoviesSection() {
  const dispatch = useDispatch();
  const { popularMoviesPage, isMoviesLoading } = useSelector(
    (state) => state.movie
  );
  const { popularMovies } = useSelector((state) => state.movie);

  // function handlePageURL() {
  //   setSearch({ page: popularMoviesPage });
  // }

  useEffect(() => {
    dispatch(fetchMovies("popular", popularMoviesPage));
  }, [dispatch, popularMoviesPage]);

  return (
    <section className="col-span-3 row-span-2 relative bg-sky-500 rounded-2xl overflow-hidden drop-shadow-xl shadow-xl">
      {isMoviesLoading ? (
        <Spinner bottomposition="bottom-0" />
      ) : (
        <>
          <div className="overflow-hidden flex justify-between ml-8 mr-6 h-14 top-4 relative items-center">
            <h1 className="text-white text-xl text-center relative font-thin">
              Movies - Popular Now
            </h1>
            <Link
              to={`/movies`}
              className="bg-blue-700 flex justify-center items-center pl-4 pr-4 rounded-3xl text-white h-12 hover:bg-black transition-all shadow-md"
            >
              See More &#10140;
            </Link>
          </div>
          <div className="grid grid-cols-5 left-3 top-2 relative overflow-auto mt-4 p-4 pb-28 h-[48rem]">
            {popularMovies?.map((movie, i) => {
              return (
                <div className="flex flex-col items-center pr-5 mt-4" key={i}>
                  <Link
                    to={`movies/movie/${movie.id}`}
                    onClick={() => dispatch(fetchSpecificMovie(movie.id))}
                  >
                    <img
                      className=" w-44 h-64 mb-8 rounded"
                      src={movie.poster_path}
                      alt="poster"
                    />
                  </Link>
                  <p className="text-white font-semibold relative bottom-5 text-s w-50 text-center ">
                    {movie.title}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
});

export default Movies;
