import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeries } from "../../features/movies/moviesActions";
import Spinner from "../../Components/Spinner/Spinner";
import { Paginate, Search } from "../../Components";

function SeriesPage() {
  const dispatch = useDispatch();
  const { isSeriesLoading } = useSelector((state) => state.movie);
  const { popularSeries } = useSelector((state) => state.movie);
  // console.log(popularSeries);
  useEffect(() => {
    dispatch(fetchSeries("trending", "week"));
  }, [dispatch]);

  return (
    <section className="col-span-3 row-span-2 relative h-screen movie-section overflow-scroll overflow-x-hidden">
      <img
        className="absolute h-[180vh]"
        src="/images/series-bg.png"
        alt="series bg"
      />
      {isSeriesLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-between ml-8 mr-6 h-10 relative top-4 items-center">
            <h1 className="text-white text-xl text-center relative font-thin">
              Series - Trending
            </h1>
            <div className="m-auto relative bottom-6">
              <Search />
            </div>
          </div>
          <div className="grid grid-cols-6 absolute right-0 left-2 mt-10 pb-10">
            {popularSeries?.map((item, i) => {
              return (
                <div className="flex flex-col gap-4 items-center" key={i}>
                  <img
                    className="w-56 h-80 mb-8 rounded"
                    key={i}
                    src={item.poster_path}
                    alt="series"
                  />
                  <p className="text-white font-semibold relative text-xs bottom-5 w-50 text-center">
                    {item.name}
                  </p>
                </div>
              );
            })}
            <Paginate />
          </div>
        </>
      )}
    </section>
  );
}

export default SeriesPage;
