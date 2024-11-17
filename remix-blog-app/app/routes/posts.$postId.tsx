import { LoaderFunction } from "@remix-run/node";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { db } from "~/services/db";

export const loader: LoaderFunction = async ({ params }) => {

  const post = await db.post.findUnique({ where: { id: params.postId,},}) as Post | null;

  if (!post) {
    throw new Error("Post no encontrado");
  }

  return post;
}

export default function SinglePost() {
  const post: Post = useLoaderData();

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div style={{
        display: "flex",
        gap: "1rem",
      }}>
        <small>Creado: {new Date(post.createAt).toLocaleString()}</small>
        <small>Actualizado: {new Date(post.updatedAt).toLocaleString()}</small>
      </div>
    </>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Algo salio mal 😢.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}
