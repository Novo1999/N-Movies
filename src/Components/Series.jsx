import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeries,
  fetchSpecificSeries,
} from "../features/movies/moviesActions";
import Spinner from "./Spinner/Spinner";
import { Link } from "react-router-dom";

function Series() {
  const dispatch = useDispatch();
  const { isSeriesLoading, popularSeries, popularSeriesPage } = useSelector(
    (state) => state.movie
  );
  useEffect(() => {
    dispatch(fetchSeries("trending", "week", popularSeriesPage));
  }, [dispatch, popularSeriesPage]);

  return (
    <section className="bg-rose-600 col-span-2 xl:col-span-2 lg:col-span-3 h-[40rem] xl:h-[30rem] rounded-2xl relative overflow-hidden drop-shadow-xl shadow-xl">
      {isSeriesLoading ? (
        <Spinner bottomposition="bottom-0" />
      ) : (
        <>
          <div className="flex justify-between ml-8 mr-6 h-20 xl:h-10 relative top-4 items-center">
            <h1 className="text-white text-xl text-center relative font-thin  lg:text-lg flex gap-2">
              <span>Series</span>
              <span className="hidden sm:block ">- Trending</span>
            </h1>

            <Link
              to={`/tv-series/page-${popularSeriesPage}`}
              className="bg-blue-700 flex justify-center items-center pl-4 pr-4 rounded-3xl text-white h-12 hover:bg-black transition-all shadow-md"
            >
              See More &#10140;
            </Link>
          </div>
          <div className="grid  md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-3 grid-cols-2 absolute right-0 left-2 mt-8 overflow-auto xl:h-[22rem] h-[30rem] hide-scrollbar pb-10">
            {popularSeries?.map((series, i) => {
              return (
                <div className="flex flex-col gap-4 items-center" key={i}>
                  <Link
                    to={`tv-series/series/${series.id}`}
                    onClick={() => dispatch(fetchSpecificSeries(series.id))}
                  >
                    <img
                      className="p-2 w-44 rounded-xl"
                      key={i}
                      src={series.poster_path}
                      alt="series"
                    />
                  </Link>

                  <p className="text-white font-semibold relative text-md bottom-3 w-50 text-center">
                    {series.name}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default Series;
