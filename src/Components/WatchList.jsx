import { useDispatch, useSelector } from "react-redux";
import { addToWatchList } from "../features/movies/movieSlice";
import { Link } from "react-router-dom";
import { fetchSpecificMovie } from "../features/movies/moviesActions";

function Watchlist() {
  const { watchlist } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const storedContents = JSON.parse(localStorage.getItem("contents"));
  console.log(storedContents);
  return (
    <section className="rounded-2xl col-span-1 row-span-1 bg-indigo-600 relative drop-shadow-xl h-full shadow-xl grid overflow-hidden">
      <h1 className="text-white text-s text-center relative font-thin top-4">
        Watchlist
      </h1>
      <div className="grid grid-cols-2 left-3 top-2 relative overflow-scroll mt-4 p-4 ">
        {storedContents?.map((movie, i) => {
          return (
            <div className="flex flex-col items-center pr-5" key={i}>
              <Link
                to={`movies/movie/${movie.id}`}
                onClick={() => dispatch(fetchSpecificMovie(movie.id))}
              >
                <img
                  className="w-24 h-34 mb-6 rounded"
                  src={movie.poster}
                  alt="poster"
                />
              </Link>
              <p className="text-white font-semibold relative bottom-5 text-xs w-28 text-center ">
                {movie.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Watchlist;

/* 
- Watchlist state will be localstorage
- Click add 
- Movie id added to array
- if added and clicked again, remove from array
- Render and update using the array accordingly
*/
