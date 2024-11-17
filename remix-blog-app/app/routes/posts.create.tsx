import { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, isRouteErrorResponse, redirect, useActionData, useNavigation, useRouteError } from "@remix-run/react";
import { db } from "~/services/db";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Post" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const title = form.get('title') as string;
    const content = form.get('content') as string;

    const errors = {
      title: title.length < 3 ? "Title must be at least 3 characters" : null,
      content: content.length < 10 ? "Content must be at least 10 characters" : null
    } as NewPostErrors


    if (Object.values(errors).some(Boolean)) return errors;

    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const post = await db.post.create({ data: { title, content} });
    
    return redirect(`/posts/${post.id}`);
}

export default function CreatePost() {
  const errors = useActionData() as NewPostErrors
  const navigation = useNavigation();
  const isAdding = navigation.state === "submitting";


  return (
    <>
      <h2>Create new Post</h2>
      <Form method="post">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" placeholder="Title of your post" />
          <small style={{ color: "red"}}>{errors?.title && errors.title}</small>
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" placeholder="Content of your post" />
          <small style={{ color: "red"}}>{errors?.content && errors.content}</small>
        </div>
        <button type="submit" disabled={isAdding} style={{
          opacity: isAdding ? 0.5 : 1
        }}>
          {isAdding ? "Creating..." : "Create Post"}
        </button>
      </Form>
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
