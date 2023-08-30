import { Watchlist, Search, TopRated, Movies, Series } from "../../Components";

function Homepage() {
  return (
    <main className="bg-blue-950 h-[60rem] px-5 md:overflow-auto md:h-screen">
      <div className="flex items-center justify-center">
        <h1 className="relative text-indigo-200 font-medium text-6xl w-[100%] h-20">
          📽 N-Movies
        </h1>
        <Search text="anything" />
      </div>
      <section className="grid grid-cols-5 h-4/5 gap-10">
        <Movies />
        <Series />
        <TopRated />
        <Watchlist />
      </section>
    </main>
  );
}

export default Homepage;
