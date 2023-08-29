import {
  addToWatchList,
  removeFromWatchList,
} from "../functions/WatchlistFunction";

function Button({
  id,
  contents,
  setIsAddedToWatchList,
  currentContent,
  isAddedToWatchList,
  type,
}) {
  return (
    <div>
      {isAddedToWatchList ? (
        <button
          onClick={() => {
            removeFromWatchList(id, contents, setIsAddedToWatchList);
          }}
          className="flex items-center gap-2 border-2 p-2 h-14 rounded-md hover:bg-white hover:text-black transition-all duration-500"
        >
          <span className="font-thin text-3xl">&#9745;</span>
          Added to Watchlist
        </button>
      ) : (
        <button
          onClick={() => {
            addToWatchList(
              currentContent,
              contents,
              setIsAddedToWatchList,
              type
            );
          }}
          className="flex items-center gap-2 border-2 p-2 h-14 rounded-md hover:bg-white hover:text-black transition-all duration-500"
        >
          <span className="font-thin text-3xl">+</span>
          {/* <Loader /> */}
          Add to Watchlist
        </button>
      )}
    </div>
  );
}

export default Button;
