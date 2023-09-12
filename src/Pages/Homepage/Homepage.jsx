import { Watchlist, Search, Movies, Series } from "../../Components";
import Favorites from "../../Components/Favorites";

function Homepage() {
  return (
    <main className="bg-blue-950 h-max px-5 overflow-auto md:overflow-auto md:h-screen">
      <div className="flex items-center justify-center">
        <h1 className="relative text-indigo-200 font-medium text-2xl right-2 top-6 md:right-0 md:text-5xl lg:top-2 md:top-5 w-[100%] h-20">
          📽 N-Movies
        </h1>
        <Search text="anything" />
      </div>
      <section className="grid lg:grid-cols-3 xl:grid-cols-5 gap-10 pb-10">
        <Movies />
        <Series />
        <Favorites />
        <Watchlist />
      </section>
    </main>
  );
}

export default Homepage;
