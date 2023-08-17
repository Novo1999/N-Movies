import { Provider } from "react-redux";

import { Favorites, Search, TopRated, Movies, Series } from "./Components";
import store from "./Store/store";

function App() {
  return (
    <Provider store={store}>
      <main className="bg-blue-800 h-[60rem] pl-5 pr-5 pb-5  overflow-hidden">
        <Search />
        <section className="grid grid-cols-5 h-4/5 gap-5">
          <Movies />
          <Series />
          <TopRated />
          <Favorites />
        </section>
      </main>
    </Provider>
  );
}

export default App;
