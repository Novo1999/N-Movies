import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSpecificMovie } from "../features/movies/moviesActions";
import { useState } from "react";
import Loader from "../Pages/SpecificMovie/Loader/Loader";

function LocalStorage({ type, storageKey, bgColor }) {
  const dispatch = useDispatch();
  const [storedContents, setStoredContents] = useState(
    JSON.parse(localStorage.getItem(storageKey))
  );
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  function handleDelete() {
    setShowDeletePopup(true);
  }

  function handlePopup(e) {
    if (!e.target.value) return;
    if (e.target.value === "yes") {
      setShowLoader(true);
      localStorage.removeItem(storageKey);
      setStoredContents(JSON.parse(localStorage.getItem(storageKey)));
      setTimeout(() => {
        setShowDeletePopup(false);
        setShowLoader(false);
      }, 500);
    }
    if (e.target.value === "no") setShowDeletePopup(false);
  }

  return (
    <section
      className={`rounded-2xl col-span-2 xl:col-span-1 lg:col-span-3 row-span-1 ${bgColor} relative drop-shadow-xl h-96 shadow-xl grid overflow-hidden`}
    >
      {showDeletePopup ? (
        <div className="flex items-center justify-center flex-col">
          <p className="text-lg text-white">
            Do you want to delete all {type}?
          </p>
          <div onClick={(e) => handlePopup(e)} className="flex gap-4 mt-5">
            <button
              value="yes"
              className="px-4 py-2 bg-slate-100 rounded-xl hover:bg-green-600 hover:text-white transition-all"
            >
              {showLoader ? <Loader /> : "Yes"}
            </button>
            <button
              value="no"
              className="px-4 py-2 bg-slate-100 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <>
          {storedContents?.length >= 1 ? (
            <div className="flex items-center relative top-4 gap-2 justify-center">
              <h1 className="text-white text-xl lg:text-2xl xl:text-lg text-center font-thin">
                {type}
              </h1>
              <button
                onClick={handleDelete}
                className="hover:scale-125 transition-all"
              >
                🗑️
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center font-semibold mt-auto">
              <p className="text-white">Add Something to your {type}</p>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-1 lg:grid-cols-5 left-3 top-2 relative overflow-scroll mt-2 p-4 ">
            {storedContents?.map((content, i) => {
              return (
                <div className="flex flex-col items-center pr-5" key={i}>
                  <Link
                    to={
                      content.type === "series"
                        ? `tv-series/series/${content.id}`
                        : `movies/movie/${content.id}`
                    }
                    onClick={() => dispatch(fetchSpecificMovie(content.id))}
                  >
                    <img
                      className="w-36 mb-6 rounded"
                      src={content.poster}
                      alt="poster"
                    />
                  </Link>
                  <p className="text-white font-semibold relative bottom-5 text-lg mt-2 w-28 text-center ">
                    {content.name}
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

export default LocalStorage;

/* 
- Watchlist state will be localstorage
- Click add 
- Movie id added to array
- if added and clicked again, remove from array
- Render and update using the array accordingly
*/
