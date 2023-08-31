import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../Components";
import { useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchSpecificMovie } from "../../features/movies/moviesActions";
import Button from "../../Components/Button";

export const storageKeyWatchlist = "watchlist";
export const storageKeyFavorites = "favorites";

const ONE_MILLION = 1000000;

export function content(type) {
  if (!type) return [];
  return JSON.parse(type);
}

export function buttonStatus(contents, setIsAddedTo, id) {
  if (contents?.some((item) => item.id === id)) {
    setIsAddedTo(true);
  } else {
    setIsAddedTo(false);
  }
}

function SpecificMovie() {
  const { currentContent, isMoviesLoading, isSeriesLoading } = useSelector(
    (state) => state.movie
  );

  const dispatch = useDispatch();
  const [isAddedToWatchList, setIsAddedToWatchList] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const {
    id,
    title,
    backdrop_path,
    poster_path,
    release_date,
    overview,
    popularity,
    vote_average,
    homepage,
    budget,
    revenue,
    runtime,
    genres,
    production_companies,
    production_countries,
    spoken_languages,
    status,
  } = currentContent;

  const watchlistStorage = localStorage.getItem(storageKeyWatchlist);
  const favoritesStorage = localStorage.getItem(storageKeyFavorites);

  const watchlistedContents = content(watchlistStorage);

  const favoriteContents = content(favoritesStorage);

  useEffect(() => {
    buttonStatus(watchlistedContents, setIsAddedToWatchList, id);
  }, [watchlistedContents, id]);

  useEffect(() => {
    buttonStatus(favoriteContents, setIsAddedToFavorites, id);
  }, [favoriteContents, id]);

  const { id: movieId } = useParams();

  useEffect(() => {
    dispatch(fetchSpecificMovie(movieId));
  }, [movieId, dispatch]);

  return (
    <section className="relative h-screen overflow-auto bg-slate-700">
      {isMoviesLoading || isSeriesLoading ? (
        <Spinner bottomposition="bottom-0" />
      ) : (
        <>
          <div className="p-4 flex flex-col items-center" key={id}>
            <img
              className="absolute top-0 z-0 blur-sm"
              src={backdrop_path}
              alt="movie"
            />
            <div className="flex justify-evenly m-auto relative z-1 text-white drop-shadow mb-10">
              <img
                className="w-[30%] h-[30%] mt-8"
                src={poster_path}
                alt="movie"
              />
              <div className="w-[60%] h-[30%] mt-40 flex flex-col gap-4 bg-gray-900/20 p-10">
                <div className="flex gap-10 items-center">
                  <h1 className="text-5xl mt-4 mb-4">{title}</h1>
                  <Button
                    id={id}
                    contents={watchlistedContents}
                    isAddedTo={isAddedToWatchList}
                    setIsAddedTo={setIsAddedToWatchList}
                    currentContent={currentContent}
                    storageKey="watchlist"
                    contentType="movie"
                  >
                    Add to Watchlist
                  </Button>
                  <Button
                    id={id}
                    contents={favoriteContents}
                    isAddedTo={isAddedToFavorites}
                    setIsAddedTo={setIsAddedToFavorites}
                    currentContent={currentContent}
                    storageKey="favorites"
                    contentType="movie"
                  >
                    Add to Favorites
                  </Button>
                </div>
                <p className="font-bold">{status}</p>
                <h3 className="text-lg">Release Date: {release_date}</h3>
                <p className="text-xl mb-4">{overview}</p>
                <p className="text-xl">Popularity : {popularity}</p>
                <p className="text-lg">Average Rating : {vote_average}</p>

                <div className="flex items-center gap-4">
                  <p className="text-lg">Languages: </p>
                  {spoken_languages?.map((language) => {
                    return (
                      <p
                        key={language.english_name}
                        className="text-lg border-2 p-1 rounded-md"
                      >
                        {language.english_name}
                      </p>
                    );
                  })}
                </div>

                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-red-500 italic transition-all"
                  href={homepage}
                >
                  {homepage}
                </a>
              </div>
            </div>

            <div className="w-full h-full mt-4 gap-4 bg-gray-900/20 z-10 p-10 text-white font-thin text-md ">
              {/* Genre */}
              <div className="flex gap-3 items-center mb-10">
                <p>Genre: </p>
                {genres?.map((genre) => (
                  <p className="border-2 w-fit p-2 rounded-md" key={genre.name}>
                    {genre.name}
                  </p>
                ))}
              </div>
              {/* Companies */}
              <div className="flex items-center gap-6 pt-6 pb-6">
                <p className="text-white font-bold text-lg">
                  Production Companies:
                </p>
                {production_companies?.map((company, i) => {
                  {
                    return company.logo_path ? (
                      <img
                        key={i}
                        className="h-12"
                        src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                        alt="logo"
                      />
                    ) : (
                      ""
                    );
                  }
                })}
              </div>
              <div className="flex items-center gap-4">
                <p className="text-white font-bold text-lg">
                  Production Countries:
                </p>
                {production_countries?.map((country, i) => {
                  return (
                    <p className="border-2 p-3 rounded-md" key={i}>
                      {country.name}
                    </p>
                  );
                })}
              </div>
              <div>
                <p>Budget: {`${budget / ONE_MILLION}M`}</p>
                <p>Revenue: {`${(revenue / ONE_MILLION).toFixed(2)}M`}</p>
                <p>
                  Duration: {`${Math.floor(runtime / 60)}hr ${runtime % 60}m`}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default SpecificMovie;
