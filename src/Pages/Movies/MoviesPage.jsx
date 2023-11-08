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
import { Link, useLocation } from "react-router-dom";

function MoviesPage() {
  const { popularMovies } = useSelector((state) => state.movie);
  return <MoviesSection>
    <Paginate pageOf={popularMovies} />
  </MoviesSection>;
}

function MoviesSection({ children }) {

  const dispatch = useDispatch();

  const location = useLocation();
  const page = Number(location.pathname.split("-")[1]);

  useEffect(() => {
    dispatch(fetchMovies("popular", page));
  }, [dispatch, page]);

  return (
    <div className="bg-transparent">
      <AllMovies />
      {children}
    </div>
  );
}

function AllMovies() {
  const dispatch = useDispatch();
  const { popularMovies, isMoviesLoading } = useSelector(
    (state) => state.movie
  );

  return (
    <>
      <section className="col-span-3 row-span-2 h-screen relative movie-section bg-slate-900">
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
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 absolute right-0 left-2 mt-10 pb-20 h-full justify-center overflow-auto">
              {popularMovies?.map((movie, i) => {
                return (
                  <div
                    className="flex flex-col items-center justify-center p-1"
                    key={i}
                  >
                    <Link
                      to={`/movies/movie/${movie.id}`}
                      onClick={() => {
                        dispatch(fetchSpecificMovie(movie.id));
                      }}
                    >
                      <img
                        className="w-56 mb-8 rounded"
                        src={movie.poster_path}
                        alt="poster"
                      />
                    </Link>
                    <p className="text-white lg:text-lg text-xs font-semibold relative bottom-5 text-s text-center">
                      {movie.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}
export default MoviesPage;
