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

  useEffect(() => {
    dispatch(fetchMovies("popular", popularMoviesPage));
  }, [dispatch, popularMoviesPage]);

  return (
    <section className="col-span-2 xl:col-span-3 lg:col-span-3 row-span-2 h-[50rem] relative bg-sky-500 rounded-2xl overflow-hidden drop-shadow-xl shadow-xl">
      {isMoviesLoading ? (
        <Spinner bottomposition="bottom-0" />
      ) : (
        <>
          <div className="overflow-hidden flex justify-between ml-8 mr-6 h-20 top-2 relative items-center">
            <h1 className="text-white text-center relative font-thin md:text-md lg:text-xl">
              Movies - Popular Now
            </h1>
            <Link
              to={`movies/page-${popularMoviesPage}`}
              className="bg-blue-700 flex justify-center items-center pl-4 pr-4 rounded-3xl text-white h-12 lg:h-12 md:h-10 hover:bg-black transition-all shadow-md"
            >
              See More &#10140;
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 left-3 lg:top-4 md:top-0 relative overflow-auto  p-4 pb-28 h-[48rem]">
            {popularMovies?.map((movie, i) => {
              return (
                <div className="flex flex-col items-center pr-5 mt-4" key={i}>
                  <Link
                    to={`movies/movie/${movie.id}`}
                    onClick={() => dispatch(fetchSpecificMovie(movie.id))}
                  >
                    <img
                      className="w-44 mb-8 rounded"
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
