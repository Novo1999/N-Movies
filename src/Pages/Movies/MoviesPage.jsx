import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  fetchSpecificMovie,
} from "../../features/movies/moviesActions";

import Spinner from "../../Components/Spinner/Spinner";
import Paginate from "../../Components/Paginate";
import "./MoviesPage.css";
import { Search } from "../../Components";
import { Link, useLocation, useSearchParams } from "react-router-dom";

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
  const { popularMoviesPage } = useSelector((state) => state.movie);

  const location = useLocation();
  // useEffect(() => {
  //   console.log(+location.search.split("=").filter((item) => +item));
  // }, [location.search]);

  useEffect(() => {
    dispatch(fetchMovies("popular", popularMoviesPage));
  }, [dispatch, popularMoviesPage]);

  return <Button>{children}</Button>;
}

export default MoviesPage;

function Button({ children }) {
  const dispatch = useDispatch();
  const { popularMovies, isMoviesLoading } = useSelector(
    (state) => state.movie
  );

  return (
    <section className="col-span-3 row-span-2 relative h-[112.5rem] movie-section overflow-hidden overflow-x-hidden bg-slate-900">
      <img
        className="absolute h-[180vh] blur-sm"
        src="/images/movie-bg.jpg"
        alt="movie bg"
      />
      {isMoviesLoading ? (
        <Spinner bottomposition="bottom-[50rem]" />
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
          <div className="grid grid-cols-6 absolute right-0 left-2 mt-10 h-screen p-20 overflow-scroll">
            {popularMovies?.map((movie, i) => {
              return (
                <div
                  className="flex flex-col items-center justify-center"
                  key={i}
                >
                  <Link
                    to={`/movies/movie/${movie.id}`}
                    onClick={() => {
                      dispatch(fetchSpecificMovie(movie.id));
                    }}
                  >
                    <img
                      className=" w-56 h-80 mb-8 rounded"
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
            {children}
          </div>
        </>
      )}
    </section>
  );
}
