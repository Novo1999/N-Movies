import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeries,
  fetchSpecificSeries,
} from "../../features/movies/moviesActions";
import Spinner from "../../Components/Spinner/Spinner";
import { Paginate, Search } from "../../Components";
import { Link } from "react-router-dom";

function SeriesPage() {
  const dispatch = useDispatch();
  const { isSeriesLoading, popularSeries, popularSeriesPage } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(fetchSeries("trending", "week", popularSeriesPage));
  }, [dispatch, popularSeriesPage]);

  return (
    <section className="col-span-4 row-span-2 relative movie-section  bg-yellow-700 h-[98.5rem]">
      <img
        className="absolute h-[140vh]"
        src="/images/series-bg.png"
        alt="series bg"
      />
      {isSeriesLoading ? (
        <Spinner bottomposition="bottom-[40rem]" />
      ) : (
        <>
          <div className="flex justify-between ml-8 mr-6 h-10 relative top-4 items-center">
            <h1 className="text-white text-xl text-center relative font-thin">
              Series - Trending
            </h1>
            <div className="m-auto relative bottom-6">
              <Search text="series" />
            </div>
          </div>
          <div className="grid grid-cols-6 absolute right-0 left-2 mt-10 h-screen overflow-scroll p-20">
            {popularSeries?.map((series, i) => {
              return (
                <div className="flex flex-col gap-4 items-center" key={i}>
                  <Link
                    to={`/tv-series/series/${series.id}`}
                    onClick={() => dispatch(fetchSpecificSeries(series.id))}
                  >
                    <img
                      className=" w-56 h-80 mb-8 rounded"
                      src={series.poster_path}
                      alt="poster"
                    />
                  </Link>
                  <p className="text-white font-semibold relative text-s bottom-5 w-50 text-center">
                    {series.name}
                  </p>
                </div>
              );
            })}
            <Paginate pageOf={popularSeries} />
          </div>
        </>
      )}
    </section>
  );
}

export default SeriesPage;
