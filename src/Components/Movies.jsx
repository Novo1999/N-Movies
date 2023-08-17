import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../features/movies/movieSlice";
import Spinner from "./Spinner/Spinner";

function Movies() {
  return <MoviesSection />;
}

function MoviesSection() {
  const dispatch = useDispatch();
  const { popularMoviesPage, isMoviesLoading } = useSelector(
    (state) => state.movie
  );
  const { moviesPoster } = useSelector((state) => state.movie.popularMovies);

  useEffect(() => {
    dispatch(fetchMovies("popular", popularMoviesPage));
  }, [dispatch, popularMoviesPage]);

  return (
    <section className="col-span-3 row-span-2 relative bg-indigo-950 rounded-2xl">
      {isMoviesLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-white font-bold text-xl text-center relative top-3 h-12">
            Movies
          </h1>
          <div className="grid grid-cols-5 p-3 left-5 relative overflow-scroll overflow-x-hidden h-[48rem]">
            {moviesPoster?.map((item, i) => {
              return (
                <div className="flex flex-col items-center pr-5 mt-4" key={i}>
                  <img
                    className="w-44 h-64 mb-8 rounded"
                    src={item}
                    alt="poster"
                  />
                  <p className="text-white font-bold relative bottom-10 text-xs w-50">
                    {item.Title}
                  </p>
                </div>
              );
            })}
          </div>
          {/* <Paginate /> */}
        </>
      )}
    </section>
  );
}

export default Movies;
