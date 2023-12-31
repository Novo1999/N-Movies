import { Provider } from "react-redux";
import { store } from "./Store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MoviesPage from "./Pages/Movies/MoviesPage";
import Homepage from "./Pages/Homepage/Homepage";
import { ErrorPage, SeriesPage, SpecificMovie, SpecificSeries } from "./Pages";
import { Spinner } from "./Components";
import FilteredPage from "./Pages/FilteredPage/FilteredPage";

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
    errorElement: <ErrorPage />,
  },
  {
    path: "movies/:page",
    element: <MoviesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tv-series/:page",
    element: <SeriesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "movies/movie/:id",
    element: <SpecificMovie />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tv-series/series/:id",
    element: <SpecificSeries />,
    errorElement: <ErrorPage />,
  },
  {
    path: "filter/:page",
    element: <FilteredPage />,
    errorElement: <ErrorPage />,
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
