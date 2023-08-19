import { Provider, useSelector } from "react-redux";
import { store } from "./Store/store";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

import MoviesPage from "./Pages/Movies/MoviesPage";
import Homepage from "./Pages/Homepage/Homepage";
import { ErrorPage, SeriesPage, SpecificMovie } from "./Pages";
import { Spinner } from "./Components";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "movies",
    element: <MoviesPage />,
  },
  {
    path: "tv-series",
    element: <SeriesPage />,
  },
  {
    path: "movies/movie/:id",
    element: <SpecificMovie />,
  },
  {
    path: "tv-series/series/:id",
    element: <SpecificMovie />,
  },
]);

function App() {
  return (
    <div className="overflow-hidden">
      <Provider store={store}>
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      </Provider>
    </div>
  );
}

export default App;
