import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../Components";
import { useEffect, useState } from "react";
import { fetchSpecificSeries } from "../../features/movies/moviesActions";
import { useParams } from "react-router";
import Button from "../../Components/Button";
import {
  buttonStatus,
  content,
  storageKeyFavorites,
  storageKeyWatchlist,
} from "../SpecificMovie/SpecificMovie";

function SpecificSeries() {
  const { currentContent, isMoviesLoading, isSeriesLoading } = useSelector(
    (state) => state.movie
  );
  const [isAddedToWatchList, setIsAddedToWatchList] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const dispatch = useDispatch();
  const { id: seriesId } = useParams();

  const {
    id,
    name,
    backdrop_path,
    poster_path,
    number_of_episodes,
    overview,
    popularity,
    vote_average,
    homepage,
    genres,
    production_companies,
    production_countries,
    spoken_languages,
    last_air_date,
    number_of_seasons,
    episode_run_time,
    networks,
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

  useEffect(() => {
    dispatch(fetchSpecificSeries(seriesId));
  }, [seriesId, dispatch]);

  return (
    <section className="relative h-screen overflow-auto bg-slate-700 ">
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
            <div className="flex flex-col justify-center items-center relative z-1 text-white drop-shadow mb-10">
              <img
                className="w-[70%] md:w-[50%] lg:w-[35%] xl:w-[20%] h-[50%] mt-8"
                src={poster_path}
                alt="movie"
              />
              <div className="h-[30%] mt-10 flex flex-col gap-4 bg-blue-900/20 p-10">
                <div className="flex gap-10 items-center flex-col sm:flex-row">
                  <h1 className="text-3xl sm:text-2xl mt-4 mb-4">{name}</h1>
                  <Button
                    id={id}
                    contents={watchlistedContents}
                    isAddedTo={isAddedToWatchList}
                    setIsAddedTo={setIsAddedToWatchList}
                    currentContent={currentContent}
                    storageKey="watchlist"
                    contentType="series"
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
                    contentType="series"
                  >
                    Add to Favorites
                  </Button>
                </div>
                <p className="font-thin">
                  Last episode Aired on: {last_air_date}
                </p>
                <h3 className="text-lg">Seasons: {number_of_seasons}</h3>
                <h3 className="text-lg">
                  Number of Episodes: {number_of_episodes}
                </h3>
                <p className="text-xl mb-4">{overview}</p>
                <p className="text-xl">Popularity : {popularity}</p>
                <p className="text-lg">Average Rating : {vote_average}</p>

                <div className="grid items-center grid-cols-3 sm:grid-cols-5 gap-2">
                  <p className="text-lg">Languages: </p>
                  {spoken_languages?.map((language) => {
                    return (
                      <p
                        key={language.english_name}
                        className="text-sm sm:text-lg border-2 p-2 w-full text-center rounded-md"
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
            <div className="w-full h-full  gap-4 bg-blue-900/20 z-10 p-10 text-white font-thin text-md mt-10">
              {/* Genre */}
              <div className="flex gap-3 flex-col items-center mb-10 sm:flex-row sm:grid sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10">
                <p>Genre: </p>
                {genres?.map((genre) => (
                  <p className="border-2 w-fit p-2 rounded-md" key={genre.name}>
                    {genre.name}
                  </p>
                ))}
              </div>
              {/* Companies */}
              <div className="flex items-center flex-col gap-6 md:grid md:grid-cols-4 pt-6 pb-6">
                <p className="text-white font-bold text-lg">
                  Production Companies:
                </p>
                {production_companies?.slice(1, 5).map((company, i) => {
                  {
                    return company.logo_path ? (
                      <img
                        key={i}
                        className="h-8"
                        src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                        alt="logo"
                      />
                    ) : (
                      ""
                    );
                  }
                })}
              </div>
              <div className="flex flex-col items-center gap-4 sm:grid sm:grid-cols-5 mb-10">
                <p className="text-white font-bold text-lg">
                  Production Countries:
                </p>
                {production_countries?.map((country) => {
                  return (
                    <p
                      className="border-2 p-3 rounded-md text-sm sm:text-lg"
                      key={country.name}
                    >
                      {country.name}
                    </p>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-5 mb-5 flex-col sm:flex-row">
                <p className="font-bold ">Available on: </p>
                {networks?.slice(1, 5).map((network) => {
                  return (
                    <div className="flex items-center gap-3" key={network.name}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                        className="h-8"
                      ></img>
                    </div>
                  );
                })}
              </div>
              {episode_run_time?.map((item, i) => {
                return (
                  <p className="text-sm sm:text-lg" key={i}>
                    Episode Run Time: {item}m
                  </p>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default SpecificSeries;
