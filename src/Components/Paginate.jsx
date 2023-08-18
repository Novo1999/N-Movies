import { useDispatch, useSelector } from "react-redux";
import {
  popularMoviesNextpage,
  popularMoviesPreviouspage,
  popularMoviesSpecificPage,
} from "../features/movies/movieSlice";

function Paginate() {
  const dispatch = useDispatch();
  const { popularMoviesPage } = useSelector((state) => state.movie);
  return (
    <section
      className="w-96
    "
    >
      <div className="flex justify-center items-center gap-3">
        <button
          className={`rounded-3xl border-2 border-none bg-indigo-400 p-1 pr-1 pl-2 hover:text-white transition-all font-semibold ${
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
            value={popularMoviesPage}
            className="rounded-3xl border-2 border-none bg-indigo-500 p-1 pr-[0.8rem] pl-[0.8rem] hover:text-white transition-all font-semibold"
          >
            {popularMoviesPage}
          </button>
          <button
            value={popularMoviesPage + 1}
            className="rounded-3xl border-2 border-none bg-indigo-500 p-1 pr-3 pl-3 hover:text-white transition-all font-semibold"
          >
            {popularMoviesPage + 1}
          </button>
          <button
            value={popularMoviesPage + 2}
            className="rounded-3xl border-2 border-none bg-indigo-500 p-1 pr-3 pl-3 hover:text-white transition-all font-semibold"
          >
            {popularMoviesPage + 2}
          </button>
          <p>...</p>
          <button
            value={popularMoviesPage + 3}
            className="rounded-3xl border-2 border-none bg-indigo-500 p-1 pr-2 pl-2 hover:text-white transition-all font-semibold"
          >
            {popularMoviesPage + 10}
          </button>
        </div>
        <button
          className="rounded-3xl border-2 border-none bg-indigo-400 p-1 pr-2 pl-1 hover:text-white transition-all font-semibold"
          onClick={() => dispatch(popularMoviesNextpage())}
        >
          &#10230;
        </button>
      </div>
    </section>
  );
}

export default Paginate;
