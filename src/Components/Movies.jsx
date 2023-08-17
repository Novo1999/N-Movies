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
    <section className="col-span-3 row-span-2 relative overflow-hidden bg-sky-600 rounded-2xl">
      {isMoviesLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-between ml-8 mr-6 relative top-2 items-center">
            <h1 className="text-white font-bold text-xl text-center relative top-3 h-12 font-thin">
              Movies - Popular
            </h1>
            <button className="bg-blue-700 h-8 pl-4 pr-4 rounded-3xl text-white hover:bg-black transition-all">
              See More
            </button>
          </div>
          <div className="grid grid-cols-5 left-3 top-2 relative overflow-x-hidden overflow-auto p-4 h-[48rem]">
            {moviesPoster?.map((item, i) => {
              return (
                <div className="flex flex-col items-center pr-5 mt-4" key={i}>
                  <img
                    className=" w-44 h-64 mb-8 rounded"
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
