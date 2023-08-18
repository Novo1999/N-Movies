import { Favorites, Search, TopRated, Movies, Series } from "../../Components";

function Homepage() {
  return (
    <main className="bg-blue-950 h-[60rem] pl-5 pr-5 pb-5 overflow-hidden">
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
        <Favorites />
      </section>
    </main>
  );
}

export default Homepage;
