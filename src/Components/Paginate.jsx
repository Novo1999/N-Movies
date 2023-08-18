import { useDispatch, useSelector } from "react-redux";
import {
  popularMoviesNextpage,
  popularMoviesPreviouspage,
  popularMoviesSpecificPage,
} from "../features/movies/movieSlice";

function Paginate() {
  const dispatch = useDispatch();
  const { popularMoviesPage } = useSelector((state) => state.movie);

  const buttonCommonStyles =
    "rounded-3xl border-2 border-none bg-indigo-500 p-1 hover:text-white transition-all font-semibold shadow-md";

  return (
    <section
      className="w-96
    "
    >
      <div className="flex justify-center items-center gap-3">
        <button
          className={`${buttonCommonStyles} rounded-3xl border-2 border-none bg-indigo-400 p-1 pr-1 pl-2 ${
            popularMoviesPage == 1 ? "invisible" : "visible"
          }`}
          onClick={() => dispatch(popularMoviesPreviouspage())}
        >
          &#10229;
        </button>
        <div
          onClick={(e) => dispatch(popularMoviesSpecificPage(+e.target.value))}
          className="flex gap-4"
        >
          <button
            value={popularMoviesPage > 10 ? 1 : popularMoviesPage}
            className={`p-1 pr-[0.8rem] pl-[0.8rem] ${buttonCommonStyles}`}
          >
            {popularMoviesPage > 10 ? 1 : popularMoviesPage}
          </button>
          <button
            value={popularMoviesPage + 1}
            className={`p-1 pr-3 pl-3 ${buttonCommonStyles}`}
          >
            {popularMoviesPage + 1}
          </button>
          <button
            value={popularMoviesPage + 2}
            className={`p-1 pr-3 pl-3 ${buttonCommonStyles}`}
          >
            {popularMoviesPage + 2}
          </button>
          <p>...</p>
          <button
            value={popularMoviesPage + 3}
            className={`p-1 pr-2 pl-2 ${buttonCommonStyles}`}
          >
            {popularMoviesPage + 10}
          </button>
        </div>
        <button
          className={`${buttonCommonStyles} bg-indigo-400 p-1 pr-2 pl-1`}
          onClick={() => dispatch(popularMoviesNextpage())}
        >
          &#10230;
        </button>
      </div>
    </section>
  );
}

export default Paginate;
