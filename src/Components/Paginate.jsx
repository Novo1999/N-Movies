import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  popularMoviesNextPage,
  popularMoviesPreviousPage,
  popularMoviesSpecificPage,
  popularSeriesNextPage,
  popularSeriesPreviousPage,
  popularSeriesSpecificPage,
} from "../features/movies/movieSlice";
import { Link } from "react-router-dom";

function Paginate({ pageOf }) {
  const dispatch = useDispatch();
  const { popularMovies, popularMoviesPage, popularSeriesPage, popularSeries } =
    useSelector((state) => state.movie);
  const [currentBtn, setCurrentBtn] = useState(null);

  const buttonCommonStyles = `rounded-3xl bg-indigo-200 border-2 border-none p-1 hover:text-white transition-all font-semibold shadow-md`;

  function handleCurrentButton(e) {
    setCurrentBtn(+e.target.value);
  }

  function determinePreviousButtonVisibility() {
    if (pageOf === popularSeries) {
      if (popularSeriesPage === 1) {
        return "invisible";
      } else {
        return "visible";
      }
    }
    if (pageOf === popularMovies) {
      if (popularMoviesPage === 1) {
        return "invisible";
      } else {
        return "visible";
      }
    }
  }

  function determinePageButtonValue(btn = null, increment = null) {
    if (btn === 1) {
      if (pageOf === popularMovies) {
        if (popularMoviesPage > 10) {
          return 1;
        } else {
          return popularMoviesPage;
        }
      }
      if (pageOf === popularSeries) {
        if (popularSeriesPage > 10) {
          return 1;
        } else {
          return popularSeriesPage;
        }
      }
    }
    if (btn === null) {
      if (pageOf === popularMovies) {
        return popularMoviesPage + increment;
      }
      return popularSeriesPage + increment;
    }
  }

  function determinePageContent() {}

  return (
    <section
      className="relative top-[24rem] left-[40%] w-[100%] p-1 h-36 
    "
    >
      <div className="flex justify-center items-center gap-3">
        <Link
          to={`/movies/page-${popularMoviesPage}`}
          className={`${buttonCommonStyles} rounded-3xl border-2 border-none bg-indigo-400 p-1 pr-1 pl-2 ${determinePreviousButtonVisibility()}`}
          onClick={
            pageOf === popularMovies
              ? () => dispatch(popularMoviesPreviousPage())
              : () => dispatch(popularSeriesPreviousPage())
          }
        >
          &#10229;
        </Link>
        <div
          onClick={(e) => {
            if (!e.target.value) return;
            handleCurrentButton(e);
            pageOf === popularMovies
              ? dispatch(popularMoviesSpecificPage(+e.target.value))
              : dispatch(popularSeriesSpecificPage(+e.target.value));
          }}
          className="flex gap-4"
        >
          <Link
            to={`/movies/page-${determinePageButtonValue(1)}`}
            value={determinePageButtonValue(1)}
            className={`p-1 pr-[0.8rem] pl-[0.8rem]  ${buttonCommonStyles}`}
          >
            {determinePageButtonValue(1)}
          </Link>
          <Link
            to={`/movies/page-${determinePageButtonValue(null, 1)}`}
            value={determinePageButtonValue(null, 1)}
            className={`p-1 pr-3 pl-3 ${buttonCommonStyles}`}
          >
            {determinePageButtonValue(null, 1)}
          </Link>
          <Link
            to={`/movies/page-${determinePageButtonValue(null, 2)}`}
            value={determinePageButtonValue(null, 2)}
            className={`p-1 pr-3 pl-3 ${buttonCommonStyles}`}
          >
            {determinePageButtonValue(null, 2)}
          </Link>
          <p>...</p>
          <Link
            to={`/movies/page-${determinePageButtonValue(null, 10)}`}
            value={determinePageButtonValue(null, 10)}
            className={`p-1 pr-2 pl-2 ${buttonCommonStyles}`}
          >
            {determinePageButtonValue(null, 10)}
          </Link>
        </div>
        <Link
          to={`/movies/page-${popularMoviesPage}`}
          className={`${buttonCommonStyles} bg-indigo-400 p-1 pr-2 pl-1`}
          onClick={
            pageOf === popularMovies
              ? () => dispatch(popularMoviesNextPage())
              : () => dispatch(popularSeriesNextPage())
          }
        >
          &#10230;
        </Link>
      </div>
    </section>
  );
}

export default Paginate;
