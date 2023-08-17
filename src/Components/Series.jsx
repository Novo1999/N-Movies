import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const dummyArr = Array.from({ length: 4 }, (_, i) => {
  return i;
});

function Series() {
  const dispatch = useDispatch();
  const { series } = useSelector((state) => state.movie);

  // useEffect(() => {
  //   dispatch(fetchSeries("breaking bad", 1));
  // }, [dispatch]);

  // const seriesArray = series.slice(0, 4);
  return (
    <section className="bg-rose-950 col-span-2 rounded-2xl relative">
      <h1 className="text-white font-bold text-xl text-center relative top-2">
        Series
      </h1>
      <div className="grid grid-cols-4 grid-rows-1 absolute right-0 left-2 mt-8">
        {dummyArr.map((item, i) => {
          return (
            <div className="flex flex-col items-center" key={i}>
              <img
                className="p-2 w-48 h-64 rounded-xl"
                key={i}
                src={item.Poster}
                alt="series"
              />
              <p className="text-white font-bold relative text-xs w-50">
                {item.Title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Series;
