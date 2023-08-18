import { Provider } from "react-redux";
import { store } from "./Store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MoviesPage from "./Pages/Movies/MoviesPage";
import Homepage from "./Pages/Homepage/Homepage";
import { SeriesPage } from "./Pages";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="series" element={<SeriesPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
