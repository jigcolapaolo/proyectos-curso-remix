import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "../services/db";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Blog" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  // const data: { posts: Post[] } = {
  //   posts: [
  //     {
  //       id: 1,
  //       title: "Post 1",
  //       content: "Lorem ipsum dolor sit amet",
  //     },
  //     {
  //       id: 2,
  //       title: "Post 2",
  //       content: "Lorem ipsum dolor sit amet",
  //     },
  //   ],
  // };

  const posts = await db.post.findMany();

  return { posts };
};

export default function Index() {
  const { posts }: { posts: Post[] } = useLoaderData();

  return (
    <div>
      <h2>Remix is awesome!</h2>
      <nav>
        <ul>
          <li>
            <Link to="/about">Go to About</Link>
          </li>
          <li>
            <Link to="/posts/create">Create Post</Link>
          </li>
        </ul>
      </nav>
      <div
        style={{
          border: "1px solid orange",
          padding: "1rem",
          borderRadius: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="post"
            style={{
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </Link>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <small>Creado: {new Date(post.createAt).toLocaleString()}</small>
              <small>
                Actualizado: {new Date(post.updatedAt).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
