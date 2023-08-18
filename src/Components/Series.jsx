import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeries } from "../features/movies/moviesActions";
import Spinner from "./Spinner/Spinner";
import { Link } from "react-router-dom";

function Series() {
  const dispatch = useDispatch();
  const { isSeriesLoading } = useSelector((state) => state.movie);
  const { popularSeries } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchSeries("trending", "week"));
  }, [dispatch]);

  return (
    <section className="bg-rose-600 col-span-2 rounded-2xl relative overflow-hidden">
      {isSeriesLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-between ml-8 mr-6 h-10 relative top-4 items-center">
            <h1 className="text-white text-xl text-center relative  font-thin">
              Series - Trending
            </h1>

            <Link
              to="/series"
              className="bg-blue-700 flex justify-center items-center pl-4 pr-4 rounded-3xl text-white h-8 hover:bg-black transition-all shadow-md"
            >
              See More &#10140;
            </Link>
          </div>
          <div className="grid grid-cols-4 absolute right-0 left-2 mt-8 h-[20rem] overflow-auto pb-10">
            {popularSeries?.map((item, i) => {
              return (
                <div className="flex flex-col gap-4 items-center" key={i}>
                  <img
                    className="p-2 w-36 h-52 rounded-xl"
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
          </div>
        </>
      )}
    </section>
  );
}

export default Series;
