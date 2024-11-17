import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
          </p>
          <ul>
            <li>
              <Link to={"/"} className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li>
              <Link to={"/about"} className="text-blue-600 hover:underline">About</Link>
            </li>
            <li>
              <Link to={"/posts"} className="text-blue-600 hover:underline">Posts</Link>
            </li>
            <li>
              <Link to={"/posts/post"} className="text-blue-600 hover:underline">Posts Post</Link>
            </li>
            <li>
              <Link to={"/admin"} className="text-blue-600 hover:underline">NEW Post</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}