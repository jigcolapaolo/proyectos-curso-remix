import { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { NewPostErrors } from "~/lib/types";
import { createPosts } from "~/post";

export const meta: MetaFunction = () => {
  return [
    { title: "New Post" },
    { name: "description" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  const errors = {} as NewPostErrors;

  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!content) errors.content = true;

  if (Object.keys(errors).length) return errors;

  await createPosts({ title, slug, content });

  return redirect("/admin");
};

export default function Admin() {
  // La validación del formulario se hace en el servidor
  const errors = useActionData() as NewPostErrors;
  // Nos da la informacion de que se esta haciendo el submit
  const navigation = useNavigation();
  const isAdding = navigation.state === "submitting" 
    && navigation.formMethod === "POST"
    && navigation.formAction === "/admin";

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdding && !errors) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [isAdding, errors]);

  return (
    <>
      <h1 className="text-5xl text-center">Admin</h1>
      <Form ref={formRef} method="post" action="/admin" className="flex flex-col gap-4" style={{ justifySelf: "center" }}>
        <label className="flex flex-col">
          <h4>Post Title</h4>
          {errors?.title && <small className="text-red-600">Title is required</small>}
          <input ref={inputRef} placeholder="Title" type="text" name="title" style={{ padding: "5px" }} />
        </label>
        <label className="flex flex-col">
          <h4>Post Slug</h4>
          {errors?.slug && <small className="text-red-600">Slug is required</small>}
          <input placeholder="Slug" type="text" name="slug" style={{ padding: "5px" }} />
        </label>
        <label className="flex flex-col">
          <h4>Post Content</h4>
          {errors?.content && <small className="text-red-600">Content is required</small>}
          <textarea rows={10} cols={50} style={{ resize: "none" , padding: "10px"}} name="content" />
        </label>
        <div>
          <button
            type="submit"
            disabled={isAdding}
            className={`px-4 py-2 ${
              isAdding
                ? "bg-gray-500 text-white cursor-not-allowed opacity-50"
                : "bg-green-500 hover:bg-blue-600 text-white font-bold"
            }`}
          >
            {isAdding
              ? "Creating Post ..."
              : "Create Post"}
          </button>
          <Link to="/posts" className="text-blue-600 hover:underline ml-4">Go to Posts</Link>
        </div>
      </Form>
    </>
  );
}
