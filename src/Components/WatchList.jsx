import { useDispatch, useSelector } from "react-redux";
import { addToWatchList } from "../features/movies/movieSlice";
import { Link } from "react-router-dom";
import { fetchSpecificMovie } from "../features/movies/moviesActions";

function Watchlist() {
  const dispatch = useDispatch();
  const storedContents = JSON.parse(localStorage.getItem("contents"));
  // console.log(storedContents);
  console.log(storedContents);
  return (
    <section className="rounded-2xl col-span-1 row-span-1 bg-indigo-600 relative drop-shadow-xl h-96 shadow-xl grid overflow-hidden">
      <h1 className="text-white text-s text-center relative font-thin top-4">
        Watchlist
      </h1>
      <div className="grid grid-cols-2 left-3 top-2 relative overflow-scroll mt-2 p-4 ">
        {storedContents?.map((content, i) => {
          return (
            <div className="flex flex-col items-center pr-5" key={i}>
              <Link
                to={
                  content.type === "movie"
                    ? `movies/movie/${content.id}`
                    : `tv-series/series/${content.id}`
                }
                onClick={() => dispatch(fetchSpecificMovie(content.id))}
              >
                <img
                  className="w-24 h-34 mb-6 rounded"
                  src={content.poster}
                  alt="poster"
                />
              </Link>
              <p className="text-white font-semibold relative bottom-5 text-xs w-28 text-center ">
                {content.name}
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
