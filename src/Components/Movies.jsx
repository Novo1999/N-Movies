import { useEffect } from "react";
import Paginate from "./Paginate";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../features/movies/movieSlice";

function Movies() {
  const dispatch = useDispatch();

  const { popularMovies, page } = useSelector((state) => state.movie);
  const { poster } = useSelector((state) => state.movie.popularMovies);
  console.log(page);
  console.log(popularMovies);
  useEffect(() => {
    dispatch(fetchMovies("popular", page));
  }, [dispatch, page]);

  return (
    <section className="col-span-3 row-span-2 relative bg-indigo-950 rounded-2xl">
      <h1 className="text-white font-bold text-xl text-center relative top-1">
        Movies
      </h1>
      <div className="grid grid-cols-5 p-3 left-5 relative overflow-scroll overflow-x-hidden h-[50rem]">
        {poster?.map((item, i) => {
          return (
            <div className="flex flex-col items-center pr-5" key={i}>
              <img
                className="w-44 h-64 mb-14 rounded"
                src={item}
                alt="poster"
              />
              <p className="text-white font-bold relative bottom-10 text-xs w-50">
                {item.Title}
              </p>
            </div>
          );
        })}
      </div>
      {/* <Paginate /> */}
    </section>
  );
}

export default Movies;
