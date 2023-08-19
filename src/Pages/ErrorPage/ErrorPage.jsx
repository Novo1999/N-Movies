import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="flex justify-center flex-col leading-8 text-xl font-thin items-center h-screen">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-red-500 font-bold">
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  );
}

export default ErrorPage;
