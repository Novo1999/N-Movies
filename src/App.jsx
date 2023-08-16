import {
  Favorites,
  Paginate,
  Search,
  TopRated,
  Movies,
  Series,
} from "./Components";

function App() {
  return (
    <main className="bg-blue-800 h-screen">
      <Search />
      <section className="grid grid-cols-5 h-4/5">
        <Movies />

        <Series />
        <TopRated />
        <Favorites />
      </section>
    </main>
  );
}

export default App;
