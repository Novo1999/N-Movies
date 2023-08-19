import { useSelector } from "react-redux";
import { Spinner } from "../../Components";

function SpecificMovie() {
  const { currentContent, isMoviesLoading, isSeriesLoading } = useSelector(
    (state) => state.movie
  );

  return (
    <section className="relative h-screen bg-slate-700">
      {isMoviesLoading || isSeriesLoading ? (
        <Spinner bottomposition="bottom-0" />
      ) : (
        <>
          <div
            className="p-4 flex flex-col items-center"
            key={currentContent.id}
          >
            <img
              className="absolute top-0 z-0 blur-sm"
              src={currentContent?.backdrop_path}
              alt="movie"
            />
            <div className="flex justify-evenly m-auto relative z-1 text-white drop-shadow ">
              <img
                className="w-[30%] h-[30%] mt-8"
                src={currentContent?.poster_path}
                alt="movie"
              />
              <div className="w-[60%] h-[30%] mt-40 flex flex-col gap-4 bg-gray-900/20 p-10">
                <h1 className="text-5xl mt-4 mb-4">{currentContent.title}</h1>
                <h3 className="text-lg">
                  Release Date: {currentContent.release_date}
                </h3>
                <p className="text-xl mb-4">{currentContent.overview}</p>
                <p className="text-xl">
                  Popularity : {currentContent.popularity}
                </p>
                <p className="text-lg">
                  Average Rating : {currentContent.vote_average}
                </p>
                <p className="text-lg">
                  Language: {currentContent.original_language}
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
