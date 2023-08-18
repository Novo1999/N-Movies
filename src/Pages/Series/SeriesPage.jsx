import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeries } from "../../features/movies/moviesActions";
import Spinner from "../../Components/Spinner/Spinner";
import { Paginate, Search } from "../../Components";

function SeriesPage() {
  const dispatch = useDispatch();
  const { isSeriesLoading, popularSeries, popularSeriesPage } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(fetchSeries("trending", "week", popularSeriesPage));
  }, [dispatch, popularSeriesPage]);

  return (
    <section className="col-span-4 row-span-2 relative movie-section overflow-hidden overflow-x-hidden bg-yellow-700 h-[98.5rem]">
      <img
        className="absolute h-[140vh]"
        src="/images/series-bg.png"
        alt="series bg"
      />
      {isSeriesLoading ? (
        <Spinner bottomPosition="bottom-[40rem]" />
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
            {popularSeries?.map((item, i) => {
              return (
                <div className="flex flex-col gap-4 items-center" key={i}>
                  <img
                    className="w-56 h-80 mb-8 rounded"
                    key={i}
                    src={item.poster_path}
                    alt="series"
                  />
                  <p className="text-white font-semibold relative text-s bottom-5 w-50 text-center">
                    {item.name}
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
