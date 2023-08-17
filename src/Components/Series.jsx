import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeries } from "../features/movies/movieSlice";
import Spinner from "./Spinner/Spinner";

function Series() {
  const dispatch = useDispatch();
  const { seriesPoster } = useSelector((state) => state.movie.popularSeries);
  const { isSeriesLoading } = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(fetchSeries("trending", "week"));
  }, [dispatch]);

  return (
    <section className="bg-rose-950 col-span-2 rounded-2xl relative">
      {isSeriesLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-white font-bold text-xl text-center relative top-2 h-4">
            Series
          </h1>
          <div className="grid grid-cols-4 grid-rows-1 absolute right-0 left-2 mt-8 overflow-y-scroll h-[20rem]">
            {seriesPoster?.map((item, i) => {
              return (
                <div className="flex flex-col gap-4 items-center" key={i}>
                  <img
                    className="p-2 w-36 h-52 rounded-xl"
                    key={i}
                    src={item}
                    alt="series"
                  />
                  <p className="text-white font-bold relative text-xs w-50">
                    {item.Title}
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
