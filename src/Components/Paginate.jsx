import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredMoviesNextPage,
  filteredMoviesPreviousPage,
  filteredMoviesSpecificPage,
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
  const {
    popularMovies,
    popularMoviesPage,
    popularSeriesPage,
    popularSeries,
    filtered,
    selectedFilters,
  } = useSelector((state) => state.movie);
  const [currentBtn, setCurrentBtn] = useState(null);
  const [path, setPath] = useState("");
  const buttonCommonStyles = `rounded-3xl bg-indigo-200 border-2 border-none p-1 hover:text-white transition-all font-semibold shadow-md`;

  console.log(pageOf === popularSeries);

  function handleCurrentButton(e) {
    setCurrentBtn(+e.target.value);
  }

  useEffect(() => {
    if (pageOf === popularMovies) {
      setPath(`/movies/page-${popularMoviesPage}`);
    }
    if (pageOf === popularSeries) {
      setPath(`/tv-series/page-${popularSeriesPage}`);
    }
    if (pageOf === filtered) {
      setPath(`/filter/page-${selectedFilters.page}`);
    }
  }, [
    filtered,
    popularMovies,
    popularMoviesPage,
    popularSeriesPage,
    selectedFilters,
    popularSeries,
    pageOf,
  ]);

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

  function determinePreviousButton() {
    if (pageOf === popularMovies) {
      dispatch(popularMoviesPreviousPage());
    }
    if (pageOf === popularSeries) {
      dispatch(popularSeriesPreviousPage());
    }
    if (pageOf === filtered) {
      dispatch(filteredMoviesPreviousPage());
    }
  }
  function determineNextButton() {
    if (pageOf === popularMovies) {
      dispatch(popularMoviesNextPage());
    }
    if (pageOf === popularSeries) {
      dispatch(popularSeriesNextPage());
    }
    if (pageOf === filtered) {
      dispatch(filteredMoviesNextPage());
    }
  }

  function determineSpecificButtons(e) {
    if (pageOf === popularMovies) {
      dispatch(popularMoviesSpecificPage(+e.target.value));
    }
    if (pageOf === popularSeries) {
      dispatch(popularSeriesSpecificPage(+e.target.value));
    }
    if (pageOf === filtered) {
      dispatch(filteredMoviesSpecificPage(+e.target.value));
    }
  }

  return (
    <section
      className="relative top-[24rem] w-[100%] p-1 h-36 
    "
    >
      <div className="flex justify-center items-center gap-3">
        <Link
          to={path}
          className={`${buttonCommonStyles} rounded-3xl border-2 border-none bg-indigo-400 p-1 pr-1 pl-2 ${determinePreviousButtonVisibility()}`}
          onClick={determinePreviousButton}
        >
          &#10229;
        </Link>
        <div
          onClick={(e) => {
            if (!e.target.value) return;
            handleCurrentButton(e);
            determineSpecificButtons(e);
          }}
          className="flex gap-4"
        >
          <Link
            to={path}
            value={determinePageButtonValue(1)}
            className={`p-1 pr-[0.8rem] pl-[0.8rem]  ${buttonCommonStyles}`}
          >
            {determinePageButtonValue(1)}
          </Link>
          <Link
            to={path}
            value={determinePageButtonValue(null, 1)}
            className={`p-1 pr-3 pl-3 ${buttonCommonStyles}`}
          >
            {determinePageButtonValue(null, 1)}
          </Link>
          <Link
            to={path}
            value={determinePageButtonValue(null, 2)}
            className={`p-1 pr-3 pl-3 ${buttonCommonStyles}`}
          >
            {determinePageButtonValue(null, 2)}
          </Link>
          <p>...</p>
          <Link
            to={path}
            value={determinePageButtonValue(null, 10)}
            className={`p-1 pr-2 pl-2 ${buttonCommonStyles}`}
          >
            {determinePageButtonValue(null, 10)}
          </Link>
        </div>
        <Link
          to={path}
          className={`${buttonCommonStyles} bg-indigo-400 p-1 pr-2 pl-1`}
          onClick={determineNextButton}
        >
          &#10230;
        </Link>
      </div>
    </section>
  );
}

export default Paginate;
