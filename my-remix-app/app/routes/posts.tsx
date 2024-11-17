import { MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Post } from "~/lib/types";
import { getPosts } from "~/post";

export const meta: MetaFunction = () => {
  return [
    { title: "Posts" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = () => {
  return getPosts();
};

export default function Posts() {
  // Provocando un error intencionalmente
  // throw new Error("Error in the Blog Section");

  const posts = useLoaderData<Post[]>();

  return (
    <div>
      <h1 className="text-5xl text-center">Posts</h1>
      <div
        className="flex flex-col justify-center gap-4 items-center border-2 border-violet-700
        w-1/4 rounded-3xl mx-auto my-4"
      >
        {posts.map((post) => (
          <div key={post.id}>
            <Link
              to={`/posts/${post.slug}`}
              className="hover:underline hover:text-violet-400"
            >
              <h3>{post.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/" className="text-violet-600 border-2 
          border-violet-700 rounded-3xl p-2 hover:bg-violet-300">
          Home
        </Link>
        <Link to="/admin" className="text-violet-600 border-2 
          border-violet-700 rounded-3xl p-2 hover:bg-violet-300">
          Add NEW Post
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

// Definiendo el ErrorBoundary para manejar los errores de esta ruta
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
