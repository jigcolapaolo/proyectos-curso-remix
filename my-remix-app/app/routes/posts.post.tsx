import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

export default function Post() {
    return (
        <div>
            <h1 className="text-5xl text-center">Posts simple</h1>
            <Outlet />
        </div>
    )
}

export function ErrorBoundary() {
    const error = useRouteError();
  
    // Verificar si el error es una respuesta de la ruta
    if (isRouteErrorResponse(error)) {
      return (
        <div>
          <h1>Oops</h1>
          <p>Status: {error.status}</p>
          <p>{error.data.message}</p>
        </div>
      );
    }
  
    // Manejando errores desconocidos
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
  
    return (
      <div>
        <h1>Uh oh ...</h1>
        <p>Something went wrong.</p>
        <pre>{errorMessage}</pre>
      </div>
    );
  }