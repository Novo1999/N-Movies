import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../../features/movies/moviesActions";

import Spinner from "../../Components/Spinner/Spinner";
import Paginate from "../../Components/Paginate";
import "./MoviesPage.css";
import { Search } from "../../Components";

function MoviesPage() {
  return (
    <MoviesSection>
      <Paginate />
    </MoviesSection>
  );
}

function MoviesSection({ children }) {
  const dispatch = useDispatch();
  const { popularMoviesPage, isMoviesLoading } = useSelector(
    (state) => state.movie
  );
  const { popularMovies } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovies("popular", popularMoviesPage));
  }, [dispatch, popularMoviesPage]);

  return (
    <section className="col-span-3 row-span-2 relative h-screen movie-section overflow-scroll overflow-x-hidden">
      <img
        className="absolute h-[180vh] blur-sm"
        src="/images/movie-bg.jpg"
        alt="movie bg"
      />
      {isMoviesLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex ml-8 mr-6 h-14 top-4 relative items-center">
            <h1 className="text-white text-xl text-center relative font-thin">
              Movies - Popular
            </h1>
            <div className="m-auto relative bottom-6">
              <Search />
            </div>
          </div>
          <div className="grid grid-cols-6 relative overflow-x-hidden overflow-scroll mt-4 p-4">
            {popularMovies?.map((movie, i) => {
              return (
                <div
                  className="flex flex-col items-center justify-center"
                  key={i}
                >
                  <img
                    className="w-56 h-80 mb-8 rounded"
                    src={movie.poster_path}
                    alt="poster"
                  />
                  <p className="text-white font-semibold relative bottom-5 text-s w-50 text-center ">
                    {movie.title}
                  </p>
                </div>
              );
            })}
            {children}
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesPage;
