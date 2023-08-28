import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`
    } else if (error instanceof Error) {
      return error.message
    } else if (typeof error === 'string') {
      return error
    } else {
      console.error(error)
      return 'Unknown error'
    }
  }

export default function ErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="w-full h-screen bg-slate-300 flex flex-col justify-center items-center">
      <h1 className="m-4 text-7xl">Oops!</h1>
      <p className="m-4 text-5xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="m-4 text-4xl">{errorMessage(error)}</i>
      </p>
    </div>
  );
}