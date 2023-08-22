import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../Components";
import { useEffect } from "react";
import { fetchSpecificSeries } from "../../features/movies/moviesActions";
import { useParams } from "react-router";

const ONE_MILLION = 1000000;

function SpecificMovie() {
  const { currentContent, isMoviesLoading, isSeriesLoading } = useSelector(
    (state) => state.movie
  );

  const dispatch = useDispatch();
  const { id: seriesId } = useParams();
  console.log(seriesId);

  useEffect(() => {
    dispatch(fetchSpecificSeries(seriesId));
  }, [seriesId, dispatch]);

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
    networks,
    episode_run_time,
  } = currentContent;

  console.log(currentContent);
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
              <div className="w-[60%] h-[30%] flex flex-col gap-4 bg-gray-900/20 p-10 mt-40">
                <div className="flex gap-10 items-center">
                  <h1 className="text-5xl mt-4 mb-4">{name}</h1>
                  <button className="flex items-center gap-2 border-2 p-2 h-14 rounded-md hover:bg-white hover:text-black transition-all duration-500">
                    <span className="font-thin text-3xl">+</span> Add to
                    Watchlist
                  </button>
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

                <div className="flex gap-4 items-center">
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
            <div className="w-full h-full  gap-4 bg-gray-900/20 z-10 p-10 text-white font-thin text-md mt-40">
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
              <div className="flex items-center gap-4">
                <p className="text-white font-bold text-lg">
                  Production Countries:
                </p>
                {production_countries?.map((country) => {
                  return (
                    <p className="border-2 p-3 rounded-md" key={country.name}>
                      {country.name}
                    </p>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-5 mb-5">
                <p className="font-bold ">Available on: </p>
                {networks?.map((network) => {
                  return (
                    <div className="flex items-center gap-3" key={network.name}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                        className="h-8"
                      ></img>
                    </div>
                  );
                })}
                <p>{}</p>
                <p>{}</p>
              </div>
              {episode_run_time?.map((item, i) => {
                return (
                  <p className="mt-4" key={i}>
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

export default SpecificMovie;
