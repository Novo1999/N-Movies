import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContentsByFilter,
  fetchSpecificMovie,
} from "../../features/movies/moviesActions";

import Spinner from "../../Components/Spinner/Spinner";
import Paginate from "../../Components/Paginate";

import { Search } from "../../Components";
import { Link, useLocation } from "react-router-dom";

function MoviesPage() {
  const { filtered } = useSelector((state) => state.movie);
  return (
    <MoviesSection>
      <Paginate pageOf={filtered} />
    </MoviesSection>
  );
}

function MoviesSection({ children }) {
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector((state) => state.movie);

  const { sort, adult, genre, year } = selectedFilters;

  const location = useLocation();
  const page = Number(location.pathname.split("-")[1]);

  useEffect(() => {
    dispatch(fetchContentsByFilter(sort, adult, genre, year, page));
  }, [dispatch, page, sort, adult, genre, year]);

  return <Button>{children}</Button>;
}

export default MoviesPage;

function Button({ children }) {
  const dispatch = useDispatch();
  const { filtered, isFilterLoading } = useSelector((state) => state.movie);

  return (
    <section className="col-span-3 row-span-2 relative h-screen movie-section overflow-hidden overflow-x-hidden bg-slate-900">
      <img
        className="absolute h-[180vh] blur-sm"
        src="/images/movie-bg.jpg"
        alt="movie bg"
      />
      {isFilterLoading ? (
        <Spinner bottomposition="bottom-[0rem]" />
      ) : (
        <>
          <div className="flex ml-8 mr-6 h-14 top-4 relative items-center">
            <h1 className="text-white text-xl text-center relative font-thin">
              Movies - Filtered
            </h1>
            <div className="m-auto relative bottom-6">
              <Search text="movies" />
            </div>
          </div>
          <div className="grid grid-cols-6 absolute right-0 left-2 mt-10 h-screen p-20 overflow-scroll">
            {filtered?.map((movie, i) => {
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
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
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
