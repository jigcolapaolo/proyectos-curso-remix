import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/lib/types";
import { getPost } from "~/post";

export const meta: MetaFunction = () => {
  return [{ title: "Post - Status" }, { name: "description" }];
};

export const loader: LoaderFunction = ({ params }) => {
  const { slug } = params;

  if (!slug) throw new Error("Slug is required");

  const post = getPost(slug);
  return post;
};

export default function Post() {
  const post: Post = useLoaderData();

  return (
    <div>
      <h1 className="text-5xl text-center">Post detail</h1>
      <div className="flex flex-col items-center gap-4 my-2">
        <p className="flex flex-col">
          <span className="text-bold text-center text-xl">Title: </span>
          {post.title}
        </p>
        <p className="flex flex-col">
          <span className="text-bold text-center text-xl">Slug: </span>
          {post.slug}
        </p>
      </div>
      <div
        style={{
          color: "brown",
          fontSize: "20px",
          border: "1px solid brown",
          borderRadius: "5px",
          width: "50%",
          justifySelf: "center",
          padding: "10px",
        }}
      >
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      </div>
    </div>
  );
}
