import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../../features/movies/moviesActions";

import Spinner from "../../Components/Spinner/Spinner";
import Paginate from "../../Components/Paginate";
import "./MoviesPage.css";
import { Search } from "../../Components";

function MoviesPage() {
  const { popularMovies } = useSelector((state) => state.movie);
  return (
    <MoviesSection>
      <Paginate pageOf={popularMovies} />
    </MoviesSection>
  );
}

function MoviesSection({ children }) {
  const dispatch = useDispatch();
  const { popularMoviesPage, popularMovies, isMoviesLoading } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(fetchMovies("popular", popularMoviesPage));
  }, [dispatch, popularMoviesPage]);

  return (
    <section className="col-span-3 row-span-2 relative h-[98.5rem] movie-section overflow-hidden overflow-x-hidden bg-slate-900">
      <img
        className="absolute h-[180vh] blur-sm"
        src="/images/movie-bg.jpg"
        alt="movie bg"
      />
      {isMoviesLoading ? (
        <Spinner bottomPosition="bottom-[40rem]" />
      ) : (
        <>
          <div className="flex ml-8 mr-6 h-14 top-4 relative items-center">
            <h1 className="text-white text-xl text-center relative font-thin">
              Movies - Popular Now
            </h1>
            <div className="m-auto relative bottom-6">
              <Search text="movies" />
            </div>
          </div>
          <div className="grid grid-cols-6 absolute right-0 left-2 mt-10 h-screen overflow-scroll p-20">
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
